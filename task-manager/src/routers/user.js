const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


router.post('/users' , async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save()
        // const token = await user.generateAuthToken()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }

    // user.save().then(()=> {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.post('/users/login', async (req,res)=> {
    try {
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({user : user , token : token})
    } catch (error) {
        res.status(400).send()
    }
})
// GET ALL
// router.get('/users' , auth , async (req,res) => {

//     try{
//         const user = await User.find({})
//         res.send(user)
//     } catch(e) {
//         res.status(500).send()
//     }

// })


router.post('/users/logout', auth , async (req,res) => {
    try {
        //ilawej ala token ki yalkaha ifeltreha
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save() 
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me' , auth , async (req,res) => {
    res.send(req.user)
})

router.get('/users/:id' , async (req,res) => {
    const _id = req.params.id


    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(400).send()
    }

})

router.patch('/users/:id' , async (req,res) => {
    const updates =Object.keys(req.body)
    const allowUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((data) => {
        return allowUpdates.includes(data)
    })
    if(!isValidOperation) {
       return res.status(400).send({error : 'Invalid updates'})
    }
    try {
        const user = await User.findById(req.params.id)


       // const user = await User.findByIdAndUpdate(req.params.id, req.body , { new : true , runValidators: true} )
        if (!user) {
           return res.status(404).send()
        }
        updates.forEach((data) => {
            user[data]=req.body[data]
        })

        await user.save()
            res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req,res) => {
    try {
       const user = await User.findByIdAndDelete(req.params.id)
       if(!user) {
        return res.status(404).send({error : 'Cannot find user with the provided id'})
       }
       res.send(user)
    } catch (error) {
       return res.status(500).send(error)
    }
})


module.exports = router
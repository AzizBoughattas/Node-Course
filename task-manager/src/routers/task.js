const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.post('/tasks' , async (req,res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/tasks', async(req,res)=> {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }

})

router.get('/tasks/:id',async (req,res)=> {
    const id = req.params.id

    try {
        const task = await Task.findById(id)
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id' , async (req,res) => {
    const allowedUpdates = ['description','completed']
    const updates = Object.keys(req.body)
    const VerifOperation = updates.every((data) => {
        return allowedUpdates.includes(data)
    })

    if(!VerifOperation) {
        return res.status(400).send({ error : 'failed to update'})
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,req.body , {new : true , runValidators:true})
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
   


})

router.delete('/tasks/:id' , async (req,res) => {
   
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        return res.status(500).send(error)
    }


})

module.exports = router
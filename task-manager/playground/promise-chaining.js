require('../src/db/mongoose')
const User = require('../src/models/user')

//62a35eaf8e438a43b40c3a09

// User.findByIdAndUpdate('62a36be005394e3868afb7ae' , { age :21}).then((user)=> {
//     console.log(user)
//     return User.countDocuments({age : 21})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id , {age : age})
    const count = await User.countDocuments({age : age})

    return count
}


updateAgeAndCount('62a35df8a6eaa24118608ca6',30).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})


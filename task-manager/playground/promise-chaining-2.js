require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('62a36fd50bbd9c1eb09ba50c').then((task)=> {
//     console.log(task)
//     return Task.countDocuments({completed : false})
// }).then((result) => {
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const countIncomplete = await Task.countDocuments({completed:false})
    return countIncomplete
}


deleteTaskAndCount('62a36ed012c5a13898955cf9').then((count)=> {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
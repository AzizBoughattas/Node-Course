// setTimeout(() => {
//     console.log('Two seconds re up')
// }, 2000);

// const names = ['Andrew','Jen', 'Aziz']

// const shorNames = names.filter((name)=> {
//     return name.length <=4
// })

// const geocode = (address,callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude : 0, 
//             longtitude :0
//         }
//         callback(data)
//     }, 2000);

// }

// geocode('Philadelphia' , (data) => {
//     console.log(data)
// })


const add = (number1,number2,callback) => {
    setTimeout(() => {
        const sum = number1 +number2
        callback(sum)
    }, 2000);


}



add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

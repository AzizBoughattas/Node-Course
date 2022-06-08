const name = 'Aziz'
const userAge = '25'

const user = {
    name,
    userAge,
    location : 'Rades'
}
console.log(user)

const product = {
    label: 'Red notebook',
    price : 3,
    stock:201,
    salePrice : undefined
}

// const {label:productLabel , stock , rating =5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type ,{label , stock}) => {
    console.log(type,label,stock)
}

transaction('order',product)
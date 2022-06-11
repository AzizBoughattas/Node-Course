const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        minlength:7,
        required:true,
        trim:true,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error('password cannot contain password')
            }
        }
    },
    email : {
        type:String,
        unique:true,
        required : true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age : {
        type : Number,
        default:0,
        validate(value) {
            if(value<0) {
                throw new Error('Age must be a positive number')
            }
        }
    } , 
    tokens : [{
        token : {
            type:String,
            required:true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
   // const user = this
   const token = jwt.sign({_id : this._id.toString()} , 'thisismynewcourse')

   this.tokens = this.tokens.concat({token : token})
   await this.save()
   return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email : email})

    if(!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to log in')
    }
    return user
    
}

// pre tkhalini naaml haja kbal operation eli nhotha(save parexp)
userSchema.pre('save', async function (next) {
    //const user = this

    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password , 8)
    }
    
    next()
})

const User = mongoose.model('User', userSchema )

module.exports = User
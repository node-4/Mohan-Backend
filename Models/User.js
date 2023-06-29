const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema(
    {
        full_name:
        {
            type: String,
            // required: true,
        },
        country: {
            type: String
        },
        email:{
                type:String
        },
        fb_user_id:{
            type:String,
        },
        provider:{
            type:String
        },
        mobile : 
        {
            type: String,
            // required : true,
            // unique: true
        },
        password:
        {
            type: String,
            // required: true

        },
        role: {
            type: String, 
            default: "seller"
        },
        isVerified: {
            type: Boolean,
            default: false,

        },
        avatar: {
            
                type: String,
                
            
        },
        tokens: [

            {
                token: {
                    type:String
                }
            }
        ]
    },
  
    { timestamps: true })

    UserSchema.virtual('machines', {
        ref: 'Machine',
        localField: '_id',
        foreignField: 'owner'
    })

    UserSchema.virtual('leaselistings', {
        ref: 'Leaselisting',
        localField: '_id',
        foreignField: 'owner'
    } )

    UserSchema.virtual('jobs', {
        ref: 'Job',
        localField: '_id',
        foreignField: 'owner'
    })

    UserSchema.virtual('products', {
        ref: 'Product',
        localField: '_id',
        foreignField: 'owner'
    })

    UserSchema.virtual('services', {
        ref: 'Service',
        localField: '_id',
        foreignField: 'owner'
    })


    UserSchema.methods.toJSON = function () {


        const user =this
        const userObject = user.toObject()
      
        delete userObject.password
        delete userObject.tokens
        
        // console.log(userObject)
      
        return userObject
      
      }

      

// UserSchema.virtual('carts', {
//     ref: 'cart',
//     localField:'_id',
//     foreignField: 'user'
// })


UserSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user)
    const token = jwt.sign({ _id: user._id }, process.env.Token_Key)
    console.log("lkhbubub",   token)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// UserSchema.statics.donework = async (id, mobilenumber) =>{


//     try{
// const result = await User.findByIdAndUpdate({_id: id}, {mobilenumber: mobilenumber})
// console.log(result)
//     }catch (e){


//         console.log(e)
//     }
// }

UserSchema.statics.findByCredentials = async (mobile, password) => {
    console.log("ttttt" + password)
console.log("gfmhdc" + mobile)
    try {
        const user = await User.findOne({ mobile: mobile })
        console.log(user)
        if (!user) {
            throw new Error('No such user')
        }
       if(password != user.password){
    console.log("nisha see" + user.password)
    console.log(password)



        // return new error
       }
       else {

        return user

       }
    } catch (error) {
        console.log( error)
    }
}
UserSchema.pre('save', async function (next) {
    const User = this
    if (User.isModified('password')) {
        User.password = bcrypt.hash(User.password, 8)
    }
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User;
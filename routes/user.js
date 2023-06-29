const express = require('express')
const router = new express.Router()
const User = require('../Models/User')
const Auth = require('../middleware/auth')
const ADAuth = require('../middleware/adauth')
const { upload_user } = require('../multer')
// const Machine = require('../Models/Machine')

// const config = require('../config')
const { update } = require('../Models/User')
const usermodelotp = require('./usermodelotp')
const Machine = require('../Models/Machine')
const Product = require('../Models/Product')
const Job = require('../Models/Job')
const Service = require('../Models/Service')
const Leaselisting = require('../Models/Leaselisting')
//to sign up through email and password

const accountSid = 'ACf014d4eff53c167479a07b97851b05bd'
const authtoken = '0544de84142a35d736c055e8a305b278'
const serviceID = "VA27d93af94cb9ca5474844d951182905e"


const client = require('twilio')(accountSid, authtoken)

// router.get('/get', async (req, res) => {


//     const result = await User.find({})

//     res.send(result)
// })
//LOGIN INTO ACCOUNT
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.mobile, req.body.password)

        console.log(req.body.mobile)
        console.log(req.body.password)

        // if verified true = token
        if (user.isVerified == true) {
            const token = await user.generateAuthToken()
            console.log(token)
            return res.status(200).json({ token: token , userId: user._id})
        }
        else {
            res.status(500).json({ message: "Please signup" })
        }
    }



    catch (e) {
        res.status(400).json({ message: "Unable to login" })
    }
})
//TO READ SELF INFORMATION
router.get('/me/:id', Auth.Auth, async (req, res) => {

    // console.log(req.user)
    try {
        console.log(req.user._id)
        const nisha = await User.findById({_id: req.params.id})

        res.status(201).send(nisha)



    } catch (e) {

        res.status(500).send(e)
    }


    //     try {
    // const users = await User.find({})
    // res.status(201).send(users)
    //     } catch (error) {
    // res.status(500).send(error)
    //     }
})
// User.find({}).then((users) => {
// res.send(users)
// }).catch((e) => {
//     res.status(500).send()
// })
// })




router.get('/trrr', Auth.Auth, async (req, res) => {


    try {


        const mila = await User.findOne({ _id: req.user.id }).populate('products')


        console.log(mila)
        return res.status(200).send(mila)
    } catch (e) {

        res.status(500).json({
            error: e
        })
    }

})


//To get user by admin through id
router.get('/get/:id', ADAuth, async (req, res) => {
    const_id = req.params.id
    try {
        const user = await User.findById({ _id: const_id })
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    } catch (error) {
        res.status(500).send()

    }
})

//to get all users by admin
router.get('/allusers', async (req, res) => {
    try {
        // if(User.isVerified=== true){
        const result = await User.find({ isVerified: true })

        if (result) {
            return res.status(200).json({ message: "All users are", data: result })
        }
        return res.status(404).json({ message: "User not found" })
    } catch (error) {
        res.status(500).send(error)
    }

})




//TO UPDATE SELF INFORMATION
router.patch('/updateme/:id',async (req, res) => {
    try {
        const updateuser = await User.findByIdAndUpdate({
            _id: req.params.id
        },
            {
                full_name: req.body.full_name,
                email: req.body.email,
                mobile: req.body.mobile,
                avatar: req.body.avatar
                //  CategoryImg:process.env.BASE_URL+"public/Category/"+CategoryImg

            }
        );
        const updated = await User.findById(req.params.id)
        return res.status(201).json({
            msg: "User updated successfully",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message });
    }
});


//TO LOGOUT FROM CURRENT DEVICES
router.post('/logout', Auth.Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// TO LOGOUT FROM ALL DEVICES
router.post('/logoutAll', Auth.Auth, async (req, res) => {
    try {
        console.log(req.user)
        req.user.tokens = []
        await req.user.save()
        res.json({ message: "Logout successfully" })
    } catch (error) {
        res.status(500).send(error)
    }
})
//TO DELETE USER
router.delete('/deleteme', Auth.Auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        await req.user.remove()
        res.status(200).json({ message: 'Account deleted successfully' })
        // if(!user){
        //     return res.status(404).send(user)
        // }


        // await req.user.remove()
        // res.send(req.user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)

    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        console.log("Hit the APO ")
         await User.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({ message: 'Account deleted successfully' })
    }
    catch (error) {
        console.log(error.messager)
        res.status(500).send(error.message)

    }
})

router.get('/ads', Auth.Auth, async (req, res) => {
    try {
        // console.log(req.user)
        // const machine = await Machine.find({user: req.user})
        const machine = await Machine.find({ user: req.user })
        const product = await Product.find({ user: req.user })
        const job = await Job.find({ user: req.user })
        const service = await Service.find({ user: req.user })
        const leaselisting = await Leaselisting.find({ user: req.user })

        res.status(200).json({ machine: machine, product: product, job: job, service: service, leaselisting: leaselisting })

        // res.status(200).json({message: product})
    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/total', async (req, res) => {
    try {
        const UserData = await User.find();
        console.log(UserData)
        res.status(200).json({
            message: "ok",
            Users: UserData.length
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router
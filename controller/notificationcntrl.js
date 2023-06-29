const moment=require("moment")
const Notification  = require("../Models/Notification")


// ADD_BOOKING_NOTIFICATION

exports.addNotification=async (req,res)=>{
    try {
        // console.log(req.body)
        const cnotification= `your course is successfully saved  ${moment().format('DD-MM-YYYY')}`
        const data = {
            title: req.body.title,
            notification: req.body.notification
        }
        const notification=new Notification(data)
        notification.notification=cnotification 
        notification.save()
        return res.status(200).json({msg:"notification saved"})
    } catch (error) {
        console.log(error)

        
        return res.status(400).json({msg:"something went wrong"})  
    }
}

// GET_BOOKING_NOTIFICATION

exports.getNotification=async (req,res)=>{
    try {
        const getNotification=await Notification.find({})
        return res.status(200).json({msg:"notification getted",getNotification})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})  
    }
}

// DELETE_BOOKING_NOTIFICATION

exports.deletenotification = async (req, res) => {
    try {
        const deletenotification = await Notification.findOneAndDelete({_id: req.params.id})
        return res.status(200).json({ msg: "notification deleted" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "something went wrong" })
    }
}
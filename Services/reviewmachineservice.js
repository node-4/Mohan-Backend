// const {ReviewModel, ProductModel} = require('../models');
const Review = require('../Models/Reviewmachinemodel')
// const Product = require('../Models/Product')
const mongoose = require('mongoose');
const Machine = require('../Models/Machine');

const machineExists = async (machineId) => {
    try{

        console.log("machineId", machineId)

        if(!mongoose.Types.ObjectId.isValid(machineId)){
            return false
        }
        console.log("machine")

        const machine = await Machine.findById(machineId);
        // const machine = await Machine.findById(machineId)
        console.log("machine", machine)
        if(!machine){
            return false;
        }
 
        return true;
    } catch(error){
        throw error;
    }
}

exports.addReview = async (payload) => {
    try{
        const machineExist = await machineExists(payload.machine);
console.log(payload)
        if(!machineExist){
            return{
                success: false,
                statusCode: 404,
                error: `machine with id ${machineExist} does not exist`
            }
        }

        let review = await Review.findOne({user: payload.user, machine: payload.machine});

        if(!review){
            review = new Review(payload);
        }
        
        
        review.star_rating = payload.star_rating,
        review.user = payload.user,
        review.machine = payload.machine,
        review.review = payload.review
        await review.save();

        return {
            success: true,
            statusCode: 201,
            msg: 'review created',
            data: review
        }
    } catch(error){
        throw error;
    }
}

exports.getMachinesReviews = async (machineId) => {
    try{
        const machineExist = await machineExists(machineId);
        
        console.log("machineId")
        if(!machineExist){
            return {
                success: false,
                error: `machine with id ${machineId} not found`,
                statusCode: 404
            }
        }

        const reviews = await Review.find({machine: machineId}).populate('user');

        return {
            success: true,
            msg: `machine's review`,
            statusCode: 200,
            data: reviews
        }
    } catch(error){
        throw error;
    }
}

// exports.getReviewsofUser = async (userId) => {
//     try{
//         const reviews = await Review.find({user: userId}).populate('product')
// console.log(reviews)
//         return {
//             success: true,
//             statusCode: 200,
//             msg: `user's review`,
//             data: reviews
//         }
//     } catch(error){
//         throw error;
//     }
// }

//to get all reviews posted by user of products
exports.getallreviewsmadebyuser = async(userId) => {
    try {
        const reviews = await Review.find({user: userId}).populate('machine')
        return{
            success: true,
            statusCode: 200,
            msg: 'All reviews made by user',
            data: reviews
        }
    } catch (error) {
        throw error;
    }
}


exports.GetAllReview = async (userId) => {
    try{
        const reviews = await Review.find({}).populate('machine')
console.log(reviews)
        return {
            success: true,
            statusCode: 200,
            msg: `ALL REVIEWS`,
            data: reviews
        }
    } catch(error){
        throw error;
    }
}



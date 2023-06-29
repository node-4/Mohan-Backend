// const {ReviewModel, ProductModel} = require('../models');
const Review = require('../Models/Reviewservicemodel')
// const Product = require('../Models/Product')
const mongoose = require('mongoose');
const Service = require('../Models/Service');

const serviceExists = async (serviceId) => {
    try{

        // console.log("machineId", jobId)

        if(!mongoose.Types.ObjectId.isValid(serviceId)){
            return false
        }
        // console.log("machine")

        const service = await Service.findById(serviceId);
        // const machine = await Machine.findById(machineId)
        // console.log("machine", machine)
        if(!service){
            return false;
        }
 
        return true;
    } catch(error){
        throw error;
    }
}

exports.addReview = async (payload) => {
    try{
        const serviceExist = await serviceExists(payload.service);
console.log(payload)
        if(!serviceExist){
            return{
                success: false,
                statusCode: 404,
                error: `service with id ${serviceExist} does not exist`
            }
        }

        let review = await Review.findOne({user: payload.user, service: payload.service});

        if(!review){
            review = new Review(payload);
        }
        
        
        review.star_rating = payload.star_rating,
        review.user = payload.user,
        review.service = payload.service,
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

exports.getServicesReviews = async (serviceId) => {
    try{
        const serviceExist = await serviceExists(serviceId)
        
        // console.log("machineId")
        if(!serviceExist){
            return {
                success: false,
                error: `service with id ${serviceId} not found`,
                statusCode: 404
            }
        }

        const reviews = await Review.find({service: serviceId}).populate('user');

        return {
            success: true,
            msg: `service's review`,
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
        const reviews = await Review.find({user: userId}).populate('service')
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


exports.GetAllReview = async (serviceId) => {
    try{
        const reviews = await Review.find({}).populate('service')
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



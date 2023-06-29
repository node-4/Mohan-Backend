// const {ReviewModel, ProductModel} = require('../models');
const Review = require('../Models/Reviewjob')
// const Product = require('../Models/Product')
const mongoose = require('mongoose');
const Job = require('../Models/Job');

const jobExists = async (jobId) => {
    try{

        // console.log("machineId", jobId)

        if(!mongoose.Types.ObjectId.isValid(jobId)){
            return false
        }
        // console.log("machine")

        const job = await Job.findById(jobId);
        // const machine = await Machine.findById(machineId)
        // console.log("machine", machine)
        if(!job){
            return false;
        }
 
        return true;
    } catch(error){
        throw error;
    }
}

exports.addReview = async (payload) => {
    try{
        const jobExist = await jobExists(payload.job);
console.log(payload)
        if(!jobExist){
            return{
                success: false,
                statusCode: 404,
                error: `job with id ${jobExist} does not exist`
            }
        }

        let review = await Review.findOne({user: payload.user, job: payload.job});

        if(!review){
            review = new Review(payload);
        }
        
        
        review.star_rating = payload.star_rating,
        review.user = payload.user,
        review.job = payload.job,
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

exports.getJobsReviews = async (jobId) => {
    try{
        const jobExist = await jobExists(jobId)
        
        // console.log("machineId")
        if(!jobExist){
            return {
                success: false,
                error: `job with id ${jobId} not found`,
                statusCode: 404
            }
        }

        const reviews = await Review.find({job: jobId}).populate('user');

        return {
            success: true,
            msg: `job's review`,
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
        const reviews = await Review.find({user: userId}).populate('job')
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
        const reviews = await Review.find({}).populate('job')
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



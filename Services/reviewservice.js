// const {ReviewModel, ProductModel} = require('../models');
const Review = require('../Models/Review')
const Product = require('../Models/Product')
const mongoose = require('mongoose');
const Machine = require('../Models/Machine');

const productExists = async (productId, machineId) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return false
        }

        const product = await Product.findById(productId);
        // const machine = await Machine.findById(machineId)
        console.log(product)
        if(!product){
            return false;
        }
 
        return true;
    } catch(error){
        throw error;
    }
}

exports.addReview = async (payload) => {
    try{
        const productExist = await productExists(payload.product);
console.log(payload)
        if(!productExist){
            return{
                success: false,
                statusCode: 404,
                error: `product with id ${productExist} does not exist`
            }
        }

        let review = await Review.findOne({user: payload.user, product: payload.product});

        if(!review){
            review = new Review(payload);
        }
        
        
        review.star_rating = payload.star_rating,
        review.user = payload.user,
        review.product = payload.product,
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

exports.getProductsReviews = async (productId) => {
    try{
        console.log(productId)
        const productExist = await productExists(productId);

        if(!productExist){
            return {
                success: false,
                error: `product with id ${productId} not found`,
                statusCode: 404
            }
        }

        const reviews = await Review.find({product: productId}).populate('user');

        return {
            success: true,
            msg: `product's review`,
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
        const reviews = await Review.find({user: userId}).populate('product')
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
        const reviews = await Review.find({}).populate('product')
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



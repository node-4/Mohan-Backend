const reviewService = require('../Services/reviewservice');

exports.addReview = async (req, res, next) => {
    try{
  
        const payload = req.body
        const result = await reviewService.addReview({
            ...payload,
            user:req.user
        });
        console.log(result)

        if(!result.success){
            return res.status(result.statusCode).json({
                error: result.error
            })
        }

        return res.status(result.statusCode).json({
            msg: result.msg,
            review: result.data
        })
    } catch(error){
        console.log(error);
        next(error);
    }
}

exports.getProductsReviews = async (req, res, next) => {
    try{
        const result = await reviewService.getProductsReviews(req.params.productId);

        if(!result.success){
            return res.status(result.statusCode).json({
                error: result.error
            })
        }

        return res.status(result.statusCode).json({
            msg: result.msg,
            review: result.data
        })
    } catch(error){
        console.log(error);
        next(error);
    }
}

// exports.getReviewsofUser = async (req, res, next) => {
//     try{
//         const result = await reviewService.getReviewsofUser(req.user._id);

//         return res.status(result.statusCode).json({
//             msg: result.msg,
//             reviews: result.data
//         })
//     } catch(error){
//         console.log(error);
//         next(error);
//     }
// }

exports.getallreviewsmadebyuser = async(req,res,  next) => {
    try {
        const result = await reviewService.getallreviewsmadebyuser(req.user._id);

                return res.status(result.statusCode).json({
                    msg: result.msg,
                    reviews: result.data
                })
            }
     catch (error) {
        next(error)
    }
}





exports.GetAllReview = async (req, res, next) => {
    try{
        const result = await reviewService.GetAllReview();

        return res.status(result.statusCode).json({
            msg: result.msg,
            reviews: result.data
        })
    } catch(error){
        console.log(error);
        next(error);
    }
}
const reviewService = require('../Services/reviewser');

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

exports.getServicesReviews = async (req, res, next) => {
    try{
        const result = await reviewService.getServicesReviews(req.params.serviceId);

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
        const result = await reviewService.getallreviewsmadebyuser(req.user._id)

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
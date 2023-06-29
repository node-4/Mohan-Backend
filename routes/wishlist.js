const express = require('express')

const router = new express.Router()
const Wishlist = require('../Models/Wishlist')
const Auth = require('../middleware/auth')
const ADAuth = require('../middleware/adauth')
const Product = require('../Models/Product')



router.post('/add', Auth.Auth , async(req, res)=>{

    try {

        const ppp = req.body.product

        const got = await Wishlist.findOne({'products.product': req.body.product})

        console.log( "hohioh    ", got)

        if(!got){

            const addtowishlist = new Wishlist({

                user: req.user
            })


            const resulttt = await addtowishlist.save()


            addtowishlist.products =   addtowishlist.products.concat({ppp})
            const result = await addtowishlist.save()

            console.log(",jhv,jbj,b ",result )

            // console.log("gggggggiuuuuug" , Products)
            console.log("resul    t   ", result)
            res.status(201).json({
                message: "Added to wishlist sucessfully",
                products:result,
                            })
           
        }

     if(got) {




        res.status(400).json({
            message:"Already present in the wishlist"
        })
            

        }
       
    }catch (e){
        res.status(500).send(e)
    }
} )


//to fetch single item of wishlist

router.get('/get/:id', async(req, res)=>{
    try{
        const result = await Wishlist.findOne({_id: req.params.id})
        console.log(result)
        res.status(200).json({message:"The details of the product are",
                                data: result})

    }catch (e){
        res.status(501).send(e)
    }
})

//TO GET ALL THE ITEMS OF WISHLIST
router.get('/getall',Auth.Auth, async(req, res)=>{

    console.log(req.user.id)
    try{

        const result = await Wishlist.find({user:req.user.id}).populate('products')

        console.log(result)
        res.status(200).json({data: result })

    }catch(e){
        res.status(501).send(e)
    }

    
})

//TO SEE THE WISHLIST BY ADMIN
router.get('/getallbyadmin',ADAuth, async(req, res)=>{

    // const sss = prodcut.product
    // console.log(req.user.id)
    try{

        const result = await Wishlist.find({}).populate('products')
        // .populate('products')

        // await result.populate('products')
        

        console.log(result)
        res.status(200).json({data: result })

    }catch(e){
        res.status(501).send(e)
    }

    
})

//to delete the wishlist

router.delete('/delete', Auth.Auth , async(req, res)=>{
    try{
        const result = await Wishlist.deleteMany({user:req.user.id})

        res.status(201).json({data:result})
    }catch(e){
        res.status(501).json(e)
    }
})
 //TO DELETE ONE ITEM OF WISHLIST
router.delete('/deleteoneitem/:id', Auth.Auth,  async(req, res)=>{


    try{

        const result = await Wishlist.findByIdAndDelete({_id: req.params.id})
        console.log(result)
        res.status(200).send(result)

    }catch(e){

        res.status(501).send(e)
    }

})



module.exports = router
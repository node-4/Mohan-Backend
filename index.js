const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
const path = require("path");

const adminRoute = require('./routes/admin')
const otpRoute = require('./otproute')
const userRoute = require('./routes/user')
const otp = require('./otproute')
const categoryRoute = require('./routes/category')
const subcategoryRoute = require('./routes/subcategory')
const machineRoute = require('./routes/machine')
const serviceRoute = require('./routes/service')
const leaselistingRoute = require('./routes/leaselisting')
const jobRoute = require('./routes/job')
const productRoute = require('./routes/product')
const notificationRoute = require('./routes/notification')
const bannerRoute = require('./routes/banner')
const wishlistRoute = require('./routes/wishlist')
const reviewRoute = require('./routes/review')
const reviewmachineRoute = require('./routes/reviewmachine')
const reviewjobRoute = require('./routes/reviewjob')
const reviewserviceRoute = require('./routes/reviewservice')
const handsRoute = require('./routes/h&s')
const Ads = require('./routes/ads_router');
const package = require('./routes/package');
const policy = require('./routes/privacy')
const terms = require('./routes/terms');
const report = require('./routes/report')
dotenv.config()
const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb_URL || "mongodb+srv://Nisha:Nisha19@machinery.bbomhuy.mongodb.net/test").then(() => {
    console.log('DB connection successful')
}).catch((error) => {
    console.log(error)
})
app.use("/public", express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 2000
app.use(express.json())
app.use(cors())
app.get('/', (req,res) => {
    res.status(200).send("Working")
})
app.use('/adminroute', adminRoute)
app.use('/otp', otpRoute)
app.use('/userroute', userRoute)
app.use('/category', categoryRoute)
app.use('/subcategory', subcategoryRoute)
app.use('/machine', machineRoute)
app.use('/service', serviceRoute)
app.use('/leaselisting', leaselistingRoute)
app.use('/job', jobRoute)
app.use('/product', productRoute)
app.use('/notification', notificationRoute)
app.use('/banner', bannerRoute)
app.use('/favourite', wishlistRoute)
app.use('/review', reviewRoute);
app.use('/ads', Ads);
app.use('/package', package);
app.use('/privacy', policy);
app.use('/terms', terms);
app.use('/report', report )
app.use('/machinereview', reviewmachineRoute)
app.use('/jobreview', reviewjobRoute)
app.use('/servicereview', reviewserviceRoute)
app.use('/hns', handsRoute)
app.listen(port, () => {
    console.log('server is up on the port' + port)
})
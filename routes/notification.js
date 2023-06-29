const router=require("express").Router()
const Controller=require("../controller/notificationcntrl")
const auth=require("../middleware/auth")

router.route("/addnotification").post(Controller.addNotification)
router.route("/getnotification").get(Controller.getNotification)
router.route("/deletenotification/:id").delete(Controller.deletenotification)


module.exports=router
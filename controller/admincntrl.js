const Admin = require('../Models/Admin');
const User = require('../Models/User')
const ads = require('../Models/Ad');
const product = require('../Models/Product');
const machine = require('../Models/Machine');
// const{upload_Admin} = require('../multer')


exports.addAdmin = async(req,res) => 
{
    try{
        const {name, password, email} = req.body;
        // const AdminImg = req.file ? req.file.filename : null;
        const newAdmin = new Admin({
         name,
         password,
         email,
        //  adminimg:process.env.BASE+"public/Admin/"+AdminImg
       });
       const saved = await newAdmin.save()
        const token = await newAdmin.generateAuthToken();
        res.status(201).send({saved, token})
    }catch (e){
        res.status(501).send(e)
    }




}

exports.loginAdmin = async(req,res) => {
    try {
               const admin = await Admin.findByCredentials(req.body.email, req.body.password)
               const token = await admin.generateAuthToken()
              res.status(200).send({admin, token})
                }
            catch (e) {
                res.status(400).send(e)
            }
}

exports.getAdmin = async(req , res) => {
    try {
        const getAdmin = await Admin.find({})
        if(getAdmin){

            return res.status(200).json(getAdmin)

        }
        else {

            res.status(400).send("something bad happened")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}
exports.getbyid = async(req,res) => {
    try {
        const getAdmin = await Admin.find({_id:req.params.id})
        return res.status(200).json(getAdmin)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}
exports.editAdmin = async (req, res) => {
    const { admin } = req.body;
    // const adminimg = req.file ? req.file.path : null;
try {
  const updatead = await Admin.findByIdAndUpdate({ 
    _id: ObjectId(req.params.id) 
    },
    {
     admin,
    // adminimg:process.env.BASE+"public/Admin/"+adminimg

    }
  );
  return res.status(201).json({ msg: "Admin updated successfully" ,
data: updatead});
} catch (error) {
  return res.status(500).json({ msg: error.message });
}
};
exports.logoutAdmin = async(req,res) => {
    try {
                req.admin.tokens = req.admin.tokens.filter((token) => {
                    return token.token !== req.token
                })
                await req.admin.save()
                res.send('Logged out from this device successfully')
            } catch (error) {
                res.status(500).send(error)
            }
}
exports.logoutAdminAll = async(req,res) => {
    try {
        req.admin.tokens = [];
        await req.admin.save()
        res.send('Logout frm all devices successfully')
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.deleteAdmin = async (req, res) => {
    try {
      const deleteAdmin = await Admin.findByIdAndRemove({
        _id: req.params.id
      });
      console.log(req.params.id)
      return res.status(200).json({ msg: "Admin deleted successfully" ,data:  deleteAdmin});
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
    };



exports.filterDate = async(req,res) => {
    let start, end;

  switch (req.query.filter) {
    case 'today':
      start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      end = new Date();
      end.setUTCHours(23, 59, 59, 999);
      break;
    case 'week':
      start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      start.setDate(start.getDate() - start.getUTCDay());
      end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setUTCHours(23, 59, 59, 999);
      break;
    case 'month':
      start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      start.setDate(1);
      end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      end.setUTCHours(23, 59, 59, 999);
      break;
    case 'yearly':
      start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      start.setMonth(0);
      start.setDate(1);
      end = new Date(start);
      end.setFullYear(end.getFullYear() + 1);
      end.setDate(0);
      end.setUTCHours(23, 59, 59, 999);
      break;
    default:
      return res.status(400).json({ message: 'Invalid filter' });
  }
    try{
        console.log(start, end)
        const Product = await product.find({
            dateField: {
              $gte: start,
              $lte: end
            }
          });
        const Machine = await machine.find({
            dateField: {
                $gte: start,
                $lte: end
              }
        })
        const Users = await User.find({
            dateField: {
                $gte: start,
                $lte: end
              }
        })
        res.status(200).json({
            message: "ok",
            Users : Users.length, 
            Machine: Machine.length, 
            Product: Product.length
        })
    }catch(err){
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }
}
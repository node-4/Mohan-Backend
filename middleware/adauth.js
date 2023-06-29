const jwt = require("jsonwebtoken");

const Admin = require("../Models/Admin");

const ADAuth = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace('Bearer ', '')
      console.log(token)
      const decoded = jwt.verify(token, process.env.ADToken);
      const admin = await Admin.findOne({ _id: decoded._id, "tokens.token": token });
      if (!admin) {
      return  new Error();
      }  
      else{
      req.admin = admin;
      next();
  }
    } catch (e) {
      res.status(401).send({ error: e});
      next()
    }
  };
  module.exports = ADAuth;
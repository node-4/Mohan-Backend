const jwt = require("jsonwebtoken");
const User = require("../Models/User");
exports.Auth  = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.Token_Key);
    console.log(decoded)
    
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    console.log("userauth",user)
    if (!user) {
      throw new Error();
    }
    else{
    req.user = user;
    next();
}
  } catch (e) {
    res.status(401).send({ error:e });
    
  }
};
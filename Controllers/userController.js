const userModel = require("../Models/userModel");
const {validationResult} = require('express-validator')
const JWT =   require("jsonwebtoken")
// const {  } = require("express-validator");
const userRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        status: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let data = req.body;
    // console.log(data);
    let registration = await userModel.registration(data);
    if (registration) {
      return res.status(201).send({ status: true, msg: "successs" });
    } else {
      return res
        .status(400)
        .send({ status: true, msg: "something went wrong" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

const userLogin = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        status: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
   let email = req.body.email;
    let password = req.body.password;
    let checkEmail = await userModel.checkEmail(email , password);
 
    if (checkEmail.length>0) {
      let Token = JWT.sign({
        userId:checkEmail[0].id
      },"jwtSecretKey")
      res.setHeader("x-api-key", Token)
      
      return (res.status(200).send({status: true,msg:"success" }))
      } else {
      return res.status(404).send({
        status: false,
        msg: "invalid emailId and password ",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};


const chat = async function( req, res){
try{
let data = req.body
let id = req.body.Receiver
let checkUserById =await userModel.checkUserById(id)
if(checkUserById.length>0){
let chatRegister = await userModel.chatRegister(data)
if(chatRegister){
  return res.status(201).send({status:true, msg:"successfully"})
}else{
  return res.status(400).send({status:false , msg:" something went wrong"})
}
}else{ return res.status(404).send({status:false , msg :"no data found by this id"})}
 }catch(err){
     return res.status(500).send({status: false , error:err.message})
  }
 }


 
 const getAllDetails = async function(req, res){
  try{
const getAllDetails = await userModel.getAllDetails()
if(getAllDetails){
   return res.status(200).send({status:true, msg:getAllDetails  })
}else{ return res.status (400).send({status: false , msg:"something went wrong" })}

  }catch(err){
     return res.status(500).send({status:false , error :err.message})
  }
 }

module.exports.userRegistration = userRegistration;
module.exports.userLogin = userLogin;
module.exports.chat = chat;
module.exports.getAllDetails = getAllDetails;

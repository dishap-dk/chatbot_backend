const userModel = require("../Models/userModel");
const {validationResult} = require('express-validator')
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
    let email = req.body.email;
    let password = req.body.password;
    let checkEmail = await userModel.checkEmail(email);
    if (checkEmail) {
      let checkPassword = await userModel.checkPassword(email);
      if (checkPassword[0].password === password) {
        return res.status(200).send({ status: true, msg: "successfull" });
      } else {
        return res
          .status(400)
          .send({ status: false, msg: " password not match" });
      }
    } else {
      return res.status(404).send({
        status: false,
        msg: "not found any details by this email id ",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

 const chat = async function( req, res){
  try{
let data = req.body.description

let chatRegister = await userModel.chatRegister(data)
if(chatRegister){
  return res.status(201).send({status:true, msg:"successfully"})
}else{
  return res.status(400).send({status:false , msg:" something went wrong"})
}

  }catch(err){
     return res.status(500).send({status: false , error:err.message})
  }
 }



 const getAllDetails = async function(req, res){
  try{
const getAllDetails = await userModel.getAllDetails()
if(getAllDetails){
   return res.status(200).send({status:true, msg:getAllDetails  })
}else{ return res.statu (400).send({status: false , msg:"spmething went wrong" })}

  }catch(err){
     return res.status(500).send({status:false , error :err.message})
  }
 }

module.exports.userRegistration = userRegistration;
module.exports.userLogin = userLogin;
module.exports.chat = chat;
module.exports.getAllDetails = getAllDetails;

const JWT = require("jsonwebtoken")
const userModel = require("../Models/userModel")
function Authentication(req,res,next){
    try{
    let Token = req.headers["x-api-key"];
    if(!Token) 
    { return res.status(404).send({status:false , msg :"token must be present"})

    }
      JWT.verify(Token," jwtSecretKey",function(err,decodToken){
        if(err){
            return res.status(401).send({status:false , msg:"token is not valid"})
        }else{
            req.Token=decodToken
            next()
        }
      })
    }catch(err){
        return res.status(500).send({status:false , error:err.message})
}
}



const Authorisation = async function (req, res, next) {
    try {
        let userId = req.body.userId
           if (!userId) return res.status(400).send({ status: false, message: " user id is mandatory" })

            const user = await userModel.findById( userId )
          
            if (!user) return res.status(404).send({ status: false, message: "No user Found" })
            
            //==================== Comparing userid of DB and Decoded Documents =====================//
            if (user.id.toString() !== req.token.userId) 
                return res.status(403).send({ status: false, message: `Unauthorized access!` });

            return next()
        } 
    // } 
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
    
}
module.exports={Authentication, Authorisation}
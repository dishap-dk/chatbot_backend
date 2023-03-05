const JWT = require("jsonwebtoken")

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

module.exports={Authentication}
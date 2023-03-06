
const {body , check} = require("express-validator");

exports.registerUserSchema=[
    check('name')
    .not()
    .isEmpty()
    .withMessage("Name is mandatory")
    .isLength({min:5})
    .withMessage("Name Should Be Not Be Less Than 5 Length"),
    check('email')
    .not()
    .isEmpty()
    .withMessage("Email Cannot Be Empty")
    .isEmail()
    .withMessage("please enter the valid email"),
    check('password')
    .not()
    .isEmpty()
    .withMessage("password is mandatory")
    .isLength({min:5})
    .withMessage("length of password  should be 5"),
    check('city')
    .not()
    .isEmpty()
    .withMessage("City Is Mandatory")

]
  exports.loginUserSchema = [
            check("email")
              .not()
              .isEmpty()
              .withMessage("Email Is Required")
              .isEmail()
              .withMessage("Email Must Be A Valid Email"),
            check("password")
            .not()
            .isEmpty()
            .withMessage("Password Is Required")
          ];

    
  

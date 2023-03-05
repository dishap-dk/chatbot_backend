
const {body , check} = require("express-validator");

exports.registerUserSchema=[
    check('name')
    .not()
    .isEmpty()
    .withMessage("name is mandatory")
    .isLength({min:5})
    .withMessage("name should be not be less than 5 length"),
    check('email')
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
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
    .withMessage("city is mandatory")

]
  exports.loginUserSchema = [
            check("email")
              .not()
              .isEmpty()
              .withMessage("Email is required")
              .isEmail()
              .withMessage("Email must be a valid email"),
            check("password")
            .not()
            .isEmpty()
            .withMessage("Password is required")
          ];

    
  

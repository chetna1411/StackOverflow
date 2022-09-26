const usercontroller=require("../controllers/user.controller")
const {validateSignUp}=require("../middleware/authVerify")
const {validateSignIn}=require("../middleware/authVerify")
module.exports = (app)=>
{
    //Signup --> POST 127.0.0.1:8080/stackoverflow/api/v1/auth/signup
    app.post("/stackoverflow/api/v1/auth/signup",[validateSignUp], usercontroller.signup);
    
    //Signin --> POST 127.0.0.1:8080/stackoverflow/api/v1/auth/signin
    app.post("/stackoverflow/api/v1/auth/signin", [validateSignIn],usercontroller.signin);
}
const { verifyToken}=require("../middleware/jwtVerify")
const controller=require("../controllers/answer.controller")

module.exports=(app)=>{
    app.post("/stackoverflow/api/v1/answer/:id", [verifyToken],controller.answercreate)
}
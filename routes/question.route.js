const controller=require("../controllers/question.controller")
const { verifyToken}=require("../middleware/jwtVerify")

module.exports=(app)=>{
    app.post("/stackoverflow/api/v1/questions/create", [verifyToken],controller.createQuestion)

    app.get("/stackoverflow/api/v1/questions/read/:id",controller.getQues)

    app.put("/stackoverflow/api/v1/questions/update/:id",[verifyToken],controller.update)
}
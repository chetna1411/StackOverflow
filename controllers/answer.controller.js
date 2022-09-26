const Question=require("../models/question.model")
const Answer=require("../models/answer.model")

//Creating the answer for particular question
exports.answercreate=async (req,res)=>{
    //fetching the question id from params
    const quesid=req.params.id
    //Fetching the data from body
    const ansobj={
        questionId:quesid,
        answer_Description:req.body.answer_Description,
        submitted_By:req.userId
    }
    try{
    const isvalid=await Question.findById(quesid)
    //checking if quesid is valid or not
    if(!isvalid)
    {
        return res.status(400).send({message:"Invalid question id"})
    }
    //Checking in the question schema whether userid already gave the answer or not
    if(isvalid.answer.includes(req.userId))
    {
        return res.status(400).send({message:"Answer already given by this user"})
    }
     
    const details=await Answer.create(ansobj)
    isvalid.answer.push(req.userId)
    //increasing the popularity of the question 
    isvalid.popularity++
    await isvalid.save()
    res.status(201).send(details)
    }
    catch(err)
    {
      console.log(err.message)
      res.status(500).send({message:"Error while sending the answer"})
    }
}
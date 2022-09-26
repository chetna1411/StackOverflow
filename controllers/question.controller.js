const Question=require("../models/question.model")

//Creating the question
exports.createQuestion= async(req,res)=>{
    const quesObj={
        user:req.userId,
        question_description:req.body.question_description
    }
    try
    {
       const quescreate=await Question.create(quesObj)
       res.status(201).send(quescreate)
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:"Error occuring while creating the question"})
    }
}

//Get the question and increase the popularity by one

exports.getQues=async (req,res)=>{
    const quesid=req.params.id
    try
    {
    const details=await Question.findById(quesid)
    console.log(details)
    //checking whether ques id exist or not
    if(!details)
    {
       return res.status(404).send({message:"Question id doesn't exist"})
    }
    details.popularity++
    await details.save()
    res.status(200).send({
        user:details.user,
        question_description:details.question_description,
        popularity:details.popularity,
        createdAt:details.createdAt,
        updatedAt:details.updatedAt
    })
    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).send({message:"Internal Error"})
    }
}

exports.update=async (req,res)=>{
    const quesid=req.params.id
    const quesObj={
        question_description:req.body.question_description
    }
    try{
    const ques=await Question.findById(quesid)
    if(!ques)
    {
        return res.status(404).send({message:"Question id doesn't exist"})
    }
    //checking the user is same or not
    if(ques.user!=req.userId)
    {
       return res.status(401).send({message:"Unauthorized,user can't edit the question"})
    }
    ques.question_description=quesObj.question_description
    await ques.save()
    
    res.status(201).send({message:"Updated successfully"})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:"Error occuring while updating the question"})
    }
}
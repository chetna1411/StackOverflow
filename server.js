const express = require("express");
const mongoose=require("mongoose")
const app = express();
const bodyParser=require("body-parser")
const PORT = process.env.PORT || 8080; // port at which server listening

app.use(bodyParser.json())

//connecting to database
mongoose.connect("mongodb://localhost/stackoverflow",()=>{
  console.log("Connected to database")
})

require("./routes/user.route")(app)
require("./routes/question.route")(app)
require("./routes/answer.route")(app)


app.listen( PORT,
  console.log(`server started at port ${PORT}`)
);

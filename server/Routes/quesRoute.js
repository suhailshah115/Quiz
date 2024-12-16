
const express =require("express")
const { QuestionGet, QuestionCreate, QuestionDelete } = require("../controller/QuestionController")
const questionRoute= express.Router()

questionRoute.post("/createQuestion",QuestionCreate)
questionRoute.get("/getQuestion",QuestionGet)
questionRoute.delete("/deleteQuestion/:id",QuestionDelete)


module.exports={questionRoute}
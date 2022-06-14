const mongoose=require("mongoose")

const connect=mongoose.connect("mongodb+srv://App123:App123@cluster0.56dvjei.mongodb.net/news?retryWrites=true&w=majority")

module.exports=connect;
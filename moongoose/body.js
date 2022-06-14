const mongoose=require("mongoose")


const NewsSchema=mongoose.Schema({
Title: {},
Description: {},
Date: {},
Author:{
    type:String,
    enum:["Mathias","Newburn","Rey Rutty","Magdaia Shellard","Kathrine Faichney"]
} ,
Location:String,
tags:{
    type:String,
    enum:["politics","crime","tech","sports","health"]
},
totalviews:Number,
category:String
})

const news=mongoose.model("mynew",NewsSchema)

module.exports=news
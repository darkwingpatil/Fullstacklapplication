const express=require("express")
const mydata=require("./News/news")
const app=express()
const connect=require("./moongoose/head")

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use("/news",mydata)

app.get("/",(req,res)=>{
    
    res.send("welcome to new application")
})

const port =process.env.PORT || 8080

app.listen(port,async()=>{
    try{
        await connect
        console.log("started")
    }
    catch{
        console.log("something went wrong")
    }

})


const {Router}=require("express")
const news=require("../moongoose/body")
const mydata=Router()

//
//
///
mydata.get("/get",async(req,res)=>{

    console.log(req.query)
    if(req.query.location)
    {
        let data1=await news.find({Location:{$regex:req.query.location, $options: 'i'}})
        return res.send(data1)
    }
   
    else if(req.query.q)
    {
        let data=await news.find({Title:{$regex:req.query.q, $options: 'i'}})

        return res.send(data)
    }
    else if(req.query.author)
    {
        if(req.query.author[0].length>1)
        {
            
            let data=await news.find({Author:{$regex:req.query.author[0], $options: 'i'},Author:{$regex:req.query.author[1], $options: 'i'}})
            return res.send(data)
        }
        let data=await news.find({Author:{$regex:req.query.author, $options: 'i'}})

        return res.send(data)
    }
    else if(req.query.tag)
    {
        let data=await news.find({tag:{$regex:req.query.tag, $options: 'i'}})
        console.log(data)
        return res.send(data)
    }
    else if(req.query.pageSize && req.query.pageNo)
    {
        let data=await news.find().skip(req.query.pageNo).limit(req.query.pageSize)
        return res.send(data)
    }
    else if(req.query._id)
    {
        const{_id}=req.query
        let alldata=await news.findByIdAndUpdate({_id},{ $inc: { totalviews: 1 } }, {new: true })
        console.log(alldata.totalviews)
        if(alldata.totalviews>100)
        {
            let newdata=await news.findByIdAndUpdate({_id},{category:"top"})
            return res.send(newdata)
        }
        else if(alldata.totalviews>50)
        {
            let newdata=await news.findByIdAndUpdate({_id},{category:"trending"})
            return res.send(newdata)
        }
        return res.send(alldata)
    }

    let alldata=await news.find()
    console.log(alldata)
    res.send(alldata)
    

})

mydata.post("/new",async(req,res)=>{

    const data=new news(req.body)
    await data.save()

    res.send(data)
    
})
mydata.delete("/",(req,res)=>{
    res.send("hey deleting respone")
})
mydata.put("/",(req,res)=>{
    res.send("hey updating respone")
})

module.exports=mydata;
const express = require('express');
const mongoose = require('mongoose');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const { count } = require('./mydb.js');
const app = express();
const sinners = require('./mydb.js');
const rating = require('./rating.js');
app.use(express.json())


//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/fuck_db';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/movie',async (req,res)=>{
  let list = await sinners.find();
  res.json(list);
})

app.put('/movie/:id',async(req,res)=>{
  await sinners.updateOne({id:Number(req.params.id)},req.body)
  res.json({msg:"Ok"})
})

app.post('/movie/',async(req,res)=>{

let item = new sinners(req.body)
let rat = new rating({id:Number(item.id),rating:[]})

go = await sinners.find({id:Number(item.id)}).count()

if(go==1){
  return res.json({msg:"already exist"});
}

await rat.save((err,res)=>{
  if(err){
    console.log(err)
  }
})

await item.save((err,res)=>{
  if(err){
    console.log(err)
  }
})
res.json({msg:"OK"})
})

app.post('/movie/rating/:id',async(req,res) =>{

  let nums =  await sinners.find({id:Number(req.params.id)}).count()

  if(nums){

    await rating.updateOne({id:Number(req.params.id)},{$push:{rating:Number(req.body.rating)}})
    let arr = await rating.find({id:Number(req.params.id)});
    console.log(arr)
    return res.json({rating:arr[0].rating})
  }
res.json({msg:"No such id exists"})
})

app.delete('/movie/:id',async (req,res)=>{
 await sinners.deleteOne({id:Number(req.params.id)});
 await rating.deleteOne({id:Number(req.params.id)});
 res.json({msg:"ok"})
})


app.listen(9000,()=>{console.log("Server listening on port 9000")});

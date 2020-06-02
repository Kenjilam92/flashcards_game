const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const mongoose = require ("mongoose"); 

//connect database
mongoose.connect ('mongodb://localhost/flash_cards_game',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  .then(()=> console.log("database connected"))
    .catch(err=>console.log('failed to connect database', err));

//structuring model
const CardSchema = new mongoose.Schema({
  "front" : {  type: String ,
              required: [true,"This can't be emty"],
              maxlength: [255,"Maximum Characters is 255"]
  },
  "back"  : {  type: String,
              required: [true,"This can't be emty"],
              maxlength: [255,"Maximum Characters is 255"] 
  },
  "collections"  : {type: Array, default: ["public"]}

},{timestamps: true});//define structure

const Card = mongoose.model("cards", CardSchema) //define the name of the table in database.

// const CollectionSchema = new mongoose.Schema({
//   "collection_name": {  type: String ,
//               required: [true,"This can't be emty"]
//   },
//   "cards" : []  
// },{timestamps: true});

// const Collection = mongoose.model("cards_collection", CollectionSchema)

//CRUD functions(controllers) && Route
app.use ( express.json()); //beginning point
app.use ( express.urlencoded({ extended:true }));//beginning point
app.use (cors())

app.get ("/api/cards",(req,res)=>{
  Card.find()
      .then(data=> res.json(data))
      .catch(err => res.json(err))
});
app.get ("/api/cards/:id",(req,res)=>{
  req.params.id==="random"?
  Card.find()
      .then(data=> {
          let random = Math.floor(Math.random() * data.length);
          const selected_card = data[random]
          res.json(selected_card)
      })
      .catch(err=> res.json(err))
  :
  Card.findOne({_id: req.params.id})
    .then(data=>res.json(data))
    .catch(err => res.json(err))
})

app.post ("/api/cards/new", (req,res) => {
  console.log("a card is added")
  Card.create(req.body)
    .then(data=>res.json(data))
    .catch(err => res.json(err))
})
app.put ("/api/cards/update/:id", (req,res)=>{
  console.log("update")
  Card.findOneAndUpdate({_id:req.params.id}, req.body)
    .then(data=>res.json(data))
    .catch(err => res.json(err))
});

app.delete ("/api/cards/delete/:id",(req,res)=>{
  Card.findOneAndRemove({_id:req.params.id})
    .then(data=>res.json(data))
    .catch(err => res.json(err))
});

app.listen(port,()=> console.log(`runing backend at port ${port}`))// end point



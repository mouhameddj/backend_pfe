const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const QuestionSchema = new mongoose.Schema({
title:{
    type:String,
    
  },
  

description:{
    type:String,
   

},
idUser:{
    type:objectId,
   
},




});
module.exports=mongoose.model('Question',QuestionSchema)
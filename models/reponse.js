const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const ReponseSchema = new mongoose.Schema({
idUser:{
    type:objectId,
       
  },
  
  idQuestion:{
    type:objectId,
   
},
text:{
    type:String,

},




});
module.exports=mongoose.model('Reponse',ReponseSchema)
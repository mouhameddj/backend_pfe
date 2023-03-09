const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const EmploiSchema = new mongoose.Schema({
title:{
    type:String,
  
},
description:{
    type:String,

},
 dateheure:{
    type:Date,
    
},
enddate:{
    type:Date,
    
},

id_Formation:{
    type:objectId,
   
}

});
module.exports=mongoose.model('emploi',EmploiSchema)
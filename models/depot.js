const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const DepotSchema = new mongoose.Schema({
id_Etudiant:{
        type:objectId,
       
    },
id_Formateur:{
        type:objectId,
       
    },
 file:{
    type:String,
    
},
date:{
    type:Date,
    
},

descreption:{
    type:String,
   
},
etat:{
    type:Boolean,
   
},
remarques:{
    type:String
}

});
module.exports=mongoose.model('depot',DepotSchema)
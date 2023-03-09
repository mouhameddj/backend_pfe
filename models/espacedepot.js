const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const EspaceDepotSchema = new mongoose.Schema({
expiration:{
        type:Date,
        
    },
id_Formation:{
        type:objectId,
       
    },
id_Formateur:{
        type:objectId,
       
    },


});
module.exports=mongoose.model('espacedepot',EspaceDepotSchema)
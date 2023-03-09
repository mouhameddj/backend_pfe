const mongoose=require('mongoose');
const objectId = require('mongodb').ObjectID;
const FormationSchema = mongoose.Schema({
    title:{
        type:String,
        required : true,
    },
     description:{
        type:String,
        required : true,
    },
     date:{
        type:Date,
        required : true,
    }, 
    nbr_heure:{
        type:Number,
        required : true,
    },
     formateur:{
        type:objectId,
        
    }, 
    specialite:{
        type:String,
        required : true,
    }, image:{
        type:String,
        required : true,
    },
     groupe:{
        type:Array,
        required : true,
    },
     prix:{
        type:Number,
        required : true,
    },
     technologies:{
        type:String,
        required : true,
    }



});
module.exports=mongoose.model('formation',FormationSchema);
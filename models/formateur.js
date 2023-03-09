const mongoose=require('mongoose');
const FormateurSchema=mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    lastname:{
        type:String,
        required : true,
    },
    genre:{
        type:String,
        required : true,
    },
    age:{
        type:Number,
        required : true,
    },
    specialite:{
        type:String,
        required : true,
    },
    image:{
        type:String,
       
    },
    linkFb:{
        type:String,
      
    },
    linkLn:{
        type:String,
      
    },
    
    email:{
        type:String,
        default:null,
        required : true,
        unique:true,
    },
    tel:{
        type:String,
      
    },
    

    password:{
        type:String,
        required : true,
    },
   
    role:{
        type:String,
        required : true,
    }

});
module.exports=mongoose.model('formateur',FormateurSchema);
const mongoose = require('mongoose');
const EtudiantSchema=new mongoose.Schema({

  name:{
        type:String,
    
    },
    lastname:{
        type:String,
    
    },
    genre:{
        type:String,
     
    },
    age:{
        type:Number,
     
    },
    specialite:{
        type:String,
       
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
    
    },
    tel:{
        type:Number,
      
    },
    

    password:{
        type:String,
        
    },
   
    role:{
        type:String,
       
    },

});
module.exports=mongoose.model('etudiant',EtudiantSchema)
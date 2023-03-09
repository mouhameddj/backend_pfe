const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const FeedbackSchema = new mongoose.Schema({
id_User:{
    type:objectId,
       
  },
text:{
    type:String,

},


id_Formation:{
    type:objectId,
   
}

});
module.exports=mongoose.model('Feedback',FeedbackSchema)
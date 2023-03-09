const express = require('express');
const Feedback = require('../models/feedback');
const router = express.Router();
const res = require('express/lib/response');






router.post('/ajout', (req, res)=>{

    let fpostman= req.body;
    let feedback = new Feedback(fpostman);
    console.log(req.body);
    feedback.save().then(
    (data)=>{
        res.send(data);

    },
    (err)=>{
        res.send(err);

    }
    )
});
router.get('/getall',(req,res)=>{
    Feedback.aggregate(
        [
          {
              $lookup:{
                  from:'formations',
                  localField: 'id_Formation',
                  foreignField: '_id',
                  as : 'formation'


              }

          },
          {
            $lookup:{
                from:'etudiants',
                localField: 'id_User',
                foreignField: '_id',
                as : 'utilisateur'


            }

        }
        ]


  ).then(
         (data)=>{
             res.send(data);
         },
         (err)=>{res.send(err);
         }
     )
     
 });
 router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    Feedback.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);
        }
    );
    
});

    router.put('/update/:id',(req,res)=>{
        let id = req.params.id;
        let a =req.body;
      
        Feedback.findOneAndUpdate(
            {_id:id},
            a,{new:true}
        ).then(
            (updated)=>{
            res.send(updated);},
            (err)=>{
                res.send(err)
            }
        );
        });


        module.exports=router;

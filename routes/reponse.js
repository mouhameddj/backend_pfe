const express = require('express');
const res = require('express/lib/response');

const Reponse = require('../models/reponse');
const router = express.Router();

router.post('/ajout',  (req, res) => {
    let reponsefrombody = req.body;
    let reponse = new Reponse(reponsefrombody);
    reponse.save().then(
        (data)=>{
            res.send(data);
        },
        (err)=>{
            res.send(err);
        }

    )


});
router.get('/getall',(req,res)=>{
    Reponse.find().then(
         (data)=>{
             res.send(data);
         },
         (err)=>{res.send(err);
         }
     )
     
 });
 router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    Reponse.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);
        }
    );
    
});
router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    Reponse.findById({_id:id}).then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
    
    });
    router.put('/update/:id',(req,res)=>{
        let id = req.params.id;
        let a =req.body;
       
        Reponse.findOneAndUpdate(
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

const express = require('express');
const EDEPOT = require('../models/espacedepot');
const router = express.Router();
const res = require('express/lib/response');






router.post('/ajout', (req, res)=>{

    let Epostman= req.body;
    let Edepot = new EDEPOT(Epostman);
    console.log(req.body);
    Edepot.save().then(
    (data)=>{
        res.send(data);

    },
    (err)=>{
        res.send(err);

    }
    )
});
router.get('/getall',(req,res)=>{
 EDEPOT.find().then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
    
    });
 router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    EDEPOT.findByIdAndDelete({_id:id}).then(
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
      
        EDEPOT.findOneAndUpdate(
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
        router.get('/getbyidformateur/:id_Formateur', (req, res) => {

            let id = req.params.id_Formateur;
            
            EDEPOT.find({ id_Formateur: id }).then(
                (data) => {
                    res.send(data);
                },
                (error) => {
                    console.log(error)
                    res.send(error);
                }
            );
        
        });


        module.exports=router;

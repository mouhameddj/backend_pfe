const express = require('express');
const res = require('express/lib/response');

const Emploi = require('../models/emploi');
const router = express.Router();
router.post('/ajout',(req,res)=>{
    let emploifrombody = req.body;
    let emploi = new Emploi(emploifrombody);
    emploi.save().then(
        (data)=>{
            res.send(data);
        },
        (err)=>{
            res.send(err);
        }

    )


});
router.get('/getall', (req, res) => {

    Emploi.
    
    aggregate(
          [
            {
                $lookup:{
                    from:'formations',
                    localField: 'id_Formation',
                    foreignField: '_id',
                    as : 'formation'


                }

            }
          ]


    )
    
    
    .then(

        (data) => {
            res.send(data);
        },
        (error) => {
            res.send(value);
        }
    )

});
router.delete('/delete/:id',(req,res)=>{
    let id=req.params.id;
    Emploi.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);}
            )
        


});
router.put('/update/:id',(req,res)=>{
    let id = req.params.id;
    let a =req.body;
    
    Emploi.findOneAndUpdate(
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
router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    Emploi.findById({_id:id}).then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
    
    });
module.exports=router;
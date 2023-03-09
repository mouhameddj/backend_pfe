const express = require('express');
const Formation = require('../models/formation');
const router = express.Router();
const multer = require('multer');
const Formateur = require('../models/formateur');


filename = '';

const storage1 = multer.diskStorage(
    {
    destination : './upload/formation',
    filename: function(req, file, cb){
        date = Date.now();
        cb(null, date + '.' + file.mimetype.split('/')[1]);
        let fl = date + '.' + file.mimetype.split('/')[1];
        filename=fl;

    },
    }
);
const upload =  multer ({storage: storage1});
router.post('/ajout', upload.any('image'), (req, res) => {

 
    let groupe = JSON.parse(req.body.groupe.split(','));

    let FormationFromPostman = req.body;
    let formation = new Formation(FormationFromPostman);
    formation.image = filename;
    formation.groupe = groupe;
    formation.save().then(
        (data) => {
            console.log(data);
            filename = '';
            res.send(data);
        },
        (error) => {
            filename = '';
            console.log(error);
            res.send(error);
        }

    )
});
router.get('/getall',(req,res)=>{
    Formation.find().then(
         (data)=>{
             res.send(data);
         },
         (err)=>{res.send(err);
         }
     )
     
 });
 router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    Formation.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);
        }
    );
    
});
router.get('/getbyid/:id',(req,res)=>{
   
    let id = req.params.id
    Formation.findById({_id:id}).then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
});

    
    
    
    router.put('/update/:id',upload.any('image'),(req,res)=>{
        let id = req.params.id;
        let a =req.body;
        if(filename.length>0){
            a.image= filename;
        }
        Formation.findOneAndUpdate(
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

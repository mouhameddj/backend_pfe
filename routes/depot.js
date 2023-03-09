const express = require('express');
const Depot = require('../models/depot');
const router = express.Router();
const multer = require('multer');



filename = '';

const storage1 = multer.diskStorage(
    {
    destination : './upload/feedback',
    filename: function(req, file, cb){
        date = Date.now();
        cb(null, date + '.' + file.mimetype.split('/')[1]);
        let fl = date + '.' + file.mimetype.split('/')[1];
        filename=fl;

    },
    }
);
const upload =  multer ({storage: storage1});
router.post('/ajout', upload.any('file'), (req, res) => {

 

    let depotpostman = req.body;
    let depot = new Depot(depotpostman);
    depot.file = filename;
  
  depot.save().then(
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
    Depot.aggregate(
        [
          {
              $lookup:{
                  from:'formateurs',
                  localField: 'id_Formateur',
                  foreignField: '_id',
                  as : 'formateur'


              }

          },
          {
            $lookup:{
                from:'etudiants',
                localField: 'id_Etudiant',
                foreignField: '_id',
                as : 'etudiant'


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
    Depot.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);
        }
    );
    
});
router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id_Formation;
    Depot.findOne({_id:id}).then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
    
    });
    router.put('/update/:id',upload.any('file'),(req,res)=>{
        let id = req.params.id;
        let a =req.body;
        if(filename.length>0){
            a.image= filename;
        }
        Depot.findOneAndUpdate(
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

            let id_Formateur = req.params.id_Formateur;
            Depot.find({ id_Formateur: id_Formateur }).then(
                (data) => {
                    res.send(data);
                },
                (error) => {
                    console.log(error)
                    res.send(error);
                }
            );
        
        });
        router.get('/getbyidetudiant/:id_Etudiant', (req, res) => {
        
            let id_Etudiant = req.params.id_Etudiant;
            Depot.find({ id_Etudiant: id_Etudiant }).then(
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

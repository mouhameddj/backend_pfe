const express = require('express');
const Formateur = require('../models/formateur');
const bcrypt = require('bcrypt');
const jwt = require( 'jsonwebtoken');
const res = require('express/lib/response');
const router=express.Router();
const multer = require('multer');
filename = '';

const storage1 = multer.diskStorage(
    {
    destination : './upload/formateur',
    filename: function(req, file, cb){
        date = Date.now();
        cb(null, date + '.' + file.mimetype.split('/')[1]);
        let fl = date + '.' + file.mimetype.split('/')[1];
        filename=fl;

    },
    }
);
const upload =  multer ({storage: storage1});
router.post('/ajout',upload.any('image'),(req,res)=>{
    let formateurfrombody=req.body;
    let formateur = new Formateur(formateurfrombody);
    formateur.image=filename;
    let Key =bcrypt.genSaltSync(10);
formateur.password=bcrypt.hashSync(formateurfrombody.password,Key);
formateur.save().then(
    (data)=>{
        filename = '';
        res.send(data);
    },
    (err)=>{
        res.send(err);
    }
)
});
router.post('/login',(req,res)=>{
    let formateurData = req.body;
    Formateur.findOne({email:formateurData.email}).then(
        (data)=>{
            let validpass=bcrypt.compareSync(formateurData.password,data.password)
            if(validpass==false){
                console.log('pass or email invalid');
            }else{
            
                let token = jwt.sign({_id:data._id,email:data.email,role:data.role},'123@456');
                res.send({myToken:token});

            }

        },
        (err)=>{
           res.send('email or password non valide')
        }
    )
    
    
});
router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    Formateur.findById({_id:id}).then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
    
    });
    router.get('/getall',(req,res)=>{
       
        Formateur.find().then(
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
            Formateur.findByIdAndDelete({_id:id}).then(
                (deleted)=>{
                    res.send(deleted);
                },
                (err)=>{
                    res.send(err);
                }
            );
            
        });
        router.put('/update/:id',upload.any('image'),(req,res)=>{
            let id = req.params.id;
            let a =req.body;
            if(filename.length>0){
                a.image= filename;
            }
            Formateur.findOneAndUpdate(
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
        

const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require( 'jsonwebtoken');
const res = require('express/lib/response');
const router=express.Router();
const multer = require('multer');
filename = '';

const storage1 = multer.diskStorage(
    {
    destination : './upload/admin',
    filename: function(req, file, cb){
        date = Date.now();
        filename = date + '.' + file.mimetype.split('/')[1]
        cb(null, filename);
       

    },
    }
);
const upload =  multer ({storage: storage1});






//register
router.post('/register',upload.any('image'),(req,res)=>{
let adminfrombody=req.body;
let admin = new Admin(adminfrombody);
admin.image=filename;
//cryptage
let Key =bcrypt.genSaltSync(10);
admin.password=bcrypt.hashSync(adminfrombody.password,Key);
admin.save().then(
    (data)=>{
        filename = '';
        res.send(data);
    },
    (err)=>{
        res.send(err);
    }
)
});
//login
router.post('/login',(req,res)=>{
    let adminData=req.body;

    Admin.findOne({email:adminData.email}).then(
        (data)=>{
          
            let validPass=bcrypt.compareSync(adminData.password,data.password);
            if(validPass == false){
                console.log(validPass);
                res.send('email or pass incorrect')
            }else{
                let token = jwt.sign({_id : data._id, email: data.email, role:data.role},'123@456');
                res.send({myToken :token});
            }
        },
        (err)=>{
            res.send('email or pass invalid')
        }
    )
    
    
    
});
//getid
router.get('/getbyid/:id',(req,res)=>{
let id = req.params.id;
Admin.findById({_id:id}).then(
    (data)=>{
        res.send(data);

    },
    (err)=>{
    res.send(err)

}
)


});

router.put('/update/:id',upload.any('image'),(req,res)=>{
    let id=req.params._id;
    let a=req.body;
    if(filename.length>0){
        a.image=filename;

    }
    Admin.findOneAndUpdate(
        {_id:id},
        a,{new:true}).then(
            (updated)=>{
                res.send(updated)
            },
            (err)=>{
                res.send(err);
            }

        )
    
});
module.exports=router;
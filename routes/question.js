const express = require('express');
const Question = require('../models/question');
const router = express.Router();


router.post('/ajout',  (req, res) => {

 

    let QuestionFromPostman = req.body;
    let question = new Question(QuestionFromPostman);
   
  
  question.save().then(
        (data) => {
            console.log(data);
           
            res.send(data);
        },
        (error) => {
         
            console.log(error);
            res.send(error);
        }

    )
});
router.get('/getall',(req,res)=>{
    Question.aggregate([

        { $lookup:{

            from:'etudiants',
            localField: 'idUser',
            foreignField: '_id',
            as: 'etudiant'

        } },
        { $lookup:{

            from:'formateurs',
            localField: 'idUser',
            foreignField: '_id',
            as: 'formateur'

        } },
        { $lookup:{

            from:'reponses',
            localField: '_id',
            foreignField: 'idQuestion',
            as: 'reponses'

        } },
        {
            $unwind: {
                path: '$reponses',
                preserveNullAndEmptyArrays: true

            }
        },
        { $lookup:{

            from:'etudiants',
            localField: 'reponses.idUser',
            foreignField: '_id',
            as: 'reponses.etudiant'

        } },
        { $lookup:{

            from:'formateurs',
            localField: 'reponses.idUser',
            foreignField: '_id',
            as: 'reponses.formateur'

        } },

        {
            $group:{

                _id: "$_id",
                title: { $first: "$title" },
                description: { $first: "$description" },
                formateur: { $first: '$formateur' },
                date: { $first: '$date' },

                etudiant: { $first: '$etudiant' },

                reponse: { $push: '$reponses' }

            }
        }



    ]).then(
         (data)=>{
             res.send(data);
         },
         (err)=>{res.send(err);
         }
     )
     
 });
 router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    Question.findByIdAndDelete({_id:id}).then(
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
    Question.findById({_id:id}).then(
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
       
        Question.findOneAndUpdate(
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

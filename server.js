const express = require('express')
const mongoose = require('./config/db_config');
const cors = require('cors');
const AdminApi=require('./routes/admin');
const FormateurApi=require('./routes/formateur');
const EtudiantApi=require('./routes/etudiant');

const EmploiApi=require('./routes/emploi')

const FormationApi=require('./routes/formation');
const FeedbackApi=require('./routes/feedback');
const DepotApi=require('./routes/depot');
const EspacedepotApi=require('./routes/espacedepot');
const QuestionApi=require('./routes/question');
const ReponseApi=require('./routes/reponse');


let app = express();
app.use(express.json());
app.use(cors());
app.use('/admin',AdminApi);
app.use('/formateur',FormateurApi);
app.use('/etudiant',EtudiantApi);
app.use('/emploi',EmploiApi);
app.use('/formation',FormationApi);
app.use('/feedback',FeedbackApi);
app.use('/depot',DepotApi);
app.use('/espacedepot',EspacedepotApi);
app.use('/question',QuestionApi);
app.use('/reponse',ReponseApi);
//import de l'image
app.use('/getimageadmin',express.static('./upload/admin'))
app.use('/getimageformateur',express.static('./upload/formateur'))
app.use('/getimageetudiant',express.static('./upload/etudiant'))
app.use('/getimageformation',express.static('./upload/formation'))
app.use('/getdepot',express.static('./upload/depot'))




app.listen(3000,()=>{
    console.log('server work');
})
var express=require('express');
var app=express();
var morgan=require('morgan');
var dbroute=require('./routes/dbRoutes.js');
var apiroute=require('./routes/routes.js');
var mongoose=require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.mongo_db,{useNewUrlParser:true,useUnifiedTopology:true})
        .then((result) => console.log('connected to db')).catch(error =>console.log(error));

const port=process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/db',dbroute);

app.use('/api',apiroute);


app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
});


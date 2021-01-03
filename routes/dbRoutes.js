var express=require('express');
var router= express.Router();
var Course=require('../model/dbSchema');

router.get('/', (req,res) =>{
    Course.find().then(result => res.send(result)).catch(error =>console.log(error));
});

// getting data from mongodb

router.get('/Courses',(req,res) =>{
    Course.find().then(result => res.send(result)).catch(error =>console.log(error));
});

//put data into mongo db
router.post('/Courses', (req,res) =>{
    const addCourse=new Course(req.body);
    addCourse.save().then(result =>res.send(result)).catch(error => console.log(error));
});

// updating data into mongodb

router.patch('/Courses/:id', (req,res) =>{

    //using the sync and await 
//    try {
//        const id =req.params.id;
//        const course=req.body;
//        const options= {new : true};
//        const result=await Course.findByIdAndUpdate(id,course,options);
//        res.send(result);
//    } catch (error) {
//        console.log(error);
//    } 

     // using the promises
      const course=Course.findById(req.params.id).then(result =>console.log(result)).catch(error => console.log(error));
      if(!course) return res.status(404).send(`the given ${id} was not found in db`);
      course.subject=req.body.subject;
      course.credits=req.body.credits;
      Course.findByIdAndUpdate(req.params.id, course ,{new: true}).then(result => res.send(result)).catch(error => console.log(error));
});

//deleting a record from db

router.delete('/Courses/:id', async(req,res) =>{
    try{
        const id=req.params.id;
        const result=await Course.findByIdAndDelete(id);
        res.send(result);
    }catch (error){
       console.log(error);
    }
});

module.exports= router 
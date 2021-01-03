var express=require('express');
var router= express.Router();
var moment=require('moment');
const {v4: uuidv4}=require('uuid');
var {validationSchema}=require('../model/SchemaValidator');

const courses = [
    { id: uuidv4(), subject: 'Telugu', credits: '8',date: moment().format()}, 
    { id: uuidv4(), subject: 'Hindi',  credits: '7',date: moment().format()}];

    //landing page get api
router.get('/',(req,res) =>{
    res.send('<h1>hellow world welcome to the landing page</h1>');
    res.end();
});

   //getting all courses api
router.get('/courses',(req,res) =>{
    res.json(courses);
    res.end();
});
    
   // using the path params
router.get('/courses/:id',(req,res) =>{
    const course_id =courses.find(c => c.id === (req.params.id));
    if(course_id){
       res.json(course_id);
       res.end();
    }else {
        return res.status(404).send(`<h1> provide ${req.params.id} is not found in array`);
    } 
});

  //post request 
router.post('/courses', (req,res) =>{

    //validating the body schema
    const result =validationSchema(req.body);
   if (result.error){
       return res.status(400).send(result.error.details[0].message);
   } 

   //adding new course
    const addedCourse={
        id: uuidv4(),
        subject: req.body.subject,
        credits: req.body.credits,
        date:moment().format(),
    };
    courses.push(addedCourse);
    res.status(201).send(addedCourse);
    res.end();
});

// put request

router.put('/courses/:id',(req,res) =>{

    //checking wheather course id is there or not
    const course_id =courses.find(c => c.id === (req.params.id));
    if(!course_id) return res.status(404).send(`<h1> provide ${req.params.id} is not found in array`);

    // validating body schema
    const result =validationSchema(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message); 
    
    //updating the course
    course_id.subject=req.body.subject;
    course_id.credits=req.body.credits;
     res.status(200).send(course_id);
     res.end();

});

router.delete('/courses/:id',(req,res) =>{
    
    //checking wheather course id is there or not
    const course_id =courses.find(c => c.id === (req.params.id));
    if(!course_id) return res.status(404).send(`<h1> provide ${req.params.id} is not found in array`);

    //deleting the course
    const delete_course=courses.indexOf(course_id);
    courses.splice(delete_course,1);
    res.status(200).send(course_id);
    
});

module.exports=router
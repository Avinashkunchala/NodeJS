var mongoose=require('mongoose');

var Schema=mongoose.Schema;

const courseSchema= new Schema({
    subject:{
        type : String,
        required: true

    },
    credits: {
        type: String,
        required: true
    }
},{timestamps: true});

const Course=mongoose.model('Course',courseSchema);

module.exports=Course;
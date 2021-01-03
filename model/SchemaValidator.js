const Joi=require('joi');

const schema={
    subject: Joi.string().min(3).required(),
    credits: Joi.string().max(2).required()
}

function validationSchema(course){
  return Joi.validate(course,schema);
}

module.exports.validationSchema=validationSchema;

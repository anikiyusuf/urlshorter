const Joi = require('joi');

const shortUrlSchema = Joi.object({
  full: Joi.string().required(),
  short: Joi.string().required(),
  clicks: Joi.number().required()
});

// Example usage
const data = {
  full: 'http://example.com',
  short: 'abc123',
  clicks: 0
};

async function validationResult(req, res , next){
    const data = req.body
   try{
    await shortUrlSchema.validateAsync(data)
     next()   
} catch (error){
    next({
          message: error.details[0].message
    })
}
}

// const validationResult = shortUrlSchema.validate(data);

// if (validationResult.error) {
//   console.error(validationResult.error);
// } else {
//   console.log('Data is valid');
// }

module.exports = { validationResult }
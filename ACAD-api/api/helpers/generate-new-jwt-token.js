const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = sails.config.jwtSecret || process.env.JWT_SECRET;

module.exports = {


  friendlyName: 'Generate new jwt token',


  description: '',


  inputs: {
    // regenerate refresh token 
    subject: {
      type: "string",
      required: true,
      isEmail: true,
  },
  refresh : {
    type: "string",
    required: false
  }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    // TODO

    try {

      const payload = {
        sub: inputs.subject, // subject
        iss: "LogRocket Sails API" // issuer
   };
   // check JWT refresh token
   const refresh = inputs.refresh // check 
   if (refresh){
   jwt.verify(token, secret, function(err, decoded) {

    if (err){
      exits.error
    }
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    return token
  });
}

    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
  

  // supply valid refresh token
  
      
    } catch (error) {
      

    }
    
    

    



    


 


  }


};


module.exports = {


  friendlyName: 'Generate new jwt refresh token',


  description: '',


  inputs: {

    subject: {
      type: "string",
      required: true,
      isEmail: true,
  },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    try {
      const random =  await sails.helpers.strings.random('url-friendly');
      const payload = {
        sub: inputs.subject, // subject
        iss: "LogRocket Sails API" // issuer,

   };
        // generate and regenerate refresh token 
    const token = jwt.sign(payload, secret, { expiresIn: "30d" });
    
    } catch (error) {
      
    }
    // generate and regenerate refresh token 
    const token = jwt.sign(payload, secret, { expiresIn: "30d" });
    // send valid token or if time don go , regenerate , save and send token


  }


};


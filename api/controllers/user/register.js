module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {

   
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },

    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },


  },


  exits: {

    success: {
      statusCode: 201,
      description: 'New user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Something went wrong',
    },

  },


  fn: async function (inputs, exits) {

    // All done.
   try {
    const newEmailAddress = inputs.email.toLowerCase();
    const token = await sails.helpers.strings.random('url-friendly');

    let newUser = await User.create({
      email: newEmailAddress,
      password: inputs.password,
      emailProofToken: token,
      emailProofTokenExpiresAt:
        Date.now() + sails.config.custom.emailProofTokenTTL,
    })
    .fetch();


    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newUser.email,
        subject: 'Please confirm your account',
        template: 'email-verify-account',
        templateData: {
          fullName,
          token: token
        }
      });
    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }

   

    return exits.success({
      message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
    });
   } catch (error) {

    if (error.code === 'E_UNIQUE') {
      return exits.emailAlreadyInUse({
        message: 'Oops :) an error occurred',
        error: 'This email address already exits',
      });

    
}
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
     
   }
    
  }


};

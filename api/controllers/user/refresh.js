module.exports = {


  friendlyName: 'Refresh',


  description: 'Refresh user.',


  inputs: {

    refresh: {
      type: 'string',
      description: "The Refresh token for JWT.",
      example: "4-32fad81jdaf$329",
    },


  },


  exits: {

    // Refresh token expired and JWT on success

    
    success: {
      description: "JWT token generated.",
    },
  invalidOrExpiredToken: {
    statusCode: 400,
    description:
      "The provided token has expired or invalid",
  },


  },


  fn: async function (inputs) {

    // All done.
    try {
       refresh = inputs.refresh
    
    if (!refresh) {
      return exits.invalidOrExpiredToken({
        error: "The provided token is expired, invalid, or already used up.",
      });
    };

    const token = await sails.helpers.generateNewJwtToken.with({subject:user.email, refresh:refresh});
    
    if (!token ) {
      return exits.invalidOrExpiredToken({
        error: "Invalid Refresh Token, Login to regenerate refresh token",
      });

    }
    
    return exits.success({
      message: `New JWT Token Generated successfully for  ${user.email}`,
      data: user,
      token,
    });


  } catch(error){
  sails.log.error(error);
}
  }

};

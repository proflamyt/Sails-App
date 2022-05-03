module.exports = {


  friendlyName: 'Refresh',


  description: 'Refresh user.',


  inputs: {

    token: {
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
    if (!inputs.token) {
      return exits.invalidOrExpiredToken({
        error: "The provided token is expired, invalid, or already used up.",
      });
    };

    jwt.verify(inputs.token, secret, function(err, decoded) {

      if (err){
        exits.error
      }
      const user = decoded.user
    });
    // t
    if (!user ) {
      return exits.invalidOrExpiredToken({
        error: "Invalid Refresh Token, Login to regenerate refresh token",
      });

    }
    const token = await sails.helpers.generateNewJwtToken(user.email);
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

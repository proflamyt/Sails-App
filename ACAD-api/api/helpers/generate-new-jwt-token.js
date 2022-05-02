const jwt = require("jsonwebtoken");


module.exports = {


  friendlyName: 'Generate new jwt token',


  description: '',


  inputs: {

    subject: {
      type: "string",
      required: true
  }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
  }


};


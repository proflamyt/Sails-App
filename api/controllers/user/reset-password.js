module.exports = {


  friendlyName: 'Reset password',


  description: '',


  inputs: {

    password: {
      description: "The new, unencrypted password.",
      example: "myfancypassword",
      required: true,
    },
    token: {
      description:
        "The password token that was in the forgot-password endpoint",
      example: "gwa8gs8hgw9h2g9hg29",
      required: true,
    },

  },


  exits: {

    success: {
      description:
        "Password successfully updated, and requesting user agent automatically logged in",
    },
    invalidToken: {
      statusCode: 401,
      description:
        "The provided password token is invalid, expired, or has already been used.",
    },

  },


  fn: async function (inputs) {

    // All done.
    if (!inputs.token) {
      return exits.invalidToken({
        error: "Your reset token is either invalid or expired",
      });
 }
  // Look up the user with this reset token.
 var user = await User.findOne({ passwordResetToken: inputs.token });

 if (!user || user.passwordResetTokenExpiresAt <= Date.now()) {
  return exits.invalidToken({
    error: "Your reset token is either invalid or expired",
  });
}
// Hash the new password.
const hashedPassword = await sails.helpers.passwords.hashPassword(
  inputs.password
);

// update the new user password

await User.updateOne({ id: user.id }).set({
  password: hashedPassword,
  passwordResetToken: "",
  passwordResetTokenExpiresAt: 0,
});

// Generate New JWT token and Send
const token = await sails.helpers.generateNewJwtToken(user.email);
this.req.user = user;
return exits.success({
  message: `Password reset successful. ${user.email} has been logged in`,
  data: user,
  token,
})

  }


};

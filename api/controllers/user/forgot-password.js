module.exports = {


  friendlyName: 'Forgot password',


  description: '',


  inputs: {

    email: {
      description:
        "The email address of the user who wants to recover their password.",
      example: "albus@dumbledore.com",
      type: "string",
      required: true,
  },


  },


  exits: {

    success: {
      description:
        "Email matched a user and a recovery email might have been sent",
  },

  },


  fn: async function (inputs) {
  // Find the record for this user.
    // (Even if no such user exists, pretend it worked to discourage sniffing.)
    var userRecord = await User.findOne({ emailAddress });
    if (!userRecord) {
      return;
    }//•

    // Come up with a pseudorandom, probabilistically-unique token for use
    // in our password recovery email.
    var token = await sails.helpers.strings.random('url-friendly');

    // Store the token on the user record
    // (This allows us to look up the user when the link from the email is clicked.)
    await User.updateOne({ id: userRecord.id })
    .set({
      passwordResetToken: token,
      passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
    });

    // Send recovery email
    await sails.helpers.sendTemplateEmail.with({
      to: emailAddress,
      subject: 'Password reset instructions',
      template: 'email-reset-password',
      templateData: {
        fullName: userRecord.fullName,
        token: token
      }
    });

  }

};

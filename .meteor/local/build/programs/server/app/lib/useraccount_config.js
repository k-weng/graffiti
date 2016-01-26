(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/useraccount_config.js                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
// Options                                                             //
AccountsTemplates.configure({                                          // 3
  // defaultLayout: 'emptyLayout',                                     //
  //showForgotPasswordLink: true,                                      //
  overrideLoginErrors: true,                                           // 6
  //enablePasswordChange: true,                                        //
  lowercaseUsername: true,                                             // 8
                                                                       //
  // sendVerificationEmail: true,                                      //
  // enforceEmailVerification: true,                                   //
  //confirmPassword: true,                                             //
  //continuousValidation: false,                                       //
  //displayFormLabels: true,                                           //
  //forbidClientAccountCreation: true,                                 //
  //formValidationFeedback: true,                                      //
  homeRoutePath: '/',                                                  // 17
  //showAddRemoveServices: false,                                      //
  //showPlaceholders: true,                                            //
                                                                       //
  negativeValidation: true,                                            // 21
  positiveValidation: true,                                            // 22
  negativeFeedback: false,                                             // 23
  positiveFeedback: true,                                              // 24
  texts: {                                                             // 25
    errors: {                                                          // 26
      loginForbidden: "Username or Password Incorrect"                 // 27
    }                                                                  //
  }                                                                    //
                                                                       //
});                                                                    //
                                                                       //
// Privacy Policy and Terms of Use                                     //
//privacyUrl: 'privacy',                                               //
//termsUrl: 'terms-of-use',                                            //
var pwd = AccountsTemplates.removeField('password');                   // 36
AccountsTemplates.removeField('email');                                // 37
AccountsTemplates.addFields([{                                         // 38
  _id: "username",                                                     // 40
  type: "text",                                                        // 41
  displayName: "username",                                             // 42
  required: true,                                                      // 43
  minLength: 3                                                         // 44
}, pwd]);                                                              //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=useraccount_config.js.map

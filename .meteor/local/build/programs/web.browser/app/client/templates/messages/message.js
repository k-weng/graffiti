(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/messages/message.js                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.registerHelper("getUsername", function (userId) {             // 1
	return Meteor.users.findOne({ _id: userId }).username;                // 2
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

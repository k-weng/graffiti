(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/main.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
// Meteor.subscribe('messages');                                       //
Meteor.subscribe('groups');                                            // 2
                                                                       //
Meteor.startup(function () {                                           // 4
	Session.set("currentGroup", this.name);                               // 5
	Session.set("isPrivate", false);                                      // 6
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

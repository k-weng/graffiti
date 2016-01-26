(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/application/navigation.js                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.nav.events({                                                  // 1
	'click #signOut': function (event) {                                  // 2
		AccountsTemplates.logout();                                          // 3
		Router.go('/groups');                                                // 4
	}                                                                     //
});                                                                    //
                                                                       //
Template.nav.helpers({                                                 // 8
	username: function () {                                               // 9
		if (Meteor.user()) return Meteor.user().username;                    // 10
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

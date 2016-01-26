(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/quit_group.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.quitGroup.events({                                            // 1
	'submit .quit-group': function (event) {                              // 2
		event.preventDefault();                                              // 3
		Router.go('/');                                                      // 4
		Meteor.call('quitGroup', this._id);                                  // 5
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/delete_group.js                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.deleteGroup.events({                                          // 1
	'submit .delete-group': function (event) {                            // 2
		event.preventDefault();                                              // 3
		var response = confirm("Are you sure you want to delete " + this.name + "?");
		if (response) {                                                      // 5
			Router.go('/');                                                     // 6
			Meteor.call('deleteGroup', this._id);                               // 7
		}                                                                    //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

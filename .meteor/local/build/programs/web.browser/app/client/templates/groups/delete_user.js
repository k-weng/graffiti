(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/delete_user.js                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.deleteUser.events({                                           // 1
	'submit .delete-user': function (event) {                             // 2
		event.preventDefault();                                              // 3
                                                                       //
		var input = $("#userToRemove").val().trim();                         // 5
		var groupId = this._id;                                              // 6
		var inGroup = Groups.find({ _id: groupId, people: { $in: [input] } }).count() === 1;
                                                                       //
		$("#userToRemove").val("");                                          // 9
                                                                       //
		if (input && input.length) {                                         // 11
			Meteor.call('doesUserExist', input, function (err, res) {           // 12
				if (res === 0 || !inGroup) $("#userToRemove").attr('placeholder', "User isn't in this Wall!");else if (res === 1 && inGroup) {
					Meteor.call('deleteUser', input, groupId);                        // 15
					$("#userToRemove").attr('placeholder', "User to Remove");         // 16
				}                                                                  //
			});                                                                 //
		} else {                                                             //
			$("#userToRemove").attr('placeholder', "Please fill in an user!");  // 20
		}                                                                    //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

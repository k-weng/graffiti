(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/add_user.js                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.addUser.events({                                              // 1
	'submit .add-user': function (event) {                                // 2
		event.preventDefault();                                              // 3
                                                                       //
		var input = $("#userToAdd").val().trim();                            // 5
		var groupId = this._id;                                              // 6
		var inGroup = Groups.find({ _id: groupId, people: { $in: [input] } }).count() === 1;
                                                                       //
		$("#userToAdd").val("");                                             // 9
                                                                       //
		if (input && input.length) {                                         // 11
			Meteor.call('doesUserExist', input, function (err, res) {           // 12
				if (input === Meteor.user().username) $("#userToAdd").attr('placeholder', "Can't add yourself!");else if (inGroup) $("#userToAdd").attr('placeholder', "User already added!");else if (res === 0) $("#userToAdd").attr('placeholder', "User doesn't exist!");else {
					Meteor.call('addUser', input, groupId);                           // 17
					$("#userToAdd").attr('placeholder', "User to Add");               // 18
				}                                                                  //
			});                                                                 //
		} else {                                                             //
			$("#userToAdd").attr('placeholder', "Please fill in an user!");     // 22
		}                                                                    //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

Template.addUser.events({
	'submit .add-user': function(event) { 
		event.preventDefault();
		
		var input = $("#userToAdd").val().trim();
		var groupId = this._id;
		var inGroup = Groups.find({_id: groupId, people: {$in: [input]}}).count() === 1;

		$("#userToAdd").val("");

		if(input && input.length) {
			Meteor.call('doesUserExist', input, function (err, res) {
				console.log(res);
				console.log(inGroup);
				if (input === Meteor.user().username) $("#userToAdd").attr('placeholder', "Can't add yourself!");
				else if(inGroup) $("#userToAdd").attr('placeholder', "User already added!");
				else if(res === 0) $("#userToAdd").attr('placeholder', "User doesn't exist!");
				else {
					Meteor.call('addUser', input, groupId);
					$("#userToAdd").attr('placeholder', "User to Add");
				}
			});
		} else {
			$("#userToAdd").attr('placeholder', "Please fill in an user!");
		}
	}
});

Template.deleteUser.events({
	'submit .delete-user': function (event) { 
		event.preventDefault();

		var input = $("#userToRemove").val();
		var groupId = this._id;
		var inGroup = Groups.find({_id: groupId, people: {$in: [input]}}).count() === 1;

		$("#userToRemove").val("");

		if(input && input.length) {
			Meteor.call('doesUserExist', input, function (err, res) {
				console.log(res);
				console.log(inGroup);
				if(res === 0 || !inGroup) $("#userToRemove").attr('placeholder', "User isn't in this Wall!");
				else if(res === 1 && inGroup) {
					Meteor.call('deleteUser', input, groupId);
					$("#userToRemove").attr('placeholder', "User to Remove");
				}
			});
		} else {
			$("#userToRemove").attr('placeholder', "Please fill in an user!");
		}
	}
});

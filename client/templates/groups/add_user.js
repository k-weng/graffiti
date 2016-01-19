Template.addUser.events({
	'submit .add-user': function(e) { 
		e.preventDefault();
		var newUser = $("#userName").val();
		e.stopPropagation();
		var inGroup = Groups.findOne({_id: this._id, people: {$in: [newUser]}}) == null;
		var groupId = this._id;
		Meteor.call('doesUserExist', newUser, function (error, result) {
			if (result === 1 && inGroup) {
				Meteor.call('addUser', newUser, groupId);
				console.log("New user added");
				console.log(Groups.find().fetch());
			} else {
				console.log("no");
			}
		});

		
	}
});
Template.addUser.events({
	'submit .add-user': function(e) { 
		e.preventDefault();
		var newUser = $("#userName").val();
		e.stopPropagation();
		var inGroup = Groups.findOne({_id: this._id, people: {$in: [newUser]}}) == null;
		var groupId = this._id;

		var message = "";
		var length = newUser.length > 0;
		var check = (newUser === Meteor.user().username);

		if (!length) message = "Please fill in an user";
		else if (newUser === Meteor.user().username) message = "You are already in the group";
		else if (!inGroup) message = "User is already in the group";

		Session.set('addUserMessages', message);

		Meteor.call('doesUserExist', newUser, function (error, result) {
			if (result === 1 && inGroup) {
				Meteor.call('addUser', newUser, groupId);
			} else if (result === 0 && length) {
				Session.set('addUserMessages', "User does not exist");
			}
		});
	}
});

Template.addUser.onCreated(function() {
	Session.set('addUserMessages', "");
});

Template.addUser.helpers({
	amessage: function() {
		return Session.get('addUserMessages');
	}
});
Template.addUser.events({
	'submit .add-user': function(e) { 
		e.preventDefault();
		var newUser = $("#userName").val();
		e.stopPropagation();
		var inGroup = Groups.findOne({_id: this._id, people: {$in: [newUser]}}) == null;
		var groupId = this._id;

		var message = "";
		var length = newUser.length > 0;
		console.log("The user being added: " + newUser);
		console.log("The current user: " + Meteor.user().username);
		var check = (newUser === Meteor.user().username);
		console.log("The current user is the user being added, true or false: " + check);
		if (!length) message = "Please fill in an user";
		else if (newUser === Meteor.user().username) message = "You are already in the group";
		else if (!inGroup) message = "User is already in the group";

		console.log("Setting session");
		Session.set('addUserMessages', message);

		console.log("Session is set to: " + Session.get('addUserMessages') + " .");

		Meteor.call('doesUserExist', newUser, function (error, result) {
			if (result === 1 && inGroup) {
				Meteor.call('addUser', newUser, groupId);
				console.log("New user added");
				console.log(Groups.find().fetch());
			} else if (result === 0 && lengths) {
				Session.set('addUserMessages', "User does not exist");
			}
		});

		
	}
});

Template.addUser.onCreated(function() {
	Session.set('addUserMessages', "");
	console.log("On created, session is " + Session.get('addUserMessages'));
});

Template.addUser.helpers({

	amessage: function() {
		console.log("In message helper, session is " + Session.get('addUserMessages'));
		return Session.get('addUserMessages');
	}
});
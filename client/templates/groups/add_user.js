Template.addUser.events({
	'submit .add-user': function(e) { 
		e.preventDefault();
		var newUser = $("#userName").val();
		e.stopPropagation();
		var inGroup = Groups.findOne({_id: this._id, people: {$in: [newUser]}}) == null;
		var groupId = this._id;

		Meteor.call('addUserMessage', newUser, function (error, result) {
			if (result) {
				Session.set('addUserMessages', result);
				console.log("The result is " + result + ".");
				console.log("Session has been set.");
			}
		});

		console.log("Session is set to: " + Session.get('addUserMessages') + " .");

		Meteor.call('doesUserExist', newUser, function (error, result) {
			if (error) return throwError(error.reason);

			if (result === 1 && inGroup) {
				Meteor.call('addUser', newUser, groupId);
				console.log("New user added");
				console.log(Groups.find().fetch());
			}
		});

		
	}
});

Template.addUser.onCreated(function() {
	Session.set('addUserMessages', "");
	console.log("On created, session is " + Session.get('addUserMessages'));
});

Template.addUser.helpers({
	message: function(field) {
		console.log("In message helper, session is " + Session.get('addUserMessages'));
		return Session.get('addUserMessages');
	}
});
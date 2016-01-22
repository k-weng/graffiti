Template.addGroup.events({
	"change .private input": function (event) {
    	Session.set("isPrivate", event.target.checked);
    	console.log("Private: " + event.target.checked);
    },
	'submit .add-group': function(e) {
		e.preventDefault();
		var groupName = $("#groupName").val();
		var currentUser = Meteor.user().username;
		var isPrivate = Session.get("isPrivate");
		console.log(Session.get("isPrivate"));
		e.stopPropagation();
		if (Groups.findOne({name: groupName, createdBy: currentUser}) == null) {
			Groups.insert({
				name: groupName,
				people: [currentUser],
				createdBy: currentUser,
				privateGroup: isPrivate
			});
			console.log(Groups.findOne({name: groupName, createdBy: currentUser}));
			console.log("New group added");	
		} else {
			console.log("Didn't happen");
		}
	}
});

Template.addGroup.helpers({
	hideCompleted: function () {
    	return Session.get("isPrivate");
    }
});
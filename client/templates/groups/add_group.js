Template.addGroup.events({
	'submit .add-group': function(e) {
		e.preventDefault();
		var groupName = $("#groupName").val();
		var currentUser = Meteor.user().username;
		e.stopPropagation();
		if (Groups.findOne({name: groupName, createdBy: currentUser}) == null) {
			Groups.insert({
				name: groupName,
				people: [currentUser],
				createdBy: currentUser
			});
			console.log("New group added");

			
		} else {
			console.log("Didn't happen");
		}
		
	}
})
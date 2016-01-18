Template.addGroup.events({
	'submit .add-group': function(e) {
		e.preventDefault();
		var groupName = $("#groupName").val();
		var currentUser = Meteor.userId();
		e.stopPropagation();
		console.log(groupName);
		console.log(currentUser);
		console.log(Groups.find({name: groupName}).groupName);
		if (Groups.findOne({name: groupName, createdBy: currentUser}) == null) {
			Groups.insert({
				name: groupName,
				people: [],
				createdBy: currentUser
			});
			console.log("New group added");
			
		} else {
			console.log(groupName);
		}
		
	}
})
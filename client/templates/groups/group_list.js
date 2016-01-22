Template.groupList.helpers({
	privateGroups: function() {
		var currentUser = Meteor.user().username;
		return Groups.find({people: {$in: [currentUser]}, privateGroup: true});
		//return Groups.find({createdBy: currentUser});
	},
	publicGroups: function() {
		return Groups.find({privateGroup: false});
	}
});
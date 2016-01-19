Template.groupList.helpers({
	groups: function(){
		var currentUser = Meteor.user().username;
		return Groups.find({people: {$in: [currentUser]}});
		//return Groups.find({createdBy: currentUser});
	}
});
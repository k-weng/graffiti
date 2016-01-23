Template.registerHelper("getUsername", function(userId) {
	return Meteor.users.findOne({_id: userId}).username;
});
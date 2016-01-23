Template.userPage.onCreated(function(){
	Meteor.subscribe('myMessages',Meteor.userId());
});

Template.userPage.helpers({
	myMessages: function(){
		return Messages.find({});
	}
});
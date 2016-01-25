Template.userPage.onCreated(function() {
	Meteor.subscribe('myMessages', Meteor.userId());
});

Template.userPage.helpers({
	myMessages: function(){
		return Messages.find({userId:Meteor.userId()},{sort:{timestamp:-1}});
	},

	hasMessages:function(){
		return Messages.find({userId:Meteor.userId()},{sort:{timestamp:-1}}).count() > 0;
	}
});
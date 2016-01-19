// Meteor.subscribe('messages');
Meteor.subscribe('groups');

Meteor.startup(function(){
	Session.set("currentGroup", this.name);
});


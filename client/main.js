// Meteor.subscribe('messages');
Meteor.subscribe('groups');

Meteor.subscribe('allUsers');

Meteor.startup(function(){
	Session.set("currentGroup", "PublicGroup" );
});


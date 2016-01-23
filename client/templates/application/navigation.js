Template.nav.events({
	'click #signOut': function(event) {
		AccountsTemplates.logout();
		Router.go('/groups');
	}
});

Template.nav.helpers({
	username: function() {
		if(Meteor.user()) return Meteor.user().username;
	}
});
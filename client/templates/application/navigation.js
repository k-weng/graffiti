Template.nav.events({
	'click #signOut':function(e){
		AccountsTemplates.logout();
		Router.go('/');
	}
});

Template.nav.helpers({
	username: function() {
		if(Meteor.user()) return Meteor.user().username;
	}
})
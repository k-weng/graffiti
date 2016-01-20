Template.nav.events({
	'click #signOut':function(e){
		AccountsTemplates.logout();
		Router.go('/');
	}
});
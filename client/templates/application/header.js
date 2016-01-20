Template.nav.events({
	'click button':function(e){
		AccountsTemplates.logout();
		Router.go('/');
	}
});
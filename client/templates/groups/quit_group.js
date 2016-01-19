Template.quitGroup.events({
	'submit .quit-group': function(e) {
		e.preventDefault();
		Router.go('/');
		Meteor.call('quitGroup',this._id);
	}
})
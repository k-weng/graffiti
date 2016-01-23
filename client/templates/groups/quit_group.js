Template.quitGroup.events({
	'submit .quit-group': function(event) {
		event.preventDefault();
		Router.go('/');
		Meteor.call('quitGroup',this._id);
	}
})
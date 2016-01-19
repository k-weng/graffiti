Template.deleteGroup.events({
	'submit .delete-group': function(e) {
		e.preventDefault();
		var response = prompt("If you really want to delete this group, please type out the group name.");
		if (response === this.name) {
			Router.go('/');
			Meteor.call('deleteGroup',this._id);
		}
	}
})
Template.group.events({
	'click .group':function(e){
		Session.set('currentGroup', this.name);
	}
});

Template.group.helpers({
	mine: function() {
		return this.createdBy === Meteor.user().username ? "mine" : "";
	}
});
Template.groupPage.helpers({
	ownerOf: function() {
		return this.createdBy === Meteor.user().username;
	}
})
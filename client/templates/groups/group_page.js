Template.groupPage.helpers({
	ownerOf: function() {
		return this.createdBy === Meteor.user().username;
	},
	isPublic: function() {
		console.log(Groups.find({_id: this._id, privateGroup: true}).count());
		return !(Groups.find({_id: this._id, privateGroup: true}).count() === 0);
	}
})
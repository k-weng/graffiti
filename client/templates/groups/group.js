Template.group.events({
	'click .group':function(e){
		Session.set('currentGroup', this._id);
		console.log(this.name);

	}
});
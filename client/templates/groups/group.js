Template.group.events({
	'click .group':function(e){
		Session.set('currentGroup', this.name);
		console.log(this.name);
	}
});
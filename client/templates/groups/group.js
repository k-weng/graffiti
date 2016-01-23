Template.group.events({
	'click .group':function(e){
		Session.set('currentGroup', this.name);
	}
});

Template.group.helpers({
	created: function() {
		return this.createdBy === Meteor.user().username ? "me" : this.createdBy;
	},

	currentMessage: function(){
		return "\"" + this.currentMessage + "\"";
	}
});
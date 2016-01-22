Template.groupPage.helpers({
	users: function(){
		return this.people.join(", ");
	},

	ownerOf: function() {
		return this.createdBy === Meteor.user().username;
	},
	isPrivate: function() {
		return this.privateGroup;
	},
	requireDropdown: function() {
		var isPrivate = this.privateGroup;
		var ownerOf = this.createdBy === Meteor.user().username;
		var check = !isPrivate && ownerOf;
		console.log("Check is: " + check);
		return isPrivate || check;
	},
	typeOfGroup: function() {
		return this.privateGroup ? "Private" : "Public";
	},
	colorOfGroup: function() {
		return this.privateGroup ? "privateColor" : "publicColor";
	}

})
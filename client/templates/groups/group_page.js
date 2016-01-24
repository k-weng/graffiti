Template.groupPage.helpers({
	users: function() {
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
		return isPrivate || check;
	},

	typeOfGroup: function() {
		return this.privateGroup ? "Private" : "Public";
	},
	
	colorOfGroup: function() {
		return this.privateGroup ? "privateColor" : "publicColor";
	},

	maxLife: function() {
		var mSecs = this.msgTime;
		var minutes = Math.floor(mSecs / 1000 / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		console.log(mSecs);
		console.log(minutes);
		console.log(hours);
		console.log(days);
		if (days > 0) return (days + " Day");
		else if (hours > 0) return hours === 1 ? "1 Hour" : (hours + " Hours");
		else if (minutes > 0) return minutes + " Minutes";
	}
});
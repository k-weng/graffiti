(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/group_page.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.groupPage.helpers({                                           // 1
	users: function () {                                                  // 2
		return this.people.join(", ");                                       // 3
	},                                                                    //
                                                                       //
	ownerOf: function () {                                                // 6
		return this.createdBy === Meteor.user().username;                    // 7
	},                                                                    //
                                                                       //
	isPrivate: function () {                                              // 10
		return this.privateGroup;                                            // 11
	},                                                                    //
                                                                       //
	requireDropdown: function () {                                        // 14
		var isPrivate = this.privateGroup;                                   // 15
		var ownerOf = this.createdBy === Meteor.user().username;             // 16
		var check = !isPrivate && ownerOf;                                   // 17
		return isPrivate || check;                                           // 18
	},                                                                    //
                                                                       //
	typeOfGroup: function () {                                            // 21
		return this.privateGroup ? "Private" : "Public";                     // 22
	},                                                                    //
                                                                       //
	colorOfGroup: function () {                                           // 25
		return this.privateGroup ? "privateColor" : "publicColor";           // 26
	},                                                                    //
                                                                       //
	maxLife: function () {                                                // 29
		var mSecs = this.msgTime;                                            // 30
		var minutes = Math.floor(mSecs / 1000 / 60);                         // 31
		var hours = Math.floor(minutes / 60);                                // 32
		var days = Math.floor(hours / 24);                                   // 33
		if (days > 0) return days + " Day";else if (hours > 0) return hours === 1 ? "1 Hour" : hours + " hours";else if (minutes > 0) return minutes + " minutes";
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

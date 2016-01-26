(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/group_list.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.groupList.events({                                            // 1
	'click #oldest': function (event) {                                   // 2
		Session.set("sort", "oldest");                                       // 3
		Session.set("order", 1);                                             // 4
	},                                                                    //
                                                                       //
	'click #oldest-pub': function (event) {                               // 7
		Session.set("sort-pub", "oldest");                                   // 8
		Session.set("order", 1);                                             // 9
	},                                                                    //
                                                                       //
	'click #recent': function (event) {                                   // 12
		Session.set("sort", "recent");                                       // 13
		Session.set("order", 1);                                             // 14
	},                                                                    //
                                                                       //
	'click #recent-pub': function (event) {                               // 17
		Session.set("sort-pub", "recent");                                   // 18
		Session.set("order", 1);                                             // 19
	},                                                                    //
                                                                       //
	'click #sprays': function (event) {                                   // 22
		Session.set("sort", "sprays");                                       // 23
		Session.set("order", 1);                                             // 24
	},                                                                    //
                                                                       //
	'click #sprays-pub': function (event) {                               // 27
		Session.set("sort-pub", "sprays");                                   // 28
		Session.set("order", 1);                                             // 29
	}                                                                     //
});                                                                    //
                                                                       //
Template.groupList.helpers({                                           // 33
	hasPrivate: function () {                                             // 34
		var currentUser = Meteor.user().username;                            // 35
		return Groups.find({ people: { $in: [currentUser] }, privateGroup: true }).count() > 0;
	},                                                                    //
                                                                       //
	sortButton: function () {                                             // 39
		var s = Session.get("sort");                                         // 40
		return s;                                                            // 41
	},                                                                    //
                                                                       //
	sortButtonPub: function () {                                          // 44
		return Session.get("sort-pub");                                      // 45
	},                                                                    //
                                                                       //
	privateGroups: function () {                                          // 48
		var currentUser = Meteor.user().username;                            // 49
		var s = Session.get("sort");                                         // 50
		var o = Session.get("order");                                        // 51
                                                                       //
		if (s === "sprays") {                                                // 53
			return Groups.find({ people: { $in: [currentUser] }, privateGroup: true }, { sort: { sprays: -1 } });
		} else if (s === "oldest") {                                         //
			return Groups.find({ people: { $in: [currentUser] }, privateGroup: true }, { sort: { timestamp: 1 } });
		} else if (s === "recent") {                                         //
			return Groups.find({ people: { $in: [currentUser] }, privateGroup: true }, { sort: { timestamp: -1 } });
		}                                                                    //
	},                                                                    //
                                                                       //
	publicGroups: function () {                                           // 62
		var currentUser = Meteor.user().username;                            // 63
		var s = Session.get("sort-pub");                                     // 64
		var o = Session.get("order");                                        // 65
		// return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{s:o}});
		if (s === "sprays") {                                                // 67
			// console.log("here")                                              //
			return Groups.find({ privateGroup: false }, { sort: { sprays: -1 } });
		} else if (s === "oldest") {                                         //
			// console.log("here")                                              //
			return Groups.find({ privateGroup: false }, { sort: { timestamp: 1 } });
		} else if (s === "recent") {                                         //
			// console.log("here")                                              //
			return Groups.find({ privateGroup: false }, { sort: { timestamp: -1 } });
		}                                                                    //
	}                                                                     //
});                                                                    //
                                                                       //
Template.groupList.onCreated(function () {                             // 80
	// debugger                                                           //
	Session.set("sort", "sprays");                                        // 83
	Session.set("sort-pub", "sprays");                                    // 84
	Session.set("order", 1);                                              // 85
	var self = this;                                                      // 86
	// debugger                                                           //
	// self.autorun(function(){                                           //
	// 	// debugger                                                       //
	// 	console.log(Session.get("sort"),Session.get("order"));            //
	// 	self.subscribe('groups',Session.get("sort"),Session.get("order"));
	// });                                                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

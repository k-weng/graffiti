(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/add_group.js                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.addGroup.events({                                             // 1
	'change .private input': function (event) {                           // 2
		Session.set("isPrivate", event.target.checked);                      // 3
	},                                                                    //
                                                                       //
	'change .selectpicker': function (event) {                            // 6
		var timeChoice = $(event.target).val();                              // 7
                                                                       //
		switch (timeChoice) {                                                // 9
			case "a":                                                           // 10
				Session.set("msgTime", 5 * 1000 * 60);                             // 11
				break;                                                             // 12
			case "b":                                                           // 13
				Session.set("msgTime", 30 * 1000 * 60);                            // 14
				break;                                                             // 15
			case "c":                                                           // 15
				Session.set("msgTime", 60 * 1000 * 60);                            // 17
				break;                                                             // 18
			case "d":                                                           // 19
				Session.set("msgTime", 4 * 60 * 1000 * 60);                        // 20
				break;                                                             // 21
			case "e":                                                           // 21
				Session.set("msgTime", 12 * 60 * 1000 * 60);                       // 23
				break;                                                             // 24
			case "f":                                                           // 24
				Session.set("msgTime", 24 * 60 * 1000 * 60);                       // 26
				break;                                                             // 27
			default:                                                            // 27
				Session.set("msgTime", 0);                                         // 29
		}                                                                    // 29
	},                                                                    //
                                                                       //
	'submit .add-group': function (event) {                               // 33
		event.preventDefault();                                              // 34
		var input = $("#groupName").val();                                   // 35
		input = input.trim();                                                // 36
		var currentUser = Meteor.user().username;                            // 37
		var isPrivate = Session.get("isPrivate");                            // 38
                                                                       //
		$("#groupName").val("");                                             // 40
		if (Session.get("msgTime") === 0) {                                  // 41
			alert("Please select a message fade time!");                        // 42
		} else {                                                             //
			if (Groups.findOne({ name: input, createdBy: currentUser }) == null && input.length) {
				Meteor.call('addGroup', input, currentUser, isPrivate, Session.get("msgTime"), function (err, res) {
					Router.go('groupPage', { _id: res._id });                         // 46
				});                                                                //
			} else {                                                            //
				if (Groups.find({ name: input, createdBy: currentUser }).count() === 1) $("#groupName").attr("placeholder", "Name exists already");
				if (!input.length) {                                               // 50
					$("#groupName").attr("val", "Gotta have a name!");                // 51
					$("#groupName").attr("placeholder", "Gotta have a name!");        // 52
				}                                                                  //
			}                                                                   //
		}                                                                    //
	},                                                                    //
                                                                       //
	'click #groupName': function (event) {                                // 58
		event.preventDefault();                                              // 59
		$("#groupName").attr("placeholder", "Name of Wall");                 // 60
	}                                                                     //
});                                                                    //
                                                                       //
Template.addGroup.helpers({                                            // 64
	hideCompleted: function () {                                          // 65
		return Session.get("isPrivate");                                     // 66
	}                                                                     //
});                                                                    //
                                                                       //
Template.addGroup.onRendered(function () {                             // 70
	Session.set("msgTime", 0);                                            // 71
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

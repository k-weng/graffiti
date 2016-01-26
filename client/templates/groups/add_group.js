Template.addGroup.events({
	'change .private input': function(event) {
  		Session.set("isPrivate", event.target.checked);
	},

	'change .selectpicker': function(event) {
		var timeChoice = $(event.target).val();

		switch (timeChoice) {
			case "a":
				Session.set("msgTime", (5 * 1000 * 60));
				break;
			case "b":
				Session.set("msgTime", (30 * 1000 * 60));
				break;
			case "c":
				Session.set("msgTime", (60 * 1000 * 60));
				break;
			case "d":
				Session.set("msgTime", (4 * 60 * 1000 * 60));
				break;
			case "e":
				Session.set("msgTime", (12 * 60 * 1000 * 60));
				break;
			case "f":
				Session.set("msgTime", (24 * 60 * 1000 * 60));
				break;
			default:
				Session.set("msgTime", 0);
		}
	},
	
	'submit .add-group': function(event) {
		event.preventDefault();
		var input = $("#groupName").val();
		input = input.trim();
		var currentUser = Meteor.user().username;
		var isPrivate = Session.get("isPrivate");
		
		$("#groupName").val("");
		if (Session.get("msgTime") === 0) {
			alert("Please select a message fade time!");	
		} else {
			if (Groups.findOne({name: input, createdBy: currentUser}) == null && input.length) {
				Meteor.call('addGroup', input, currentUser, isPrivate, Session.get("msgTime"), function (err,res) {
					Router.go('groupPage',{_id: res._id});
				});
			} else {
				if (Groups.find({name: input, createdBy: currentUser}).count() === 1) $("#groupName").attr("placeholder", "Name exists already");
				if (!input.length){
					$("#groupName").attr("val", "Gotta have a name!");
					$("#groupName").attr("placeholder", "Gotta have a name!");
				} 
			}
		}
	},

	'click #groupName': function(event) {
		event.preventDefault();
		$("#groupName").attr("placeholder", "Name of Wall");
	}
});

Template.addGroup.helpers({
	hideCompleted: function() {
  	return Session.get("isPrivate");
  }
});

Template.addGroup.onRendered(function() {
	Session.set("msgTime", 0);
});
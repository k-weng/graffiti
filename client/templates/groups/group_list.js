Template.groupList.onCreated(
	function(){
		Session.set("sort","recent");
	}
);

Template.groupList.helpers({
	sortButton: function(){
		return Session.get("sort")
	},

	privateGroups: function() {
		var currentUser = Meteor.user().username;
		var s = Session.get("sort");
		if(s==="recent"){
			console.log("here");
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{
				sort:{timestamp:-1}
			});
		}
		else if (s==="oldest"){
			console.log("here2");
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{
				sort:{timestamp:1}
			});
		}
		else if (s==="total"){
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{
				sort:{sprays:1}
			});
		}
	},

	publicGroups: function() {
		return Groups.find({privateGroup: false});
	}
});

Template.groupList.events({
	"click #recent":function(event){
		Session.set("sort","recent");
		console.log(Session.get("sort"))
	},
	"click #oldest":function(event){
		Session.set("sort","oldest");
		console.log(Session.get("sort"))
	},
	"click #total":function(event){
		Session.set("sort","total");
		console.log(Session.get("sort"))
	}
});
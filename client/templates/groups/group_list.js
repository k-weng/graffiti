Template.groupList.onCreated(
	function(){
		// debugger
		Session.set("sort","sprays");
		Session.set("order",1)
		var self=this;
		// debugger
		self.autorun(function(){
			// debugger
			console.log(Session.get("sort"),Session.get("order"));
			self.subscribe('groups',Session.get("sort"),Session.get("order"));
		});
	}
);

Template.groupList.helpers({
	sortButton: function(){
		return Session.get("sort")
	},

	privateGroups: function() {
		var currentUser = Meteor.user().username;
		var s = Session.get("sort");
		var o = Session.get("order");
		// return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{s:o}});
		if(s==="sprays"){
			console.log("here")
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{sprays:1}});
		}
		else if(s==="name"){
			console.log("here")
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{name:-1}});
		}else if(s==="createdBy"){
			console.log("here")
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{createdBy:1}});
		}
	},

	publicGroups: function() {
		return Groups.find({privateGroup: false});
	}
});

Template.groupList.events({
	"click #sprays":function(event){
		Session.set("sort","sprays");
		Session.set("order",1)

		console.log(Session.get("sort"))
	},
	"click #createdBy":function(event){
		Session.set("sort","createdBy");
		Session.set("order",1)

		console.log(Session.get("sort"))
	},
	"click #name":function(event){
		Session.set("sort","name");
		Session.set("order",1)

		console.log(Session.get("sort"))
	}
});
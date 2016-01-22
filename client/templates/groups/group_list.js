Template.groupList.onCreated(
	function(){
		// debugger
		Session.set("sort","sprays");
		Session.set("sort-pub","sprays");
		Session.set("order",1)
		var self=this;
		// debugger
		// self.autorun(function(){
		// 	// debugger
		// 	console.log(Session.get("sort"),Session.get("order"));
		// 	self.subscribe('groups',Session.get("sort"),Session.get("order"));
		// });
	}
);

Template.groupList.helpers({
	hasPrivate: function(){
		console.log("alright");
		var currentUser = Meteor.user().username;
		return Groups.find({people: {$in: [currentUser]}, privateGroup: true}).count() > 0;
	},

	sortButton: function(){
		var s = Session.get("sort");
		return s;
	},

	sortButtonPub: function(){
		return Session.get("sort-pub")
	},

	privateGroups: function() {
		var currentUser = Meteor.user().username;
		var s = Session.get("sort");
		var o = Session.get("order");
		// return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{s:o}});
		if(s==="sprays"){
			console.log("here")
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{sprays:-1}});
		}
		else if(s==="oldest"){
			console.log("here")
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{timestamp:1}});
		}else if(s==="recent"){
			console.log("here")
			return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{timestamp:-1}});
		}
	},

	publicGroups: function() {
		var currentUser = Meteor.user().username;
		var s = Session.get("sort-pub");
		var o = Session.get("order");
		// return Groups.find({people: {$in: [currentUser]}, privateGroup: true},{sort:{s:o}});
		if(s==="sprays"){
			console.log("here")
			return Groups.find({privateGroup: false},{sort:{sprays:-1}});
		}
		else if(s==="oldest"){
			console.log("here")
			return Groups.find({privateGroup: false},{sort:{timestamp:1}});
		}else if(s==="recent"){
			console.log("here")
			return Groups.find({privateGroup: false},{sort:{timestamp:-1}});
		}
	}
});

Template.groupList.events({
	"click #sprays":function(event){
		Session.set("sort","sprays");
		Session.set("order",1)

		console.log(Session.get("sort"))
	},
	"click #oldest":function(event){
		Session.set("sort","oldest");
		Session.set("order",1)

		console.log(Session.get("sort"))
	},
	"click #recent":function(event){
		Session.set("sort","recent");
		Session.set("order",1)

		console.log(Session.get("sort"))
	},
	"click #sprays-pub":function(event){
		Session.set("sort-pub","sprays");
		Session.set("order",1)

		console.log(Session.get("sort"))
	},
	"click #oldest-pub":function(event){
		Session.set("sort-pub","oldest");
		Session.set("order",1)

		console.log(Session.get("sort"))
	},
	"click #recent-pub":function(event){
		Session.set("sort-pub","recent");
		Session.set("order",1)

		console.log(Session.get("sort"))
	}
});
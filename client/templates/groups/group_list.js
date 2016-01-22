Template.groupList.onCreated(
	function(){
		Session.set('sortby', "profile.email");
		Session.set('sortorder', "-1");	
	}
);

Template.groupList.helpers({
	sortButton: function(){
		return Session.get("sort")
	},

	privateGroups: function() {
		var filter = {sort: {}};
		var currentUser = Meteor.user().username;
		var s = Session.get("sort");
		filter.sort[Session.get('sortby')] = Session.get('sortorder');
		return Groups.find({people: {$in: [currentUser]}, privateGroup: true},filter);
	},

	publicGroups: function() {
		return Groups.find({privateGroup: false});
	}
});

Template.groupList.events({
	"click #recent":function(event){
		Session.set("sortby","timestamp");
		Session.set("sortorder","-1");
		console.log(Session.get("sortby"));
	},
	"click #oldest":function(event){
		Session.set("sortby","timestamp");
		Session.set("sortorder","1");
		console.log(Session.get("sortby"))
	},
	"click #total":function(event){
		Session.set("sortby","sprays");
		Session.set("sortorder","1");
		console.log(Session.get("sortby"))
	}
});
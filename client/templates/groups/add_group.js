Template.addGroup.events({
	'change .private input': function (event) {
    	Session.set("isPrivate", event.target.checked);
    	console.log("Private: " + event.target.checked);
    },
	'submit .add-group': function(e) {
		e.preventDefault();
		var input = $("#groupName").val();
		var currentUser = Meteor.user().username;
		var isPrivate = Session.get("isPrivate");
		console.log(Session.get("isPrivate"));
		e.stopPropagation();
		$("#groupName").val("");	
		if (Groups.findOne({name: input, createdBy: currentUser}) == null && input.length) {
			Meteor.call('addGroup',input,currentUser,isPrivate,function(err,res){
				Router.go('groupPage',{_id:res._id});
			});
			console.log(Groups.findOne({name: input, createdBy: currentUser}));
			console.log("New group added");
			
		} else {
			if (Groups.find({name: input, createdBy: currentUser}).count() === 1) $("#groupName").attr("placeholder", "Name exists already");
			if (!input.length) $("#groupName").attr("placeholder", "Gotta have a name!");
		}
	}
});

Template.addGroup.helpers({
	hideCompleted: function () {
    	return Session.get("isPrivate");
    }
});
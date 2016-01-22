Template.addGroup.events({
	"change .private input": function (event) {
    	Session.set("isPrivate", event.target.checked);
    	console.log("Private: " + event.target.checked);
    },
	'submit .add-group': function(e) {
		e.preventDefault();
		var groupName = $("#groupName").val();
		var currentUser = Meteor.user().username;
		var isPrivate = Session.get("isPrivate");
		console.log(Session.get("isPrivate"));
		e.stopPropagation();
		if (Groups.findOne({name: groupName, createdBy: currentUser}) == null) {
			Meteor.call('addGroup',groupName,currentUser,isPrivate,function(err,res){
				Router.go('groupPage',{_id:res._id});
			});
			console.log(Groups.findOne({name: groupName, createdBy: currentUser}));
			console.log("New group added");	
		} else {
			console.log("Didn't happen");
		}
	}
});

Template.addGroup.helpers({
	hideCompleted: function () {
    	return Session.get("isPrivate");
    }
});
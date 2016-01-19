Groups = new Mongo.Collection('groups');

Groups.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	addUser: function (newUser, specificGroup) {
		console.log("Trying deeper");
		Groups.update({_id: specificGroup}, {$push: {people: newUser}});
				//console.log(currentGroup);
	},
	deleteGroup: function (specificGroup) {
		//Router.go('/');
		console.log(specificGroup);
		Groups.remove(specificGroup);
		console.log("Deleted");
	},
	quitGroup: function (specificGroup) {
		console.log(specificGroup);
		Groups.update({_id: specificGroup}, {$pull: {people: Meteor.user().username}});
	}
});


Groups = new Mongo.Collection('groups');

Groups.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	addUser: function (newUser, specificGroup) {
		Groups.update({_id: specificGroup}, {$push: {people: newUser}});
		Session.set('addUserMessages', "User is added");
	},
	deleteGroup: function (specificGroup) {
		Groups.remove({_id:specificGroup});
		Messages.remove({groupId:specificGroup});
	},
	quitGroup: function (specificGroup) {
		Groups.update({_id: specificGroup}, {$pull: {people: Meteor.user().username}});
	}
});


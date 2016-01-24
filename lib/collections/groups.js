Groups = new Mongo.Collection('groups');

Groups.allow({
	insert: function (userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	addUser: function (newUser, specificGroup) {
		Groups.update({_id: specificGroup}, {$push: {people: newUser}});
	},

	deleteUser: function (userToRemove, specificGroup) {
		Groups.update({_id: specificGroup}, {$pull: {people: userToRemove}});
	},

	deleteGroup: function (specificGroup) {
		Groups.remove({_id:specificGroup});
		Messages.remove({groupId:specificGroup});
	},
	
	quitGroup: function (specificGroup) {
		Groups.update({_id: specificGroup}, {$pull: {people: Meteor.user().username}});
	}
});


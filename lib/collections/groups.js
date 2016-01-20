Groups = new Mongo.Collection('groups');

Groups.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	addUser: function (newUser, specificGroup) {
		// var errors = validatePost(newUser);
		// if (errors.user) throw new Meteor.Error('invalid-user', "You must provide a valid username");
		Groups.update({_id: specificGroup}, {$push: {people: newUser}});
		Session.set('addUserMessages', "User is added");
				//console.log(currentGroup);
	},
	deleteGroup: function (specificGroup) {
		//Router.go('/');
		console.log(specificGroup);
		Groups.remove(specificGroup);
	},
	quitGroup: function (specificGroup) {
		console.log(specificGroup);
		Groups.update({_id: specificGroup}, {$pull: {people: Meteor.user().username}});
	}
});


(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/groups.js                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Groups = new Mongo.Collection('groups');                               // 1
                                                                       //
Groups.allow({                                                         // 3
	insert: function (userId, doc) {                                      // 4
		return !!userId;                                                     // 5
	}                                                                     //
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 9
	addUser: function (newUser, specificGroup) {                          // 10
		Groups.update({ _id: specificGroup }, { $push: { people: newUser } });
	},                                                                    //
                                                                       //
	deleteUser: function (userToRemove, specificGroup) {                  // 14
		Groups.update({ _id: specificGroup }, { $pull: { people: userToRemove } });
	},                                                                    //
                                                                       //
	deleteGroup: function (specificGroup) {                               // 18
		Groups.remove({ _id: specificGroup });                               // 19
		Messages.remove({ groupId: specificGroup });                         // 20
	},                                                                    //
                                                                       //
	quitGroup: function (specificGroup) {                                 // 23
		Groups.update({ _id: specificGroup }, { $pull: { people: Meteor.user().username } });
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=groups.js.map

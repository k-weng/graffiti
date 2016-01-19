Meteor.users.deny({
  update: function() {
    return true;
  }
});

// Meteor.methods({
// 	addUserMessage: function(username) {
// 		console.log("addUserMessage is being called");
// 		var userExist;
// 		console.log("doesUserExist is being called by addUserMessage");
// 		console.log("The rest of addUserMessage is being called");
// 		console.log("The user being added: " + username);
// 		console.log("The current user: " + Meteor.user().username);
// 		var check = username === Meteor.user().username;
// 		console.log("The current user is the user being added, true or false: " + check);
// 		console.log("The current group's ID is: " + Groups.find({_id:Router.current().params._id}));
// 		if (!username) message = "Please fill in an user";
// 		else if (username === Meteor.user().username) message = "You are already in the group";
// 		else if (!(Groups.find({_id: Router.current().params._id, people: {$in: [username]}}) == null)) message = "User is already in the group";
// 		else if (!userExist) message = "User does not exist";
// 		else message = "User is added to group";
// 		return username;
// 	}
// });
// validateUser = function (username) {
// 	var messages = {};
// 	var userExist;
// 	Meteor.call('doesUserExist', username, function (error, result) {
// 		userExist = result === 1  ? true : false;
// 		console.log(result);
// 		console.log(userExist);
// 	});
// 	console.log(userExist);
// 	console.log(Groups.findOne({_id: this._id, people: {$in: [username]}}));
// 	if (!username) messages.userError = "Please fill in an user";
// 	else if (username === Meteor.user().username) messages.userError = "You are already in the group";
// 	else if (Groups.find({_id: Router.current().params._id, people: {$in: [username]}}) == null) messages.userError = "User is already in the group";
// 	else if (!userExist) messages.userError = "User does not exist";
// 	else messages.userError = "User is added to group"
// 	return messages;
// }

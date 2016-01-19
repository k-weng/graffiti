Meteor.publish('groups',function(){
	return Groups.find();
});

Meteor.publish('messages',function(group){
	return Messages.find({groupId:group});
});

//Meteor.publish("allUsers", function () {
//  return Meteor.users.find({});
//});

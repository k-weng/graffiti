Meteor.publish('groups',function(){
	return Groups.find();
});

Meteor.publish('messages',function(group){
	return Messages.find({groupName:group});
});
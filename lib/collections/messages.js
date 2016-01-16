Messages = new Mongo.Collection('messages');

Messages.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	messageSend: function(message){
		var newMsg = _.extend(message,{
			uderID: Meteor.user()._id,
			username: Meteor.user().username,
			radius:30,
			life: 30000
			// groupName: Groups.find({_id:message.groupId})
		});
		var id = Messages.insert(newMsg);
		return {_id: id};
	}
});
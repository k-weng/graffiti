Messages = new Mongo.Collection('messages');

Messages.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});


Meteor.setInterval(function(){
	var msgs = Messages.find().map(function(u){
		return u.timestamp;
	}, 1000);
});

Meteor.methods({
	messageSend: function(message){
		var newMsg = _.extend(message,{
			uderID: Meteor.user()._id,
			username: Meteor.user().username,
			// groupName: Groups.find({_id:message.groupId})
		});
		var id = Messages.insert(newMsg);
		return {_id: id};
	}
});
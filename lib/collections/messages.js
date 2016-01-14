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
		var id = Messages.insert(message);
		return {_id: id};
	}
});
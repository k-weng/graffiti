Messages = new Mongo.Collection('messages');

Messages.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
	
	messageSend: function(message){
		var maxLife = (2)*(5)*(1000);
		var newMsg = _.extend(message,{
			uderID: Meteor.user()._id,
			username: Meteor.user().username,
			votes:0,
			// radius:linearScale(message.text.length()),
			life: maxLife,
			voters:[]
			// groupName: Groups.find({_id:message.groupId})
		});
		var id = Messages.insert(newMsg);
		return {_id: id};
	}

});
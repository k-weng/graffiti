Template.messageList.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('messages', Session.get("currentGroup"));
	});
});

Template.messageList.helpers({
	messages: function(){
		return Messages.find();
	}
});
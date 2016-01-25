Template.userPage.onCreated(function() {
	Meteor.subscribe('myMessages', Meteor.userId());
});

Template.userPage.helpers({
	myMessages: function(){
		return Messages.find({userId:Meteor.userId()},{sort:{timestamp:-1}});
	},

	hasMessages:function(){
		return Messages.find({userId:Meteor.userId()},{sort:{timestamp:-1}}).count() > 0;
	}
});

Template.myMessage.helpers({
	myVotes:function(){
		if(this.votes===1){
			return this.votes + " vote"
		}
		else return this.votes + " votes";
	}
});
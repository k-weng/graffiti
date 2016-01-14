Template.messageSend.events({
	"submit .submit-message":function(e){
		e.preventDefault();
		var input = $("#message-input").val();
		console.log(input);
		console.log("submitted");
		e.stopPropagation();
		Messages.insert({
			userId:Meteor.userId(), 
			text: input,
			timestamp: Date.now()
		});

		$("#message-input").val("");
		// Router.go('groupPage',)
	}
})
Template.messageSend.events({
	"submit .submit-message":function(e){
		e.preventDefault();
		var input = $("#message-input").val();

		console.log(input);
		console.log("submitted");

		e.stopPropagation();

		var message = {
			userId:Meteor.userId(), 
			text: input,
			timestamp: Date.now()
		};

		Meteor.call("messageSend", message, function(err, result){
			if(err){
				return alert("there's an error");
			}
			// Router.go('groupPage',{_id: this._id});
		});

		$("#message-input").val("");
		// Router.go('groupPage',)
	}
})
Template.messageSend.events({
	"submit .submit-message":function(e){
		e.preventDefault();
		var input = $("#message-input").val();
		console.log(input);
		console.log("submitted");
		e.stopPropagation();
		Messages.insert({name:"chris", text: input});
		$("#message-input").val("");
	}
})
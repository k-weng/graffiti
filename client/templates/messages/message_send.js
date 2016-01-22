var linearScale = d3.scale.linear().domain([0,15]).range([15,60]);

Template.messageSend.events({
	"submit .submit-message": function(e, t){

		console.log(t.data._id);

		e.preventDefault();
		var input = $("#message-input").val();

		if(input && input.length){

		console.log(input);
		console.log("submitted");

		// e.stopPropagation();
		var r = 0;
		if(input.length<15){
			r = linearScale(input.length);
		}
		else{
			r = 60;
		}
		var message = {
			userId:Meteor.userId(), 
			text: input,
			timestamp: Date.now(),
			groupId: t.data._id,
			groupName: Session.get("currentGroup"),
			transparency: 1,
			radius:r,
			live: 1
		};

		Meteor.call("messageSend", message, function(err, result){
			if(err){
				return alert("there's an error");
			}
			// Router.go('groupPage',{_id: this._id});
		});
		$("#message-input").val("");
		$("#message-input").attr("placeholder","Say something!");

		}
		else{
			$("#message-input").attr("placeholder","You can't say nothing!");
		}
		// Router.go('groupPage',)
		// debugger
	}
});
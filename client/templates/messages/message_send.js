var linearScale = d3.scale.linear().domain([0,250]).range([30,300]);

Template.messageSend.events({
	"submit .submit-message": function(e, t){

		console.log(t.data._id);

		e.preventDefault();
		var input = $("#message-input").val();

		console.log(input);
		console.log("submitted");

		// e.stopPropagation();

		var message = {
			userId:Meteor.userId(), 
			text: input,
			timestamp: Date.now(),
			groupId: t.data._id,
			groupName: Session.get("currentGroup"),
			transparency: 1,
			radius: linearScale(input.length)
		};

		Meteor.call("messageSend", message, function(err, result){
			if(err){
				return alert("there's an error");
			}
			// Router.go('groupPage',{_id: this._id});
		});

		$("#message-input").val("");
		// Router.go('groupPage',)
		// debugger
	}
});
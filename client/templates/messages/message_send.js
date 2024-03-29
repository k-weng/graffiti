var linearScale = d3.scale.linear().domain([0,15]).range([15,60]);

Template.messageSend.events({
	"submit .submit-message": function(e, t){

		// console.log(t.data._id);
		// console.log(t.data);
		e.preventDefault();
		var input = $("#message-input").val();
		input = input.trim();
		if(input && input.length) {
			if(input.length>500){
				$("#message-input").val("");
				$("#message-input").attr("placeholder","You're saying too much! (500 char limit)");
			}else{
			// console.log(input);
			// console.log("submitted");

			// e.stopPropagation();
			var r = 0;
			if(input.length < 15) {
				r = linearScale(input.length);
			} else {
				r = 60;
			}

			// var groupName = 
			var message = {
				userId:Meteor.userId(), 
				text: input,
				timestamp: Date.now(),
				groupId: t.data._id,
				groupName: t.data.name,
				transparency: 1,
				radius:r,
				live: 1
			};

			Meteor.call("messageSend", message, function (err, result) {
				if(err) {
					return alert("there's an error");
				}
			});

			Meteor.call("addCurrent", message, function(err, result) {
				if(err) {
					return alert("there's an error");
				}
			// Router.go('groupPage',{_id: this._id});
			});

			$("#message-input").val("");
			$("#message-input").attr("placeholder","Say something!");
			}
		} else {
			$("#message-input").val("");
			$("#message-input").attr("placeholder","You can't say nothing!");
		}
		// Router.go('groupPage',)
		// debugger
	}
});
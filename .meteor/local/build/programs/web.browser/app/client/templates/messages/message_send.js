(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/messages/message_send.js                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var linearScale = d3.scale.linear().domain([0, 15]).range([15, 60]);   // 1
                                                                       //
Template.messageSend.events({                                          // 3
	"submit .submit-message": function (e, t) {                           // 4
                                                                       //
		// console.log(t.data._id);                                          //
		// console.log(t.data);                                              //
		e.preventDefault();                                                  // 8
		var input = $("#message-input").val();                               // 9
		input = input.trim();                                                // 10
		if (input && input.length) {                                         // 11
			if (input.length > 500) {                                           // 12
				$("#message-input").val("");                                       // 13
				$("#message-input").attr("placeholder", "You're saying too much! (500 char limit)");
			} else {                                                            //
				// console.log(input);                                             //
				// console.log("submitted");                                       //
                                                                       //
				// e.stopPropagation();                                            //
				var r = 0;                                                         // 20
				if (input.length < 15) {                                           // 21
					r = linearScale(input.length);                                    // 22
				} else {                                                           //
					r = 60;                                                           // 24
				}                                                                  //
                                                                       //
				// var groupName =                                                 //
				var message = {                                                    // 28
					userId: Meteor.userId(),                                          // 29
					text: input,                                                      // 30
					timestamp: Date.now(),                                            // 31
					groupId: t.data._id,                                              // 32
					groupName: t.data.name,                                           // 33
					transparency: 1,                                                  // 34
					radius: r,                                                        // 35
					live: 1                                                           // 36
				};                                                                 //
                                                                       //
				Meteor.call("messageSend", message, function (err, result) {       // 39
					if (err) {                                                        // 40
						return alert("there's an error");                                // 41
					}                                                                 //
				});                                                                //
                                                                       //
				Meteor.call("addCurrent", message, function (err, result) {        // 45
					if (err) {                                                        // 46
						return alert("there's an error");                                // 47
					}                                                                 //
					// Router.go('groupPage',{_id: this._id});                        //
				});                                                                //
                                                                       //
				$("#message-input").val("");                                       // 52
				$("#message-input").attr("placeholder", "Say something!");         // 53
			}                                                                   //
		} else {                                                             //
			$("#message-input").val("");                                        // 56
			$("#message-input").attr("placeholder", "You can't say nothing!");  // 57
		}                                                                    //
		// Router.go('groupPage',)                                           //
		// debugger                                                          //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

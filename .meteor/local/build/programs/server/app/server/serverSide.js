(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/serverSide.js                                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.methods({                                                       // 1
                                                                       //
	addCurrent: function (message) {                                      // 3
		Groups.update({ _id: message.groupId }, {                            // 4
			$set: { currentMessage: message.text }                              // 6
		});                                                                  //
	},                                                                    //
                                                                       //
	addGroup: function (groupName, currentUser, isPrivate, msgTime) {     // 10
		var groupId = Groups.insert({                                        // 13
			name: groupName,                                                    // 14
			people: [currentUser],                                              // 15
			createdBy: currentUser,                                             // 16
			privateGroup: isPrivate,                                            // 17
			sprays: 0,                                                          // 18
			timestamp: Date.now(),                                              // 19
			msgTime: msgTime,                                                   // 20
			currentMessage: "No messages yet"                                   // 21
		});                                                                  //
                                                                       //
		return { _id: groupId };                                             // 24
	},                                                                    //
                                                                       //
	doesUserExist: function (userName) {                                  // 27
		return Meteor.users.find({ username: userName }).count();            // 28
	},                                                                    //
                                                                       //
	messageSend: function (message) {                                     // 31
		var maxLife = Groups.findOne({ _id: message.groupId }).msgTime;      // 32
		console.log(maxLife);                                                // 33
		var newMsg = _.extend(message, {                                     // 34
			uderID: Meteor.user()._id,                                          // 35
			username: Meteor.user().username,                                   // 36
			votes: 0,                                                           // 37
			life: maxLife,                                                      // 38
			// radius:linearScale(message.text.length()),                       //
			voters: []                                                          // 40
			// groupName: Groups.find({_id:message.groupId})                    //
		});                                                                  //
                                                                       //
		var id = Messages.insert(newMsg);                                    // 44
		Groups.update({ _id: message.groupId }, {                            // 45
			$inc: { sprays: 1 }                                                 // 47
		});                                                                  //
                                                                       //
		return { _id: id };                                                  // 50
	},                                                                    //
                                                                       //
	messageVote: function (msgId, user) {                                 // 53
		// console.log(Messages.find({id:msgId}));                           //
		// var weight = (15)*(60)*(1000);                                    //
		// var maxLife = (5)*(60)*(1000);                                    //
		var now = Date.now();                                                // 57
		console.log('messageVote');                                          // 58
		console.log(msgId);                                                  // 59
		var username = user.username;                                        // 60
		// console.log()                                                     //
		if (Messages.find({ _id: msgId, voters: username }).count() === 0) {
			Messages.find({ _id: msgId }).forEach(function (data) {             // 63
				var maxLife = Groups.findOne({ _id: data.groupId }).msgTime;       // 64
				console.log("vote " + maxLife);                                    // 65
				var weight = maxLife / 2;                                          // 66
				console.log(maxLife - (Date.now() - data.timestamp));              // 67
				var now = Date.now();                                              // 68
				Messages.update({ _id: data._id }, {                               // 69
					$inc: { votes: 1 },                                               // 70
					$set: { life: maxLife - (now - data.timestamp) + weight * (data.votes + 1) },
					$push: { voters: username }                                       // 72
				});                                                                //
			});                                                                 //
		} else {                                                             //
			console.log("already");                                             // 76
			Messages.find({ _id: msgId }).forEach(function (data) {             // 77
				var now = Date.now();                                              // 78
				var maxLife = Groups.findOne({ _id: data.groupId }).msgTime;       // 79
				console.log("vote " + maxLife);                                    // 80
				var weight = maxLife / 2;                                          // 81
				Messages.update({ _id: data._id }, {                               // 82
					$inc: { votes: -1 },                                              // 83
					$pull: { voters: username },                                      // 84
					$set: { life: maxLife - (now - data.timestamp) + weight * (data.votes - 1) }
				});                                                                //
			});                                                                 //
		}                                                                    //
		// console.log(Messages.find({id:msgId}));                           //
	}                                                                     //
});                                                                    //
                                                                       //
// if (Messages.find().count() == 0){                                  //
// 	Messages.insert({name: "chris",                                    //
// 	text: "test",                                                      //
// 	});                                                                //
// }                                                                   //
// if (Messages.find().count() == 0){                                  //
// 	var message = {                                                    //
// 			text: "root",                                                    //
// 			timestamp: Date.now(),                                           //
// 			groupName: "PublicGroup",                                        //
// 			transparency: 1                                                  //
// 	};                                                                 //
// 	Messages.insert(message);                                          //
// }                                                                   //
//an attempt to change opacity dynamically                             //
// var maxLife = 30000;                                                //
// var interval = 5000;                                                //
// Meteor.setInterval(function(){                                      //
// 	Messages.updateMany({                                              //
// 		{},                                                               //
// 		{                                                                 //
// 			$set:{life: 1}                                                   //
// 		}                                                                 //
// 	});                                                                //
// 	// var timeNow = Date.now()                                        //
// 	// var msgs = Messages.find().map(function(u){                     //
// 	// 	return Math.round(maxLife - ((timeNow - u.timestamp)/1000));   //
// 	// });                                                             //
// 	// console.log(msgs);                                              //
// 	// Messages.update({},{life:msgs});                                //
// 	// Messages.update({},{$set:{life: maxLife - ((timeNow - timestamp)/1000)}},{multi:true});
// }, interval);                                                       //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=serverSide.js.map

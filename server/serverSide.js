if (Groups.find().count() == 0){
	Groups.insert({name: "PublicGroup", people: []});
	Groups.insert({name: "SecondGroup", people: []});
}

Meteor.methods({
	doesUserExist: function (userName) {
		console.log("doesUserExist is being called.");
		console.log("The return for the method is " + Meteor.users.find({username: userName}).count());
		return Meteor.users.find({username: userName}).count();
	},

	messageSend: function(message){
		var maxLife = (5)*(60)*(1000);
		var newMsg = _.extend(message,{
			uderID: Meteor.user()._id,
			username: Meteor.user().username,
			votes:0,
			life:maxLife,
			// radius:linearScale(message.text.length()),
			voters:[]
			// groupName: Groups.find({_id:message.groupId})
		});
		var id = Messages.insert(newMsg);
		return {_id: id};
	},

	messageVote: function(msgId,user){
		// console.log(Messages.find({id:msgId}));
		var weight = (15)*(60)*(1000);
		var maxLife = (5)*(60)*(1000);
		var now = Date.now();
		console.log('messageVote');
		console.log(msgId);
		var username = user.username;
		// console.log()
		if(Messages.find({_id:msgId,voters:username}).count()===0){
				Messages.find({_id:msgId}).forEach(function(data){
				console.log(maxLife - (Date.now()-data.timestamp));
				var now = Date.now();
				Messages.update({_id:data._id},
				{
						$set:{life: maxLife - (now - data.timestamp) + weight*data.votes},
						$inc:{votes:1},
						$push:{voters:username}
				});
			});
		}else{
			console.log("already");
			Messages.find({_id:msgId}).forEach(function(data){
				var now = Date.now();
				Messages.update({_id:data._id},
				{
						$set:{life: maxLife - (now - data.timestamp) + (weight*(data.votes-1))},
						$inc:{votes:-1},
						$pull:{voters:username}
				});
			});
		}
		// console.log(Messages.find({id:msgId}));
	}
});

// if (Messages.find().count() == 0){
// 	Messages.insert({name: "chris",
// 	text: "test",
// 	});
// }
// if (Messages.find().count() == 0){
// 	var message = {
// 			text: "root",
// 			timestamp: Date.now(),
// 			groupName: "PublicGroup",
// 			transparency: 1
// 	}; 
// 	Messages.insert(message);
// }
//an attempt to change opacity dynamically
// var maxLife = 30000;
// var interval = 5000;
// Meteor.setInterval(function(){
// 	Messages.updateMany({
// 		{},
// 		{
// 			$set:{life: 1}
// 		}
// 	});
// 	// var timeNow = Date.now()
// 	// var msgs = Messages.find().map(function(u){
// 	// 	return Math.round(maxLife - ((timeNow - u.timestamp)/1000));
// 	// });
// 	// console.log(msgs);
// 	// Messages.update({},{life:msgs});
// 	// Messages.update({},{$set:{life: maxLife - ((timeNow - timestamp)/1000)}},{multi:true});
// }, interval);

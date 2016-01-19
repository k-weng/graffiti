// if (Messages.find().count() == 0){
// 	Messages.insert({name: "chris",
// 	text: "test",
// 	});
// }
if (Groups.find().count() == 0){
	Groups.insert({name: "PublicGroup", people: []});
	Groups.insert({name: "SecondGroup", people: []});
}

Meteor.methods({
	doesUserExist: function (userName) {
		// console.log(Meteor.users.find().fetch());
		// console.log(Meteor.users.find({username: userName}).count());
		// console.log(userName);
		return Meteor.users.find({username: userName}).count();
	},

	messageVote: function(msgId){
		// console.log(Messages.find({id:msgId}));
		var weight = (15)*(60)*(1000);
		var maxLife = (2)*(5)*(1000);
		var now = Date.now();
		console.log('messageVote');
		console.log(msgId);
		// console.log()
		Messages.update({_id:msgId},{$inc:{votes:1}});
		Messages.find({_id:msgId}).forEach(function(data){
		console.log(maxLife - (Date.now()-data.timestamp));
		var now = Date.now();
		Messages.update({_id:data._id},
			{$set:{life: maxLife - (now - data.timestamp) + weight*data.votes }
		});
	});
		// console.log(Messages.find({id:msgId}));
	}
});
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

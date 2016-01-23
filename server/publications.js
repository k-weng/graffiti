// Meteor.publish('groups',function(sortby,order){
// 	console.log(sortby,order);
// 	return Groups.find({},{sort:{sortby:order}});
// });

Meteor.publish('groups', function() {
	return Groups.find({});
});

Meteor.publish('myMessages', function (user) {
	console.log("My messages published ", user)
	return Messages.find({userId: user});
});

Meteor.publish('messages', function (group) {
	console.log("publications **** " + group);

	// Messages.aggregate(
	// [{$project:
	// 	{
	// 		life:{$add: ["$life", [{ $multiply: ["$votes", (-15)*(60)*(1000)]} ] ]}
	// 	}
	// }
	// ]);
	Messages.find().forEach(function (data) {
		// console.log(maxLife - (Date.now()-data.timestamp));
		var now = Date.now();
		var maxLife = Groups.findOne({_id:data.groupId}).msgTime;
		var weight = maxLife / 2;
		console.log(maxLife, weight);
		Messages.update({_id:data._id}, {$set: {life: maxLife - (now - data.timestamp) + weight * data.votes}});
	});

	Messages.remove({life: {$lt: 0}});

	return Messages.find({groupId: group}, {life: {$gt: 0}});
});

//Meteor.publish("allUsers", function () {
//  return Meteor.users.find({});
//});

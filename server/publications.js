// Meteor.publish('groups',function(sortby,order){
// 	console.log(sortby,order);
// 	return Groups.find({},{sort:{sortby:order}});
// });

Meteor.publish('groups',function(){
	return Groups.find({});
});

Meteor.publish('messages',function(group){
	console.log("publications **** " + group);
	var weight = (15)*(60)*(1000);
	var maxLife = (5)*(60)*(1000);
	// Messages.aggregate(
	// [{$project:
	// 	{
	// 		life:{$add: ["$life", [{ $multiply: ["$votes", (-15)*(60)*(1000)]} ] ]}
	// 	}
	// }
	// ]);
	Messages.find().forEach(function(data){
		// console.log(maxLife - (Date.now()-data.timestamp));
		var now = Date.now();
		Messages.update({_id:data._id},
			{$set:{life: maxLife - (now - data.timestamp) + weight*data.votes }
		});
	});

	Messages.remove({life:{$lt:0}});

	return Messages.find({groupId:group},{life:{$gt:0}});
});

//Meteor.publish("allUsers", function () {
//  return Meteor.users.find({});
//});

(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publications.js                                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
// Meteor.publish('groups',function(sortby,order){                     //
// 	console.log(sortby,order);                                         //
// 	return Groups.find({},{sort:{sortby:order}});                      //
// });                                                                 //
                                                                       //
Meteor.publish('groups', function () {                                 // 6
	return Groups.find({});                                               // 7
});                                                                    //
                                                                       //
Meteor.publish('myMessages', function (userId) {                       // 10
	return Messages.find({ userId: userId });                             // 11
});                                                                    //
                                                                       //
Meteor.publish('messages', function (group) {                          // 14
	console.log("publications **** " + group);                            // 15
                                                                       //
	// Messages.aggregate(                                                //
	// [{$project:                                                        //
	// 	{                                                                 //
	// 		life:{$add: ["$life", [{ $multiply: ["$votes", (-15)*(60)*(1000)]} ] ]}
	// 	}                                                                 //
	// }                                                                  //
	// ]);                                                                //
	Messages.find().forEach(function (data) {                             // 24
		// console.log(maxLife - (Date.now()-data.timestamp));               //
		var now = Date.now();                                                // 26
		var maxLife = Groups.findOne({ _id: data.groupId }).msgTime;         // 27
		var weight = maxLife / 2;                                            // 28
		console.log(maxLife, weight);                                        // 29
		Messages.update({ _id: data._id }, { $set: { life: maxLife - (now - data.timestamp) + weight * data.votes } });
	});                                                                   //
                                                                       //
	Messages.remove({ life: { $lt: 0 } });                                // 33
                                                                       //
	return Messages.find({ groupId: group }, { life: { $gt: 0 } });       // 35
});                                                                    //
                                                                       //
//Meteor.publish("allUsers", function () {                             //
//  return Meteor.users.find({});                                      //
//});                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publications.js.map

(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/messages.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Messages = new Mongo.Collection('messages');                           // 1
                                                                       //
Messages.allow({                                                       // 3
	insert: function (userId, doc) {                                      // 4
		return !!userId;                                                     // 5
	}                                                                     //
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 9
                                                                       //
	// messageSend: function(message){                                    //
	// 	var maxLife = (1)*(5)*(1000);                                     //
	// 	var newMsg = _.extend(message,{                                   //
	// 		uderID: Meteor.user()._id,                                       //
	// 		username: Meteor.user().username,                                //
	// 		votes:0,                                                         //
	// 		// radius:linearScale(message.text.length()),                    //
	// 		life: maxLife,                                                   //
	// 		voters:[]                                                        //
	// 		// groupName: Groups.find({_id:message.groupId})                 //
	// 	});                                                               //
	// 	var id = Messages.insert(newMsg);                                 //
	// 	return {_id: id};                                                 //
	// }                                                                  //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=messages.js.map

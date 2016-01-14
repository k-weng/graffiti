// if (Messages.find().count() == 0){
// 	Messages.insert({name: "chris",
// 	text: "test",
// 	});
// }
if (Groups.find().count() == 0){
	Groups.insert({name: "PublicGroup"});
	Groups.insert({name: "SecondGroup"});
}

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

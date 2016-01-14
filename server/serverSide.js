// if (Messages.find().count() == 0){
// 	Messages.insert({name: "chris",
// 	text: "test",
// 	});
// }
if (Groups.find().count() == 0){
	Groups.insert({name: "PublicGroup"});
	Groups.insert({name: "SecondGroup"});
}
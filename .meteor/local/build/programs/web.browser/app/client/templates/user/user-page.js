(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/user/user-page.js                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.userPage.onCreated(function () {                              // 1
	Meteor.subscribe('myMessages', Meteor.userId());                      // 2
});                                                                    //
                                                                       //
Template.userPage.helpers({                                            // 5
	myMessages: function () {                                             // 6
		return Messages.find({ userId: Meteor.userId() }, { sort: { timestamp: -1 } });
	},                                                                    //
                                                                       //
	hasMessages: function () {                                            // 10
		return Messages.find({ userId: Meteor.userId() }, { sort: { timestamp: -1 } }).count() > 0;
	}                                                                     //
});                                                                    //
                                                                       //
Template.myMessage.helpers({                                           // 15
	myVotes: function () {                                                // 16
		if (this.votes === 1) {                                              // 17
			return this.votes + " click";                                       // 18
		} else return this.votes + " clicks";                                //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

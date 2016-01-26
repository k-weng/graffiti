(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/groups/group.js                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.group.events({                                                // 1
	'click .group': function (e) {                                        // 2
		Session.set('currentGroup', this.name);                              // 3
	}                                                                     //
});                                                                    //
                                                                       //
Template.group.helpers({                                               // 7
	created: function () {                                                // 8
		return this.createdBy === Meteor.user().username ? "me" : this.createdBy;
	},                                                                    //
                                                                       //
	currentMessage: function () {                                         // 12
		return "\"" + this.currentMessage + "\"";                            // 13
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

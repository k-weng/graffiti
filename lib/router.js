Router.configure({
	layoutTemplate: 'layout',
	waitOn: function(){
		return [Meteor.subscribe('groups'), Meteor.subscribe('messages')];
	}
});

var requireLogin = function(){
	if(!Meteor.user()){
		this.render("loginRequired");
	}else{
		this.next();
	}
}

Router.route('/send',{name: 'messageSend'});
Router.route('/',{name: 'groupList'});
Router.route('groups/:_id',
{
	name: 'groupPage',
	data: function() {return Groups.findOne(this.params._id)}

});

Router.onBeforeAction(requireLogin,{only:'messageSend'});

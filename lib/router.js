Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	yieldTemplates: {
        nav: {to: 'nav'}
    },
	waitOn: function(){
		console.log("subscribed");
		return [Meteor.subscribe('groups'), Meteor.subscribe('messages')];
	}
});

var requireLogin = function(){
	if(!Meteor.user()){
		this.render("loginRequired");
	} else {
		this.next();
	}
}

//Router.route('/send',{name: 'messageSend'});
Router.map(function() {
  this.route('home', {path: '/'});
  this.route('groupList', {path: '/groups'});
});

Router.route('groups/:_id',
{
	name: 'groupPage',
	data: function() {
		return Groups.findOne(this.params._id);
	}
});

var goToGroups = function(pause) {
  if (Meteor.userId()) {
    Router.go('groupList');
  } else {
    this.next();
  }
};

Router.onBeforeAction(goToGroups, {only: ['home']});

Router.onBeforeAction('dataNotFound', {only: 'groupPage'});
Router.onBeforeAction(function() {
	var user = Meteor.user().username;
	var currentGroupId = Router.current().params._id;
    if (Groups.find({_id: currentGroupId, people: {$in: [user]}}).count() === 0) {
    	Router.go('/');
    } else {
        this.next();
    }
}, {only : 'groupPage'});
Router.onBeforeAction(requireLogin,{only:'messageSend'});

// Router.plugin('ensureSignedIn', {
//   only: ['groupPage']
// });

// AccountsTemplates.configureRoute('enrollAccount');
// AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');

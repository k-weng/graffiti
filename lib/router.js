Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    yieldTemplates: {
        nav: {to: 'nav'}
    },
	waitOn: function() {
        return [Meteor.subscribe('groups'), Meteor.subscribe('messages')];
		// return [Meteor.subscribe('groups','sprays',-1), Meteor.subscribe('messages')];
	}
});

//Router.route('/send',{name: 'messageSend'});
Router.map(function() {
    this.route('home', {path: '/',
        onBeforeAction: function() {
            $('body').addClass('home');
            this.next();
        },

        onStop: function() {
            $('body').removeClass('home');
        }
	});
  
    this.route('groupList', {path: '/groups'});
});

Router.route('groups/:_id',
{
	name: 'groupPage',
	data: function() {
		return Groups.findOne(this.params._id);
	}
});

Router.route('userPage',
{
    name: 'userPage'
});

Router.route('tutorial',
{
    name: 'tutorial'
});

var requireLogin = function() { 
	if (! Meteor.user()) {
       	// If user is not logged in render landingpage
    	Router.go('/');
 	} else {
        //if user is logged in render whatever route was requested
   		this.next(); 
 	}
}

var goToGroups = function(pause) {
  if (Meteor.userId()) {
    Router.go('groupList');
  } else {
  	Router.go('/');
    this.next();
  }
};

Router.onBeforeAction(function() {
    $('body').addClass('body-home');
    this.next();
});

Router.onBeforeAction(requireLogin, {except: ['home','tutorial']});

Router.onBeforeAction(goToGroups, {only: ['home']});

Router.onBeforeAction(function() {
    var user = Meteor.user().username;
	var currentGroupId = Router.current().params._id;
    var notAllowedIn = Groups.find({_id: currentGroupId, people: {$in: [user]}}).count() === 0;
    var isPrivate = Groups.find({_id: currentGroupId, privateGroup: true}) === 1;

    if (notAllowedIn && isPrivate) {
  	 Router.go('/');
    } else {
        this.next();
    }
}, {only : 'groupPage'});
//Router.onBeforeAction('dataNotFound', {only: 'groupPage'});



// Router.plugin('ensureSignedIn', {
//   only: ['groupPage']
// });

// AccountsTemplates.configureRoute('enrollAccount');
// AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');

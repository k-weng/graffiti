(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
    layoutTemplate: 'layout',                                          // 2
    loadingTemplate: 'loading',                                        // 3
    notFoundTemplate: 'notFound',                                      // 4
    yieldTemplates: {                                                  // 5
        nav: { to: 'nav' }                                             // 6
    },                                                                 //
    waitOn: function () {                                              // 8
        return [Meteor.subscribe('groups'), Meteor.subscribe('messages')];
        // return [Meteor.subscribe('groups','sprays',-1), Meteor.subscribe('messages')];
    }                                                                  //
});                                                                    //
                                                                       //
//Router.route('/send',{name: 'messageSend'});                         //
Router.map(function () {                                               // 15
    this.route('home', { path: '/',                                    // 16
        onBeforeAction: function () {                                  // 17
            $('body').addClass('home');                                // 18
            this.next();                                               // 19
        },                                                             //
                                                                       //
        onStop: function () {                                          // 22
            $('body').removeClass('home');                             // 23
        }                                                              //
    });                                                                //
                                                                       //
    this.route('groupList', { path: '/groups' });                      // 27
});                                                                    //
                                                                       //
Router.route('groups/:_id', {                                          // 30
    name: 'groupPage',                                                 // 32
    data: function () {                                                // 33
        return Groups.findOne(this.params._id);                        // 34
    }                                                                  //
});                                                                    //
                                                                       //
Router.route('userPage', {                                             // 38
    name: 'userPage'                                                   // 40
});                                                                    //
                                                                       //
Router.route('tutorial', {                                             // 43
    name: 'tutorial'                                                   // 45
});                                                                    //
                                                                       //
var requireLogin = function () {                                       // 48
    if (!Meteor.user()) {                                              // 49
        // If user is not logged in render landingpage                 //
        Router.go('/');                                                // 51
    } else {                                                           //
        //if user is logged in render whatever route was requested     //
        this.next();                                                   // 54
    }                                                                  //
};                                                                     //
                                                                       //
var goToGroups = function (pause) {                                    // 58
    if (Meteor.userId()) {                                             // 59
        Router.go('groupList');                                        // 60
    } else {                                                           //
        Router.go('/');                                                // 62
        this.next();                                                   // 63
    }                                                                  //
};                                                                     //
                                                                       //
Router.onBeforeAction(function () {                                    // 67
    $('body').addClass('body-home');                                   // 68
    this.next();                                                       // 69
});                                                                    //
                                                                       //
Router.onBeforeAction(requireLogin, { except: ['home', 'tutorial'] });
                                                                       //
Router.onBeforeAction(goToGroups, { only: ['home'] });                 // 74
                                                                       //
Router.onBeforeAction(function () {                                    // 76
    var user = Meteor.user().username;                                 // 77
    var currentGroupId = Router.current().params._id;                  // 78
    var notAllowedIn = Groups.find({ _id: currentGroupId, people: { $in: [user] } }).count() === 0;
    var isPrivate = Groups.find({ _id: currentGroupId, privateGroup: true }) === 1;
                                                                       //
    if (notAllowedIn && isPrivate) {                                   // 82
        Router.go('/');                                                // 83
    } else {                                                           //
        this.next();                                                   // 85
    }                                                                  //
}, { only: 'groupPage' });                                             //
//Router.onBeforeAction('dataNotFound', {only: 'groupPage'});          //
                                                                       //
// Router.plugin('ensureSignedIn', {                                   //
//   only: ['groupPage']                                               //
// });                                                                 //
                                                                       //
// AccountsTemplates.configureRoute('enrollAccount');                  //
// AccountsTemplates.configureRoute('signIn');                         //
// AccountsTemplates.configureRoute('signUp');                         //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=router.js.map

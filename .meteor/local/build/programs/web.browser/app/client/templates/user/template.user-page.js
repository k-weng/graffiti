(function(){
Template.__checkName("userPage");
Template["userPage"] = new Template("Template.userPage", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container user-container"
  }, HTML.Raw(' \n<div class="row "> \n	<h1>Your surviving messages: </h1>\n	<hr class="group-line">\n</div>\n\n'), HTML.DIV({
    "class": "row "
  }, " \n", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasMessages"));
  }, function() {
    return [ "\n", HTML.DIV({
      "class": "scrollable"
    }, "\n", HTML.UL("\n", Blaze.Each(function() {
      return Spacebars.call(view.lookup("myMessages"));
    }, function() {
      return [ "\n	", Spacebars.include(view.lookupTemplate("myMessage")), "\n" ];
    }), "\n"), "\n"), "\n" ];
  }, function() {
    return [ "\n", HTML.DIV(HTML.H3("You have no messages currently posted.")), "\n" ];
  }), "\n"), "\n");
}));

Template.__checkName("myMessage");
Template["myMessage"] = new Template("Template.myMessage", (function() {
  var view = this;
  return [ HTML.LI(HTML.H2('"', Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  }), '"'), " with ", Blaze.View("lookup:myVotes", function() {
    return Spacebars.mustache(view.lookup("myVotes"));
  }), " in ", HTML.A({
    href: function() {
      return [ "groups/", Spacebars.mustache(view.lookup("groupId")) ];
    }
  }, Blaze.View("lookup:groupName", function() {
    return Spacebars.mustache(view.lookup("groupName"));
  }))), HTML.Raw("\n	<hr>") ];
}));

}).call(this);

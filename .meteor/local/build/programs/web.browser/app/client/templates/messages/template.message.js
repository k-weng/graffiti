(function(){
Template.__checkName("message");
Template["message"] = new Template("Template.message", (function() {
  var view = this;
  return [ HTML.Raw("<h1>Message</h1>\n	"), HTML.UL("\n		", HTML.Raw("<!-- <li> {{getUsername userId}} </li> -->"), "\n		", HTML.LI(Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  })), "\n		", HTML.LI(Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n		", HTML.LI(Blaze.View("lookup:timestamp", function() {
    return Spacebars.mustache(view.lookup("timestamp"));
  })), "\n		", HTML.LI(Blaze.View("lookup:groupId", function() {
    return Spacebars.mustache(view.lookup("groupId"));
  })), "\n		", HTML.LI(Blaze.View("lookup:groupName", function() {
    return Spacebars.mustache(view.lookup("groupName"));
  })), "\n		", HTML.Raw("<!-- <li> {{life}} </li> -->"), "\n	") ];
}));

}).call(this);

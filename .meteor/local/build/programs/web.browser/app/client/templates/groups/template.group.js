(function(){
Template.__checkName("group");
Template["group"] = new Template("Template.group", (function() {
  var view = this;
  return HTML.LI("\n		", HTML.H3({
    "class": "group-list-name"
  }, "\n			", HTML.A({
    "class": "group",
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "groupPage");
    }
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n			", HTML.SMALL("created by ", Blaze.View("lookup:created", function() {
    return Spacebars.mustache(view.lookup("created"));
  })), "\n		"), " \n		", HTML.SPAN({
    "class": "sprays"
  }, "Total sprays: ", Blaze.View("lookup:sprays", function() {
    return Spacebars.mustache(view.lookup("sprays"));
  }), " ", HTML.DIV(" Most recently posted: ", Blaze.View("lookup:currentMessage", function() {
    return Spacebars.mustache(view.lookup("currentMessage"));
  })), " "), HTML.Raw('\n		<hr class="group-line">\n	'));
}));

}).call(this);

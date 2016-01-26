(function(){
Template.__checkName("nav");
Template["nav"] = new Template("Template.nav", (function() {
  var view = this;
  return HTML.HEADER("\n		", HTML.NAV({
    "class": "navbar navbar-fixed-top navbar-inverse"
  }, "\n			", HTML.DIV({
    "class": "container-fluid"
  }, "\n				", HTML.Raw('<div class="col-md-1"></div>'), "\n				", HTML.DIV({
    "class": "col-md-10"
  }, "\n					", HTML.Raw('<div class="navbar-header">\n						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#user-controls" aria-expanded="true">\n          					<span class="sr-only">Toggle navigation</span>\n         					<span class="icon-bar"></span>\n          					<span class="icon-bar"></span>\n          					<span class="icon-bar"></span>\n        				</button>\n	 					<a class="navbar-brand logonav logo" href="/">GRAFFITI!</a>\n					</div>'), "\n\n					", HTML.DIV({
    "class": "navbar-collapse collapse",
    id: "user-controls",
    "aria-expanded": "false",
    style: "height: 1px;"
  }, "\n						", HTML.UL({
    "class": "nav navbar-nav navbar-right"
  }, "\n		  					", HTML.LI(HTML.A({
    "class": "nav-item",
    href: "/userPage"
  }, Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  }))), "\n		  					", HTML.Raw('<li><a class="nav-item" href="/tutorial">Tutorial</a></li>'), "\n		  					", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n		  					", HTML.LI(HTML.BUTTON({
      type: "button",
      id: "signOut",
      "class": "btn btn-default whitetext"
    }, "Sign Out")), "\n							" ];
  }), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	");
}));

}).call(this);

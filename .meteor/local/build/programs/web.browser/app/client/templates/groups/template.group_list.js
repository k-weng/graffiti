(function(){
Template.__checkName("groupList");
Template["groupList"] = new Template("Template.groupList", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-sm-4 col-md-6",
    id: "wall"
  }, "\n			", HTML.DIV({
    "class": "dropdown small-drop"
  }, "\n		  	", HTML.Raw('<button class="btn btn-primary dropdown-toggle plus glyphicon glyphicon-plus" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\n		  	</button>'), "\n		  	", HTML.UL({
    "class": "dropdown-menu",
    "aria-labelledby": "dropdownMenu1"
  }, "\n		  		", HTML.LI({
    "class": "dropdown-submenu pull-right"
  }, HTML.SPAN({
    "class": "add-group"
  }, Spacebars.include(view.lookupTemplate("addGroup")))), "\n		  	"), "\n			"), "\n		"), "\n	"), "\n\n	", HTML.DIV({
    "class": "col-md-6"
  }, "\n		", HTML.Raw('<hr class="group-line">'), "\n		", HTML.Raw('<div class="row">\n			<div class="col-sm-4 col-md-5">\n				<h1>Your Walls</h1>\n			</div>\n		</div>'), "\n		", HTML.Raw('<hr class="group-line">'), "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasPrivate"));
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "dropdown"
    }, "\n		    ", HTML.BUTTON({
      "class": "btn btn-primary dropdown-toggle",
      type: "button",
      "data-toggle": "dropdown"
    }, Blaze.View("lookup:sortButton", function() {
      return Spacebars.mustache(view.lookup("sortButton"));
    }), "\n		    ", HTML.SPAN({
      "class": "caret"
    })), "\n		    ", HTML.UL({
      "class": "dropdown-menu small-drop"
    }, "\n		      ", HTML.LI({
      "class": "drop-item",
      id: "sprays"
    }, HTML.A({
      href: "#"
    }, "Total Sprays")), "\n		      ", HTML.LI({
      "class": "drop-item",
      id: "oldest"
    }, HTML.A({
      href: "#"
    }, "Oldest")), "\n		      ", HTML.LI({
      "class": "drop-item",
      id: "recent"
    }, HTML.A({
      href: "#"
    }, "Recent")), "\n		    "), "\n  		"), "\n  		" ];
  }), "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasPrivate"));
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "scrollable"
    }, "\n  		", HTML.UL("\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("privateGroups"));
    }, function() {
      return [ "\n				", HTML.LI(Spacebars.include(view.lookupTemplate("group"))), "\n			" ];
    }), "\n		"), "\n		"), "\n		" ];
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": "row"
    }, "\n			", HTML.DIV({
      "class": "col-sm-4 col-md-8 col-lg-8"
    }, "\n				", HTML.H3("You aren't a part of any private walls."), "\n			"), "\n		"), "\n		" ];
  }), "\n	"), "\n\n	", HTML.DIV({
    "class": "col-md-6"
  }, "\n		", HTML.Raw('<hr class="group-line">'), "\n		", HTML.Raw('<div class="row">\n			<div class="col-sm-4 col-md-6">\n				<h1>Public Walls</h1>\n			</div>\n		</div>'), "\n		", HTML.Raw('<hr class="group-line">'), "\n		", HTML.DIV({
    "class": "dropdown"
  }, "\n		    ", HTML.BUTTON({
    "class": "btn btn-primary dropdown-toggle",
    type: "button",
    "data-toggle": "dropdown"
  }, Blaze.View("lookup:sortButtonPub", function() {
    return Spacebars.mustache(view.lookup("sortButtonPub"));
  }), "\n		    ", HTML.Raw('<span class="caret"></span>')), "\n		    ", HTML.Raw('<ul class="dropdown-menu small-drop">\n		      <li class="drop-item" id="sprays-pub"><a href="#">Total Sprays</a></li>\n		      <li class="drop-item" id="oldest-pub"><a href="#">Oldest</a></li>\n		      <li class="drop-item" id="recent-pub"><a href="#">Recent</a></li>\n		    </ul>'), "\n  		"), "\n		", HTML.DIV({
    "class": "scrollable"
  }, "\n		", HTML.UL("\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("publicGroups"));
  }, function() {
    return [ "\n				", HTML.LI("\n					", Spacebars.include(view.lookupTemplate("group")), "\n				"), "\n			" ];
  }), "\n		"), "\n		"), "\n	"), "\n	");
}));

}).call(this);

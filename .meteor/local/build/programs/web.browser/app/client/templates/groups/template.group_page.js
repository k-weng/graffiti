(function(){
Template.__checkName("groupPage");
Template["groupPage"] = new Template("Template.groupPage", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, "\n		", HTML.DIV({
    "class": "row"
  }, "\n			", HTML.DIV({
    "class": "col-sm-12 col-md-12 col-lg-12 message-wall"
  }, "\n				", HTML.H1({
    "class": "groupName"
  }, "\n					", Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  }), "\n					", HTML.SMALL({
    id: function() {
      return Spacebars.mustache(view.lookup("colorOfGroup"));
    }
  }, Blaze.View("lookup:typeOfGroup", function() {
    return Spacebars.mustache(view.lookup("typeOfGroup"));
  }), " wall with ", HTML.SPAN({
    id: "maxLife"
  }, Blaze.View("lookup:maxLife", function() {
    return Spacebars.mustache(view.lookup("maxLife"));
  })), " fade time"), "\n					\n				"), "\n			"), "\n		"), "\n\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("requireDropdown"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": "row"
    }, "\n				", HTML.DIV({
      "class": "col-sm-12 col-md-12 col-lg-12 message-wall"
    }, "\n					", HTML.DIV({
      "class": "dropdown userDropdown"
    }, "\n						", HTML.BUTTON({
      "class": "btn btn-primary dropdown-toggle settings glyphicon glyphicon-cog",
      type: "image",
      src: "/public/settings.png",
      "data-toggle": "dropdown"
    }, "\n						"), "\n\n						", HTML.UL({
      "class": "dropdown-menu small-drop"
    }, "\n							", Blaze.If(function() {
      return Spacebars.call(view.lookup("ownerOf"));
    }, function() {
      return [ "\n								", HTML.LI({
        "class": "adjust"
      }, Spacebars.include(view.lookupTemplate("deleteGroup"))), "\n							" ];
    }, function() {
      return [ "\n								", Blaze.If(function() {
        return Spacebars.call(view.lookup("isPrivate"));
      }, function() {
        return [ "\n									", HTML.LI({
          "class": "adjust"
        }, Spacebars.include(view.lookupTemplate("quitGroup"))), "\n								" ];
      }), "\n							" ];
    }), "\n\n							", Blaze.If(function() {
      return Spacebars.call(view.lookup("isPrivate"));
    }, function() {
      return [ "\n								", HTML.LI({
        "class": "add-user"
      }, Spacebars.include(view.lookupTemplate("addUser"))), "\n							" ];
    }), "\n\n							", Blaze.If(function() {
      return Spacebars.call(view.lookup("isPrivate"));
    }, function() {
      return [ "\n								", Blaze.If(function() {
        return Spacebars.call(view.lookup("ownerOf"));
      }, function() {
        return [ "\n									", HTML.LI({
          "class": "delete-user"
        }, Spacebars.include(view.lookupTemplate("deleteUser"))), "\n								" ];
      }), "\n							" ];
    }), "\n						"), "\n					"), "\n				"), "\n			"), "\n		" ];
  }), "\n\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("isPrivate"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": "userList row"
    }, "\n				", HTML.DIV("Users: ", Blaze.View("lookup:users", function() {
      return Spacebars.mustache(view.lookup("users"));
    })), "\n			"), "\n		" ];
  }), "\n\n		", HTML.DIV({
    "class": "row"
  }, "\n			", Spacebars.include(view.lookupTemplate("messageSend")), "\n		"), "\n		\n			", Spacebars.include(view.lookupTemplate("messageList")), "\n	");
}));

}).call(this);

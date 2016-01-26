(function(){
Template.__checkName("addGroup");
Template["addGroup"] = new Template("Template.addGroup", (function() {
  var view = this;
  return HTML.FORM({
    "class": "add-group"
  }, "\n		", HTML.DIV({
    "class": "input-group"
  }, "\n			", HTML.SPAN({
    "class": "input-group-addon"
  }, "\n				", HTML.LABEL({
    "class": "private"
  }, "\n					Private: ", HTML.INPUT({
    type: "checkbox",
    "aria-label": "addGroup",
    checked: function() {
      return Spacebars.mustache(view.lookup("isPrivate"));
    }
  }), "\n				"), "\n			"), "\n\n			", HTML.Raw('<input type="text" id="groupName" class="form-control" aria-label="addGroup" placeholder="Name of Wall" maxlength="37">'), "\n			\n			", HTML.Raw('<span class="input-group-addon toggling">\n				<select class="selectpicker">\n					<option value="" disabled="" selected="">Message Fade Time</option>\n					<option value="a">5 Minutes</option>\n					<option value="b">30 Minutes</option>\n					<option value="c">1 Hour</option>\n					<option value="d">4 Hours</option>\n					<option value="e">12 Hours</option>\n					<option value="f">1 Day</option>\n				</select>\n			</span>'), "\n			\n			", HTML.Raw('<span class="input-group-btn">\n				<button class="btn btn-default margin-left-stuff whitetext" type="submit">Make Wall</button>\n			</span>'), "\n		"), "\n	");
}));

}).call(this);

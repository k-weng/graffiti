(function(){
Template.__checkName("addUser");
Template["addUser"] = new Template("Template.addUser", (function() {
  var view = this;
  return HTML.Raw('<form class="add-user">\n		<input class="add-user" type="submit" name="Submit" value="Add User to This Wall">\n		<input class="add-user" type="text" id="userToAdd" placeholder="User to Add">\n	</form>');
}));

}).call(this);

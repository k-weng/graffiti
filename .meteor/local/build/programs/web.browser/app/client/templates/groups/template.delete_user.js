(function(){
Template.__checkName("deleteUser");
Template["deleteUser"] = new Template("Template.deleteUser", (function() {
  var view = this;
  return HTML.Raw('<form class="delete-user">\n		<input class="delete-user" type="submit" name="Submit" value="Remove User from Wall">\n		<input class="delete-user" type="text" id="userToRemove" placeholder="User to Remove">\n	</form>');
}));

}).call(this);

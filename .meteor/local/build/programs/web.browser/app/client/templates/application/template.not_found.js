(function(){
Template.__checkName("notFound");
Template["notFound"] = new Template("Template.notFound", (function() {
  var view = this;
  return HTML.Raw('<div class="not-found page jumbotron">\n		<h2>404</h2>\n		<p>Sorry, we couldn\'t find a page at this address.</p>\n	</div>');
}));

}).call(this);

(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "main-container container-fluid"
  }, "\n		", Blaze._TemplateWith(function() {
    return "nav";
  }, function() {
    return Spacebars.include(view.lookupTemplate("yield"));
  }), "\n		", Spacebars.include(view.lookupTemplate("yield")), "\n    "), HTML.Raw('\n    <!-- <div class="container-fluid footer">\n     <footer>Boba Team: Kevin Weng and Chris Wang</footer>\n 	</div> -->') ];
}));

}).call(this);

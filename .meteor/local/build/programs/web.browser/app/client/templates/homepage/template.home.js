(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container-fluid"
  }, "\n		", HTML.DIV({
    "class": "row background-home"
  }, "		\n			", HTML.Raw('<div class="col-md-3"></div>'), "\n\n			", HTML.Raw('<center class="col-md-6">\n				<!-- <img class = "logo-pic" src = "can2.png"> -->\n				<h1 class="title logo heading-home">GRAFFITI!</h1>\n				<!-- <h2 class="subtitle">make your mark</h2> -->\n			</center>'), "\n\n			", HTML.DIV({
    "class": "col-md-12"
  }, "\n				", HTML.Raw('<div class="col-md-3"></div>'), "\n\n				", HTML.DIV({
    "class": "col-md-6"
  }, "\n					", HTML.DIV({
    "class": "container-fluid sign-in"
  }, " \n						", Spacebars.include(view.lookupTemplate("atForm")), "\n					"), "\n				"), "\n			"), "\n		"), HTML.Raw('\n\n		<div class="row">\n		<div class="row how-to">\n			<center class="col-md-12">\n				<!-- <img class = "logo-pic" src = "can2.png"> -->\n				<h1 class="title subtitle">But what does it do?</h1>\n				<!-- <h2 class="subtitle">make your mark</h2> -->\n				<div class="col-md-4 col-s-4 col-lg-4 col-md-offset-4">\n				<p class="explanation">\n					The wild and care-free youth of today, flocking to their snapBooks and instaChats, prize effervescence above all else. So we\'ve designed a new type of messageboard for these future-forward millennials: "GRAFFITI!". Messages posted to our unstructured "Graffiti Walls" begin fading immediately, set to disappear entirely after a set amount of time. Users can click on messages which they deem "hip" or "street", thus increasing the lifespan of the message. However, all messages fade to nothing eventually. On these walls, users can discuss their outrageous tomfoolery, confident in the knowledge that no message will survive forever on our boards.\n				</p>\n				<p>\n					<a href="/tutorial" class="get-started-link">Click here to get started</a>\n				</p>\n			</div>\n			</center>\n		</div>\n		</div>\n	'));
}));

}).call(this);

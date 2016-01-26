(function(){
Template.__checkName("messageList");
Template["messageList"] = new Template("Template.messageList", (function() {
  var view = this;
  return HTML.Raw('<!-- {{#each messages}}\n		{{> message}}\n	{{/each}} -->\n	<div class="container">\n		<div id="tool" class="tooltip"></div>\n		<div id="vis">\n			<div id="bubble-labels"></div>\n		</div>\n	</div>');
}));

}).call(this);

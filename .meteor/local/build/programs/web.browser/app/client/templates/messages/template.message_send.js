(function(){
Template.__checkName("messageSend");
Template["messageSend"] = new Template("Template.messageSend", (function() {
  var view = this;
  return HTML.Raw('<form class="submit-message">\n		<div class="col-lg-12 col-md-12 col-s-12" id="message-send">\n		   	<input class="form-control" id="message-input" type="text" placeholder="Say something!">\n		</div>\n	</form>');
}));

}).call(this);

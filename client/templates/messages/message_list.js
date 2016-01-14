Template.messageList.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('messages', Session.get("currentGroup"));
	});
});

Template.messageList.helpers({
	messages: function(){
		return Messages.find();
	}
});

Template.messageList.onRendered(function(){
	var svg, width = 500, height =75, x;
	svg = d3.select('#vis').append('svg')
		.attr('width',width)
		.attr('height',height);

	var key = function(d){
		return d._id;
	}

	Deps.autorun(function(){
		var dataset = Messages.find().fetch();

		var circles = svg.selectAll('circle')
		.data(dataset, key);

		x = d3.scale.ordinal().
		domain(d3.range(Messages.find().count()))
		.rangePoints([0,width],1);

		circles.enter()
		.append('circle')
		.attr('cx',function(d,i){ return x(i); })
		.attr('cy',20)
		.attr('r',20)
	});
});
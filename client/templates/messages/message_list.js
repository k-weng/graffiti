Template.messageList.onCreated(function(){
	var self = this;
  Session.set('loaded',false);
	self.autorun(function(){
		Meteor.subscribe('messages', Session.get("currentGroup"),function(){
      Session.set('loaded',true);
      console.log("subscribe 2");
    });
	});
});

Template.messageList.helpers({
	messages: function(){
		return Messages.find();
	}
});

Template.messageList.events({
	'click circle':function(e, template){
		alert('id: ' + $(e.currentTarget).data("id"));
	}
});

Template.messageList.onRendered(function(){
  var width = 960,
  height = 500;


  

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
  // root.radius = 0;
  // root.fixed = true;

  var svg = d3.select("#vis").append("svg")
      .attr("width", width)
      .attr("height", height);

  console.log("in onRendered");

  Deps.autorun(function(){
    // debugger
  console.log("autorun");
    if(Session.get('loaded')){
    var data = Messages.find().fetch();
    var nodes = data;
    // debugger 
    console.log("in loaded");
    
    var force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return 5; })
    .nodes(nodes)
    .size([width, height]);

    force.start();

    var drag = force.drag();


    var label = d3.select("#bubble-labels");
    
    label = label.selectAll(".bubble-label").data(nodes);
    label.exit().remove();

    labelEnter = label.enter().append("a")
          .attr("class", "bubble-label")
          .style("position","relative")
          .call(force.drag);

    labelEnter.append("div")
      .attr("class", "bubble-label-name")
      .text(function(d){return d.text});


    svg.selectAll("circle")
        .data(nodes)
      .enter().append("circle")
        .attr("r", function(d) { return d.radius; })
        // .attr("transform","translate(0,5)")
        .style("fill", function(d, i) { return "red"; })
        .style("position","absolute")
        .attr("text",function(d){return d.text;})
        .call(drag);

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
          i = 0,
          n = nodes.length;

      while (++i < n) q.visit(collide(nodes[i]));

      svg.selectAll("circle")
          .attr("cx", function(d) { return d.x;  })
          .attr("cy", function(d) { return d.y; });

      d3.select("#bubble-labels").selectAll(".bubble-label")
          .style("left", function(d){return ( d.x  + "px" );})
          .style("top", function(d){return ( d.y  + "px" ); });
         // debugger
    });

    function collide(node) {
      var r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
  }
});
});
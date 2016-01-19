Template.messageList.onCreated(function(){
	var self = this;
  Session.set('loaded',false);
	self.autorun(function(){
		Meteor.subscribe('messages', Router.current().params._id, function(){
      console.log("params id "+Router.current().params._id);
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

// Template.messageList.events({
// 	'click circle':function(e, template){
// 		alert('id: ' + $(e.currentTarget).data("id"));
// 	}
// });

Template.messageList.onRendered(function(){
var graph,
    color = d3.scale.category10();
var maxLife = (10)*(1000);
graph = new myGraph("#vis");
Messages.find().observe({
  added: function (doc) {
    graph.addNode(doc);
  },
  removed: function (doc) {
    graph.removeNode(doc);
  }
});

function myGraph(el){

  this.addNode = function(doc){
    nodes.push(doc);
    update();
  };

  this.removeNode = function (doc) {
    var i = 0;
    var n = findNode(doc._id);
    nodes.splice(findNodeIndex(doc),1);
    update();
  };

  var removeNode = function (doc) {
    var i = 0;
    var n = findNode(doc._id);
    nodes.splice(findNodeIndex(doc),1);
    update();
  };
  
  var findNode = function(doc) {
    for (var i in nodes) {
      if (nodes[i]["id"] === doc._id) return nodes[i];};
  };

  var findNodeIndex = function(doc) {
    for (var i=0;i<nodes.length;i++) {
      if (nodes[i].id==doc._id){
        return i;
      }
    };
  };

  var w = 500,
      h = 500;
  var svg = d3.select(el)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","svg")
    .attr("pointer-events", "all")
    .attr("viewBox","0 0 "+w+" "+h)
    .attr("perserveAspectRatio","xMinYMid");

  var vis = svg.append('svg:g');

  var force = d3.layout.force();

  var nodes = force.nodes();
  
  var label = d3.select("#bubble-labels");


  var update = function(){

  var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d._id; });

  var nodeEnter = node.enter().append("g")
    .attr("class","node")
    .call(force.drag);

  nodeEnter.append("svg:circle")
    .attr("r",function(d){return d.radius;})
    .attr("id", function(d){return "Node;" + d.id})
    .attr("class","nodeStrokeClass")
    .style("fill", function(d, i) { return "white"; })
    .style("opacity",0);

  nodeEnter.append("svg:text")
    .attr("class","textClass")      
    .style("fill",function(d,i){return color(i%3);})
    .text(function(d){return d.text})
    .transition()
    .duration(function(d){return d.life})
    .style("opacity",.5)
    .each('end',function(d){
      removeNode(d);
    });

//foreign object solution
  // nodeEnter.append("foreignObject")
  //   .attr("class","textClass2")
  //   .attr('x', -150/2)
  //   .attr('y', -20)
  //   .attr("width", 150)
  //   .attr("height", 200)
  //   .append("xhtml:p")
  //   .attr('style','word-wrap: break-word; text-align:center;')
  //   .style("color",function(d,i){return color(i%3);})
  //   .html(function(d){return d.text})
  //   .transition()
  //   .duration(500)
  //   .style("opacity",0);
    

  node.exit().remove();

  force.on("tick", function() {
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    d3.select("#bubble-labels").selectAll(".bubble-label")
      .style("left", function(d){return ( d.x  - d.radius/2 + "px" );})
      .style("top", function(d){return (  d.y + 120 - d.radius/2 + "px" ); });
  });

    function collide(node) {
      // console.log("collide");
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
          if (l < r ) {
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

      force
        .gravity(.05)
        .size([w, h])
        .start();
  };

  update();

}

});

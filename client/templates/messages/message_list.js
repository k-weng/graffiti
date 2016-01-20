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

Template.messageList.events({
	'click .textClass':function(e, template){
    console.log($(e.currentTarget).data("id"));
    Meteor.call("messageVote",$(e.currentTarget).data("id"));
    alert('id: ' + $(e.currentTarget).data("votes"));
	}
});

Template.messageList.onRendered(function(){
var graph,
    color = d3.scale.category10();
var maxLife = (5)*(60)*(1000);
graph = new myGraph("#vis");
Messages.find().observe({
  added: function (doc) {
    graph.addNode(doc);
  },
  removed: function (doc) {
    graph.removeNode(doc);
  },
  changed: function(updated, old){
    graph.updateNode(updated,old);
  }
});

function myGraph(el){
  // Define the div for the tooltip
  var div = d3.select("#tool")
    .attr("class", "tooltip")       
    .style("opacity", 0);


  this.updateNode = function(updated, old){
    console.log("updateNode"); 
    console.log(old._id);
    var n = findNode(old._id);
    // // debugger
    n.votes = updated.votes;
    n.life = updated.life;
    // nodes.splice(findNodeIndex(n),1);
    // nodes.push(n);
//     debugger
//     var node = vis.selectAll("g.node")
//      .data(nodes, function(d) { return d._id; })
//      .attr("id",function(d){return "node-"+ d._id});
// // debugger
//     node.transition().duration(100);
//     node.style("opacity",1);
// debugger
    d3.select("#node-"+old._id)
    .transition()
    .duration(10)
    .style("opacity",function(d){console.log(d.text + " " + d.life);return d.life/maxLife})
    .transition()
    .duration(function(d){console.log("clicked");return d.life;})
    .style("opacity",1)
    .each('end',function(d){
      removeNode(d);
    });
  };

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
  
  var findNode = function(id) {
    for (var i in nodes) {
      if (nodes[i]._id === id) return nodes[i];};
  };

  var findNodeIndex = function(doc) {
    for (var i=0;i<nodes.length;i++) {
      if (nodes[i].id==doc._id){
        return i;
      }
    };
  };

  var w = 1000,
      h = 1000;
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
  
  // var label = d3.select("#bubble-labels");


  var update = function(){

  var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d._id; });

  // var labels = d3.selectAll(".bubble-label")
  //   .data(nodes, function(d) { return d._id; });

  var nodeEnter = node.enter().append("g")
    .attr("class","node")
    .call(force.drag);

  nodeEnter.append("svg:circle")
    .attr("r",function(d){return d.radius;})
    .attr("id", function(d){return "Node;" + d.id})
    .attr("class","nodeStrokeClass")
    // .style("fill", function(d, i) { return "red"; })
    .style("opacity",0)
    .attr("id", function(d){
        console.log(d.text + " " + d._id + " add id");
        return "circle-"+d._id;
    });


//the native solution
  nodeEnter.append("svg:text")
    .attr("class","textClass")      
    .style("fill",function(d,i){return color(i%3);})
    .text(function(d){
      if(d.text.length>20){
        console.log(d.text.length);
        return "\"" + d.text.substring(0,21) + "...\"";
      }
      else{
        return "\"" + d.text + "\"";
      }
    })
    // .call(wrap,30)
    .style("opacity",function(d){console.log(d.text + " " + d.life);return d.life/maxLife})
    .transition()
    .duration(function(d){return d.life})
    .style("opacity",0)
    .each('end',function(d){
      removeNode(d);
    })
    .attr("data-id", function(d){
        return d._id;
    })
    .attr("id", function(d){
        console.log(d.text + " " + d._id + " add id");
        return "node-"+d._id;
    });

    node.on("click",function(d){
      console.log(d.text);
    })
    .on("mouseover", function(d) {    
      div.transition()    
          .duration(200)    
          .style("opacity", .9)
          .style("background-color","red");    
      div.html(d.text)  
          .style("font-family","Merriweather")
          .style("left", d.x + "px")   
          .style("top", d.y + "px");  
    })          
     .on("mouseout", function(d) {   
       div.transition()    
        .duration(500)    
        .style("opacity", 0); 
      });

  // for(var i = 0; i<nodes.length; i++){
  //   console.log(nodes[i]._id + " nodes");
  //   d3plus.textwrap()
  //     .container(d3.select("#circle-"+nodes[i]._id))
  //     .resize(true)
  //     .draw();
  // }

// the foreign solution
  // nodeEnter.append("foreignObject")
  //   .attr("width", function(d){return d.radius*2 + 5;} )
  //   .attr("height", function(d){return d.radius*2 + 5;} )
  //   .attr("x",function(d){return -d.radius + 5 + "";})
  //   .attr("y",function(d){return -d.radius + 5 + "";})
  //   // .transition()
  //   // .duration(5000)
  //   // .style("opacity",.5)
  //   .append("xhtml:body")
  //   .style("font", "14px 'Helvetica Neue'")
  //   .html(function(d){return "<p>"+d.text +"</p>";});
    // .transition()
    // .duration(5000)
    // .style("opacity",.5);
    // .style("opacity",function(d){console.log(d.text + " " + d.life);return d.life/maxLife})
    // .transition()
    // .duration(function(d){return 5000})
    // .style("opacity",0)
    // .each('end',function(d){
    //   removeNode(d);
    // })
    // .attr("data-id", function(d){
    //     return d._id;
    // })
    // .attr("id", function(d){
    //     console.log(d.text + " " + d._id + " add id");
    //     return "node-"+d._id;
    // });

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

// var dateFormat = require('dateformat');
Template.messageList.events({
    'click .textClass': function(event, template) {
        // console.log($(event.currentTarget).data("id"));
        Meteor.call("messageVote", $(event.currentTarget).data("id"), Meteor.user(), function (res, err) {
            // console.log(res);
            // console.log(err);
            if(err) {
                Errors.throw(err.reason);
            } else {
                if(res==="already") {
                    alert("Already Voted");
                } else {
                    // console.log("successfully voted");
                }
            }
        });
    // alert('id: ' + $(e.currentTarget).data("id"));
    }
});

Template.messageList.helpers({
    messages: function() {
        return Messages.find();
    }
});

Template.messageList.onCreated(function() {
	var self = this;
    Session.set('loaded',false);
	self.autorun(function() {
        Meteor.subscribe('messages', Router.current().params._id, function() {
            // console.log("params id "+Router.current().params._id);
            Session.set('loaded',true);
            // console.log("subscribe 2");
        });
	});
});

Template.messageList.onRendered(function(){
// "Adding New Nodes to Force Directed Layout" myGraph function modified from code found from snippet found on:
// http://stackoverflow.com/questions/9539294/adding-new-nodes-to-force-directed-layout
var graph,
    color = d3.scale.category10();
var maxLife = Groups.findOne({_id:Router.current().params._id}).msgTime;
// console.log("MAXLIFE " + maxLife)
graph = new myGraph("#vis");
Messages.find({groupId:Router.current().params._id}).observe({
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
    // console.log("updateNode"); 
    // console.log(old._id);
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
    .style("opacity",function(d){
      // console.log("life "+d.life/1000);
      // console.log("new opacity "+d.life/maxLife);
      return d.life/maxLife;})
    .transition()
    .duration(function(d){/*console.log(d.life, maxLife);*/return d.life;})
    .style("opacity",0)
    .each('end',function(d){
      div.transition()    
        .duration(500)    
        .style("opacity", 0); 
      removeNode(d);
    });
  
    div.style("background-color",function(){
        var username = Meteor.user().username;
        if(Messages.find({_id:old._id,voters:username}).count()===0){
          return "#95a5a6";
        }
        else{
          return "#e74c3c";
        }
    });

    // console.log(n.votes,Date(n.timestamp));

    div.html("<small>" + new Date(n.timestamp) + "<div> Clicks: " + n.votes + " </div>" + "</small>"  + " <hr>" +  "<div> \"" + n.text + "\"</div>" + "<br><div>   -" + n.username + "</div>")  
        .style("font-family","Merriweather")
        .style("font-size","11pt");
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

  var w = window.innerWidth - 200,
      h = window.innerHeight - 50;
      // console.log(window.innerHeight,window.innerWidth);

  var svg = d3.select(el)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id","svg")
    .attr("pointer-events", "all")
    .attr("viewBox","0 0 "+w+" "+h)
    .attr("perserveAspectRatio","xMinYMid");

  window.onresize = function(){
      w = window.innerWidth - 200,
      h = window.innerHeight - 50;
    svg.attr("width",w);
    svg.attr("height",h);
  };

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
        // console.log(d.text + " " + d._id + " add id");
        return "circle-"+d._id;
    });

//the native solution
  nodeEnter.append("svg:text")
    .attr("class","textClass")      
    .style("fill",function(d,i){return color(i%3);})
    .style("text-anchor","middle")
    .text(function(d){
      if(d.text.length>15){
        // console.log(d.text.length);
        return "\"" + d.text.substring(0,16) + "...\"";
      }
      else{
        return "\"" + d.text + "\"";
      }
    })
    // .call(wrap,30)
    .style("opacity",function(d){/*console.log(d.text + " " + d.life);*/return d.life/maxLife})
    .transition()
    .duration(function(d){return d.life})
    .style("opacity",0)
    .each('end',function(d){
      div.transition()    
        .duration(500)    
        .style("opacity", 0); 
      removeNode(d);
    })
    .attr("data-id", function(d){
        return d._id;
    })
    .attr("id", function(d){
        // console.log(d.text + " " + d._id + " add id");
        return "node-"+d._id;
    });

  node.on("click",function(d){
      // console.log(d.text);
    })
    .on("mouseover", function(d) {    
      div.transition()    
          .duration(200)    
          .style("opacity", .9)
          .style("position","fixed")
          .style("top", "250px")
          .style("left",function(){
            if(d.x>w/2){
              return w/8+"px";
            }else{
              return 5*w/6+"px";
            }
          })
          .style("background-color",function(){
            var username = Meteor.user().username;
            if(Messages.find({_id:d._id,voters:username}).count()===0){
              return "#95a5a6";
            }
            else{
              return "#e74c3c";
            }
          });    
      div.html("<small>" + new Date(d.timestamp) + "<div> Clicks: " + d.votes + " </div>" + "</small>"  + " <hr>" +  "<div> \"" + d.text + "\"</div>" + "<br><div>   -" + d.username + "</div>")  
          .style("font-family","Merriweather")
          .style("font-size","11pt");
    })          
     .on("mouseout", function(d) {   
       div.transition()    
        .duration(500)    
        .style("opacity", 0); 
      });


  // svg.append("rect")
  //   .attr("width",w)
  //   .attr("height",h)
  //   .style("opacity",0)
  //   .on("click",function(){
  //     console.log("click");
  //     div
  //     .transition()
  //     .duration(500)
  //     .style("opacity",0);
  //   });
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

  force.on("tick", function(e) {
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

    node.each(gravity(e.alpha));

    while (++i < n) q.visit(collide(nodes[i]));
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });

  function gravity(alpha){
    // console.log(alpha);
    var cx = w/2,
      cy = h/2,
      ax = alpha/16,
      ay = alpha/4;

      return function(d){
        d.x += (cx - d.x)*ax;
        d.y += (cy - d.y)*ay;
      }
  }

    function collide(node) {
      // console.log("collide");
      //Collide function taken from:
      // "Building a Bubble Cloud"
      // article: http://vallandingham.me/building_a_bubble_cloud.html
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
        .gravity(0)
        .size([w, h])
        .start();
  };

  update();

}

});

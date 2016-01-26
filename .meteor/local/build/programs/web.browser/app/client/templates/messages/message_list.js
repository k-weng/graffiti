(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/messages/message_list.js                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
// var dateFormat = require('dateformat');                             //
Template.messageList.events({                                          // 2
  'click .textClass': function (event, template) {                     // 3
    // console.log($(event.currentTarget).data("id"));                 //
    Meteor.call("messageVote", $(event.currentTarget).data("id"), Meteor.user(), function (res, err) {
      // console.log(res);                                             //
      // console.log(err);                                             //
      if (err) {                                                       // 8
        Errors["throw"](err.reason);                                   // 9
      } else {                                                         //
        if (res === "already") {                                       // 11
          alert("Already Voted");                                      // 12
        } else {                                                       //
          // console.log("successfully voted");                        //
        }                                                              //
      }                                                                //
    });                                                                //
    // alert('id: ' + $(e.currentTarget).data("id"));                  //
  }                                                                    //
});                                                                    //
                                                                       //
Template.messageList.helpers({                                         // 22
  messages: function () {                                              // 23
    return Messages.find();                                            // 24
  }                                                                    //
});                                                                    //
                                                                       //
Template.messageList.onCreated(function () {                           // 28
  var self = this;                                                     // 29
  Session.set('loaded', false);                                        // 30
  self.autorun(function () {                                           // 31
    Meteor.subscribe('messages', Router.current().params._id, function () {
      // console.log("params id "+Router.current().params._id);        //
      Session.set('loaded', true);                                     // 34
      // console.log("subscribe 2");                                   //
    });                                                                //
  });                                                                  //
});                                                                    //
                                                                       //
Template.messageList.onRendered(function () {                          // 40
  //***************                                                    //
  // "Adding New Nodes to Force Directed Layout" - myGraph function modified from code found from snippet found on:
  // http://stackoverflow.com/questions/9539294/adding-new-nodes-to-force-directed-layout
  //***************                                                    //
                                                                       //
  var graph,                                                           // 46
      color = d3.scale.category10();                                   //
  var maxLife = Groups.findOne({ _id: Router.current().params._id }).msgTime;
  // console.log("MAXLIFE " + maxLife)                                 //
  graph = new myGraph("#vis");                                         // 50
  Messages.find({ groupId: Router.current().params._id }).observe({    // 51
    added: function (doc) {                                            // 52
      graph.addNode(doc);                                              // 53
    },                                                                 //
    removed: function (doc) {                                          // 55
      graph.removeNode(doc);                                           // 56
    },                                                                 //
    changed: function (updated, old) {                                 // 58
      graph.updateNode(updated, old);                                  // 59
    }                                                                  //
  });                                                                  //
                                                                       //
  function myGraph(el) {                                               // 63
    // Define the div for the tooltip                                  //
    var div = d3.select("#tool").attr("class", "tooltip").style("opacity", 0);
                                                                       //
    this.updateNode = function (updated, old) {                        // 70
      // console.log("updateNode");                                    //
      // console.log(old._id);                                         //
      var n = findNode(old._id);                                       // 73
      // // debugger                                                   //
      n.votes = updated.votes;                                         // 75
      n.life = updated.life;                                           // 76
      // nodes.splice(findNodeIndex(n),1);                             //
      // nodes.push(n);                                                //
      //     debugger                                                  //
      //     var node = vis.selectAll("g.node")                        //
      //      .data(nodes, function(d) { return d._id; })              //
      //      .attr("id",function(d){return "node-"+ d._id});          //
      // // debugger                                                   //
      //     node.transition().duration(100);                          //
      //     node.style("opacity",1);                                  //
      // debugger                                                      //
      d3.select("#node-" + old._id).transition().duration(10).style("opacity", function (d) {
        // console.log("life "+d.life/1000);                           //
        // console.log("new opacity "+d.life/maxLife);                 //
        return d.life / maxLife;                                       // 93
      }).transition().duration(function (d) {                          //
        /*console.log(d.life, maxLife);*/return d.life;                //
      }).style("opacity", 0).each('end', function (d) {                //
        div.transition().duration(500).style("opacity", 0);            // 98
        removeNode(d);                                                 // 101
      });                                                              //
                                                                       //
      div.style("background-color", function () {                      // 104
        var username = Meteor.user().username;                         // 105
        if (Messages.find({ _id: old._id, voters: username }).count() === 0) {
          return "#95a5a6";                                            // 107
        } else {                                                       //
          return "#e74c3c";                                            // 110
        }                                                              //
      });                                                              //
                                                                       //
      // console.log(n.votes,Date(n.timestamp));                       //
                                                                       //
      div.html("<small>" + new Date(n.timestamp) + "<div> Clicks: " + n.votes + " </div>" + "</small>" + " <hr>" + "<div> \"" + n.text + "\"</div>" + "<br><div>   -" + n.username + "</div>").style("font-family", "Merriweather").style("font-size", "11pt");
    };                                                                 //
                                                                       //
    this.addNode = function (doc) {                                    // 121
      nodes.push(doc);                                                 // 122
      update();                                                        // 123
    };                                                                 //
                                                                       //
    this.removeNode = function (doc) {                                 // 126
      var i = 0;                                                       // 127
      var n = findNode(doc._id);                                       // 128
      nodes.splice(findNodeIndex(doc), 1);                             // 129
      update();                                                        // 130
    };                                                                 //
                                                                       //
    var removeNode = function (doc) {                                  // 133
      var i = 0;                                                       // 134
      var n = findNode(doc._id);                                       // 135
      nodes.splice(findNodeIndex(doc), 1);                             // 136
      update();                                                        // 137
    };                                                                 //
                                                                       //
    var findNode = function (id) {                                     // 140
      for (var i in babelHelpers.sanitizeForInObject(nodes)) {         // 141
        if (nodes[i]._id === id) return nodes[i];                      // 142
      };                                                               //
    };                                                                 //
                                                                       //
    var findNodeIndex = function (doc) {                               // 145
      for (var i = 0; i < nodes.length; i++) {                         // 146
        if (nodes[i].id == doc._id) {                                  // 147
          return i;                                                    // 148
        }                                                              //
      };                                                               //
    };                                                                 //
                                                                       //
    var w = window.innerWidth - 200,                                   // 153
        h = window.innerHeight - 50;                                   //
    // console.log(window.innerHeight,window.innerWidth);              //
                                                                       //
    var svg = d3.select(el).append("svg:svg").attr("width", w).attr("height", h).attr("id", "svg").attr("pointer-events", "all").attr("viewBox", "0 0 " + w + " " + h).attr("perserveAspectRatio", "xMinYMid");
                                                                       //
    window.onresize = function () {                                    // 166
      w = window.innerWidth - 200, h = window.innerHeight - 50;        // 167
      svg.attr("width", w);                                            // 169
      svg.attr("height", h);                                           // 170
    };                                                                 //
                                                                       //
    var vis = svg.append('svg:g');                                     // 173
                                                                       //
    var force = d3.layout.force();                                     // 175
                                                                       //
    var nodes = force.nodes();                                         // 177
                                                                       //
    // var label = d3.select("#bubble-labels");                        //
                                                                       //
    var update = function () {                                         // 183
                                                                       //
      var node = vis.selectAll("g.node").data(nodes, function (d) {    // 185
        return d._id;                                                  // 186
      });                                                              //
                                                                       //
      // var labels = d3.selectAll(".bubble-label")                    //
      //   .data(nodes, function(d) { return d._id; });                //
                                                                       //
      var nodeEnter = node.enter().append("g").attr("class", "node").call(force.drag);
                                                                       //
      nodeEnter.append("svg:circle").attr("r", function (d) {          // 195
        return d.radius;                                               // 196
      }).attr("id", function (d) {                                     //
        return "Node;" + d.id;                                         // 197
      }).attr("class", "nodeStrokeClass")                              //
      // .style("fill", function(d, i) { return "red"; })              //
      .style("opacity", 0).attr("id", function (d) {                   //
        // console.log(d.text + " " + d._id + " add id");              //
        return "circle-" + d._id;                                      // 203
      });                                                              //
                                                                       //
      //the native solution                                            //
      nodeEnter.append("svg:text").attr("class", "textClass").style("fill", function (d, i) {
        return color(i % 3);                                           // 209
      }).style("text-anchor", "middle").text(function (d) {            //
        if (d.text.length > 15) {                                      // 212
          // console.log(d.text.length);                               //
          return "\"" + d.text.substring(0, 16) + "...\"";             // 214
        } else {                                                       //
          return "\"" + d.text + "\"";                                 // 217
        }                                                              //
      })                                                               //
      // .call(wrap,30)                                                //
      .style("opacity", function (d) {                                 //
        /*console.log(d.text + " " + d.life);*/return d.life / maxLife;
      }).transition().duration(function (d) {                          //
        return d.life;                                                 // 223
      }).style("opacity", 0).each('end', function (d) {                //
        div.transition().duration(500).style("opacity", 0);            // 226
        removeNode(d);                                                 // 229
      }).attr("data-id", function (d) {                                //
        return d._id;                                                  // 232
      }).attr("id", function (d) {                                     //
        // console.log(d.text + " " + d._id + " add id");              //
        return "node-" + d._id;                                        // 236
      });                                                              //
                                                                       //
      node.on("click", function (d) {                                  // 239
        // console.log(d.text);                                        //
      }).on("mouseover", function (d) {                                //
        div.transition().duration(200).style("opacity", .9).style("position", "fixed").style("top", "250px").style("left", function () {
          if (d.x > w / 2) {                                           // 249
            return w / 8 + "px";                                       // 250
          } else {                                                     //
            return 5 * w / 6 + "px";                                   // 252
          }                                                            //
        }).style("background-color", function () {                     //
          var username = Meteor.user().username;                       // 256
          if (Messages.find({ _id: d._id, voters: username }).count() === 0) {
            return "#95a5a6";                                          // 258
          } else {                                                     //
            return "#e74c3c";                                          // 261
          }                                                            //
        });                                                            //
        div.html("<small>" + new Date(d.timestamp) + "<div> Clicks: " + d.votes + " </div>" + "</small>" + " <hr>" + "<div> \"" + d.text + "\"</div>" + "<br><div>   -" + d.username + "</div>").style("font-family", "Merriweather").style("font-size", "11pt");
      }).on("mouseout", function (d) {                                 //
        div.transition().duration(500).style("opacity", 0);            // 269
      });                                                              //
                                                                       //
      // svg.append("rect")                                            //
      //   .attr("width",w)                                            //
      //   .attr("height",h)                                           //
      //   .style("opacity",0)                                         //
      //   .on("click",function(){                                     //
      //     console.log("click");                                     //
      //     div                                                       //
      //     .transition()                                             //
      //     .duration(500)                                            //
      //     .style("opacity",0);                                      //
      //   });                                                         //
      // for(var i = 0; i<nodes.length; i++){                          //
      //   console.log(nodes[i]._id + " nodes");                       //
      //   d3plus.textwrap()                                           //
      //     .container(d3.select("#circle-"+nodes[i]._id))            //
      //     .resize(true)                                             //
      //     .draw();                                                  //
      // }                                                             //
                                                                       //
      // the foreign solution                                          //
      // nodeEnter.append("foreignObject")                             //
      //   .attr("width", function(d){return d.radius*2 + 5;} )        //
      //   .attr("height", function(d){return d.radius*2 + 5;} )       //
      //   .attr("x",function(d){return -d.radius + 5 + "";})          //
      //   .attr("y",function(d){return -d.radius + 5 + "";})          //
      //   // .transition()                                            //
      //   // .duration(5000)                                          //
      //   // .style("opacity",.5)                                     //
      //   .append("xhtml:body")                                       //
      //   .style("font", "14px 'Helvetica Neue'")                     //
      //   .html(function(d){return "<p>"+d.text +"</p>";});           //
      // .transition()                                                 //
      // .duration(5000)                                               //
      // .style("opacity",.5);                                         //
      // .style("opacity",function(d){console.log(d.text + " " + d.life);return d.life/maxLife})
      // .transition()                                                 //
      // .duration(function(d){return 5000})                           //
      // .style("opacity",0)                                           //
      // .each('end',function(d){                                      //
      //   removeNode(d);                                              //
      // })                                                            //
      // .attr("data-id", function(d){                                 //
      //     return d._id;                                             //
      // })                                                            //
      // .attr("id", function(d){                                      //
      //     console.log(d.text + " " + d._id + " add id");            //
      //     return "node-"+d._id;                                     //
      // });                                                           //
                                                                       //
      //foreign object solution                                        //
      // nodeEnter.append("foreignObject")                             //
      //   .attr("class","textClass2")                                 //
      //   .attr('x', -150/2)                                          //
      //   .attr('y', -20)                                             //
      //   .attr("width", 150)                                         //
      //   .attr("height", 200)                                        //
      //   .append("xhtml:p")                                          //
      //   .attr('style','word-wrap: break-word; text-align:center;')  //
      //   .style("color",function(d,i){return color(i%3);})           //
      //   .html(function(d){return d.text})                           //
      //   .transition()                                               //
      //   .duration(500)                                              //
      //   .style("opacity",0);                                        //
                                                                       //
      node.exit().remove();                                            // 340
                                                                       //
      force.on("tick", function (e) {                                  // 342
        var q = d3.geom.quadtree(nodes),                               // 343
            i = 0,                                                     //
            n = nodes.length;                                          //
                                                                       //
        node.each(gravity(e.alpha));                                   // 347
                                                                       //
        while (++i < n) q.visit(collide(nodes[i]));                    // 349
        node.attr("transform", function (d) {                          // 350
          return "translate(" + d.x + "," + d.y + ")";                 // 350
        });                                                            //
      });                                                              //
                                                                       //
      function gravity(alpha) {                                        // 353
        // console.log(alpha);                                         //
        var cx = w / 2,                                                // 355
            cy = h / 2,                                                //
            ax = alpha / 16,                                           //
            ay = alpha / 4;                                            //
                                                                       //
        return function (d) {                                          // 360
          d.x += (cx - d.x) * ax;                                      // 361
          d.y += (cy - d.y) * ay;                                      // 362
        };                                                             //
      }                                                                //
                                                                       //
      function collide(node) {                                         // 366
        // console.log("collide");                                     //
        //***************                                              //
        //Collide function taken from:                                 //
        // "Building a Bubble Cloud"                                   //
        // article: http://vallandingham.me/building_a_bubble_cloud.html
                                                                       //
        var r = node.radius + 16,                                      // 373
            nx1 = node.x - r,                                          //
            nx2 = node.x + r,                                          //
            ny1 = node.y - r,                                          //
            ny2 = node.y + r;                                          //
        return function (quad, x1, y1, x2, y2) {                       // 378
          if (quad.point && quad.point !== node) {                     // 379
            var x = node.x - quad.point.x,                             // 380
                y = node.y - quad.point.y,                             //
                l = Math.sqrt(x * x + y * y),                          //
                r = node.radius + quad.point.radius;                   //
            if (l < r) {                                               // 384
              l = (l - r) / l * .5;                                    // 385
              node.x -= x *= l;                                        // 386
              node.y -= y *= l;                                        // 387
              quad.point.x += x;                                       // 388
              quad.point.y += y;                                       // 389
            }                                                          //
          }                                                            //
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;         // 392
        };                                                             //
      }                                                                //
                                                                       //
      force.gravity(0).size([w, h]).start();                           // 396
    };                                                                 //
                                                                       //
    update();                                                          // 402
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

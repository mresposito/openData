define ([
  "jquery",
  "underscore",
  "backbone",
  "views/LineGraph",
  "views/BarGraph"
], function($, _, Backbone, LineGraph, BarGraph) {

  return Backbone.View.extend({

    events: {
      "click .graph-sidebar a": "changeGraph"
    },

    initialize: function(){
      self = this
      var sidebar = $(".graph-sidebar")
      this.body = $(".graph-body")
      var li = $(".graph-sidebar li")
      var first = true

      this.collection.each(function(model) {
        if(model.get("graph") != null) {
          var newLi = li.clone()
          sidebar.prepend(newLi)
          newLi = sidebar.find("li").first()
          newLi.attr("style", "")
          newLi.find("a").html(model.get("graph").name)
          if(first) { // ugly, refactor
            self.loadModel(model)
            first = false
          }
        }
      });

      
    },

    changeGraph: function(actor) {
      self = this
      var target =  $(actor.target)
      var name = target.text()

      this.collection.each(function(model) {
        graph = model.get("graph")
        if(graph != null && graph.name === name) {
          self.verifyAndLoad(model)
        }
      });

    },

    verifyAndLoad: function(model) {
      if(this.model.get("graph").name === model.get("graph").name){
        return
      } else {
        this.loadModel(model) 
      }
    },

    loadModel: function(model) {
      this.model = model
      this.makeGraph(model)
    },

    makeGraph: function(model) {
      var graphType = model.get("graph").render
      var View = LineGraph

      console.log(graphType)
      if(graphType === "stack") {
        View = BarGraph
      } 

      return new View({
        el: this.body,
        model: model
      })
    }
  });
});

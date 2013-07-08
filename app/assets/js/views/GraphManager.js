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

    /**
     * Recieves the event of toggling a new graph
     * and loads the new view
     */
    changeGraph: function(actor) {
      var target =  $(actor.target)
      var name = target.text()

      var collectionToLoad = this.collection.findByName(name)
      if(collectionToLoad != null) {
        this.verifyAndLoad(collectionToLoad)
      }
    },

    /**
     * Check that we are loading a new model.
     * If the model is the same as we have in memory,
     * then do nothing.
     */
    verifyAndLoad: function(model) {
      if(this.model.get("graph").name === model.get("graph").name){
        return
      } else {
        this.loadModel(model) 
      }
    },

    /**
     * Assigns a new model to the graph
     */
    loadModel: function(model) {
      this.model = model
      this.makeGraph(model)
    },

    makeGraph: function(model) {
      var graphType = model.get("graph").render
      var View = LineGraph

      if(graphType === "stack") {
        View = BarGraph
      } 

      return new View({
        el: this.body,
        model: model,
        collection: this.collection
      })
    }
  });
});

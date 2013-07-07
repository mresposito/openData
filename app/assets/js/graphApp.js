require.config({
  paths: {
    jquery: "/assets/js/jquery-1.9.0.min",
    underscore: "/assets/js/underscore-min",
    backbone: "/assets/js/backbone-min",
    jsApi: "/assets/js/jsapi"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore"],
      exports: "Backbone"
    }
  }
});

require ([
  "jquery",
  "underscore",
  "backbone"
], function($, _, Backbone) {

  var list = $("ul.unstyled")
  require(["collections/Graphs", "views/Graph"], function(GraphLoader, GraphView) {
    new GraphLoader(function(collection){
      collection.each(function(model){
        if(model.get("graph") != null) {
          console.log(model.get("graph").name)
        }
        // if(model.get("title") != null) {
        //   var newLi = $('<li class="event"></li>') 
        //   list.append(newLi)
        //   newLi = list.find("li").last()
        //   new EventView({
        //     el: newLi,
        //     model: model
        //   });
        // }
      });
    });
  });
});

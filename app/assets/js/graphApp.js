require.config({
  paths: {
    jquery: "/assets/js/jquery-1.9.0.min",
    underscore: "/assets/js/underscore-min",
    backbone: "/assets/js/backbone-min",
    jsApi: "/assets/js/jsapi",
    flot: "/assets/js/jquery.flot.min",
    flotTime: "/assets/js/jquery.flot.time.min",
    flotSelect: "/assets/js/jquery.flot.selection.min"
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
    },
    flot: {
      deps: ["jquery"],
      exports: "Flot"
    },
    flotTime: {
      deps: ["jquery", "flot"],
      exports: "FlotTime"
    },
    flotSelect: {
      deps: ["jquery", "flot", "flotTime"],
      exports: "FlotSelect"
    }
  }
});

require ([
  "jquery",
  "underscore",
  "backbone",
  "collections/Graphs",
  "views/GraphManager"
], function($, _, Backbone, GraphLoader, GraphManager) {

  el = $(".graph-row")

  new GraphLoader(function(collection){
    new GraphManager({
      el: el,
      collection: collection
    });
  });
});

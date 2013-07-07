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
  "backbone",
  "collections/Graphs",
  "views/GraphSuper"
], function($, _, Backbone, GraphLoader, GraphSuper) {

  el = $(".graph-row")

  new GraphLoader(function(collection){
    new GraphSuper({
      el: el,
      collection: collection
    });
  });
});

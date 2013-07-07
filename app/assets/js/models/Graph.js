define ([
  "underscore",
  "backbone"
], function(_, Backbone) {

  var model = Backbone.Model.extend({
    defaults: {
    },
    urlRoot: "/v1/data"
  });
  
  return model;
});

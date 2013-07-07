define ([
  "jquery",
  "underscore",
  "backbone",
  "models/Graph"
], function($, _, Backbone, Graph) {

  return Backbone.Collection.extend({

    model: Graph,
    initialize: function(callback){
      self = this;
      $.getJSON("/v1/data/0", function(data) {
        _.each(data, function(elem) {
          self.add(new Graph(elem))
        });
        callback(self);
      });
    }
  });
});

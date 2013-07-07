define ([
  "jquery",
  "underscore",
  "backbone",
  "views/Graph.html"
], function($, _, Backbone, EventHTML) {

  return Backbone.View.extend({

    events: {
      "focus input.settings-rss-fakeInput": "addForm"
    },

    initialize: function(){
      $(this.el).html(EventHTML(
          {model: this.model})
        );
    }

  });
});

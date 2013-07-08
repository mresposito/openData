define ([
  "jquery",
  "underscore",
  "backbone"
], function($, _, Backbone) {

  return Backbone.View.extend({

    initialize: function(){
      self = this

      var series = this.model.get("series")
      var datasets = {}

      this.loadHtml()

      _.map(series, function(data) {
        label = data.name
        datasets[label] = {
          label: label,
          data : self.flattenData(data.data)
        }
      });

      this.plotDatasets(datasets)
      this.resumeData(datasets)
      this.setTitle()
    },

    flattenData: function (data) {
      var el =  _.map(data, function(point) {
        var toInt = parseInt(point.x)
        if(isNaN(toInt))
          return ([point.x, point.y])
        else
          return ([parseInt(point.x)*1000, point.y])
      });

      return _.sortBy(el, function(point) {
        return point[0]
      });
    },

    loadHtml: function() {
      $(this.el).html(this.htmlString())
    },

    htmlString: function(datasets) {
      return ""
        + '<div id="placeholder" class="demo-placeholder" style="float:left; width:90%; height: 500px;"></div>'
        + '<table class="table table-striped display-table">'
        + '</table>'
    },

    resumeData: function (datasets) {
      return null;
    },

    setTitle: function() {
      $(this.el).prepend("<h1>" + this.model.get("graph").name + "</h1>")
    }
  });
});

define ([
  "jquery",
  "underscore",
  "backbone",
  "flot",
  "flotCategories",
  "views/GraphSuper"
], function($, _, Backbone, Flot, FlotCategories, GraphSuper) {

  return GraphSuper.extend({

    plotDatasets: function(datasets) {
      var data = _.sortBy(datasets.none.data, function(el) { return el[1]; }).reverse()
      $.plot("#placeholder", [data.slice(0,10)], {
        series: {
          bars: {
            show: true,
            barWidth: 0.6,
            align: "center"
          }
        },
        xaxis: {
          mode: "categories",
          tickLength: 0
        }
      });
    },

    resumeData: function (datasets) {
      var data = _.sortBy(datasets.none.data, function(el) { return el[1]; }).reverse()
      var table = this.table
      table.append(
          "<thead><tr><th>Name of query</th><th>Count</th></tr></thead>")
      _.map(data, function(point) {
        table.append(
          self.formatTable(point))
      })
    }
  });
});

define ([
  "underscore",
  "backbone"
], function(_, Backbone) {

  return Backbone.Model.extend({
    defaults: {
    },
    urlRoot: "/v1/data",

    /**
     * takes a series 
     * and calculates the total of the y axis
     */
    totalBySeries: function (series) {
      return _.reduce(series.data, function(sum, el) {
        return el[1] + sum
      }, 0);
    },

    name: function() {
      return this.get("graph").name
    },

    findSeries: function(datasets, name) {
      return _.find(datasets, function(series) {
        return series.label === name
      });
    },

    findTotalSeries: function(datasets, name) {
      var series = this.findSeries(datasets, name)
      console.log(name)
      if(series !== undefined) {
        return this.totalBySeries(series)
      } else {
        return null
      }
    },

    makeDataset: function(flattenData) {
      var datasets = {}

      _.map(this.get("series"), function(data) {
        label = data.name
        datasets[label] = {
          label: label,
          data : flattenData(data.data)
        }
      });

      return datasets
    }
  });
});

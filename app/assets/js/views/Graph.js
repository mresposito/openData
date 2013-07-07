define ([
  "jquery",
  "underscore",
  "backbone",
  "flot",
  "flotTime",
  "flotSelect",
  "views/Graph.html"
], function($, _, Backbone, Flot, FlotTime, FlotSelect, EventHTML) {

  function flattenData(data) {
    var el =  _.map(data, function(point) {
      return ([parseInt(point.x)*1000, point.y])
    });

    return _.sortBy(el, function(point) {
      return point[0]
    });
  }

  return Backbone.View.extend({

    events: {
    },

    initialize: function(){
      var series = this.model.get("series")
      var datasets = {}
      _.map(series, function(data) {
        label = data.name
        datasets[label] = {
          label: label,
          data : flattenData(data.data)
        }
      });

      this.plotDatasets(datasets)
    },

    plotDatasets: function(datasets) {
      var i = 0;
      $.each(datasets, function(key, val) {
        val.color = i;
        ++i;
      });

      // insert checkboxes 
      var choiceContainer = $("#choices");
      $.each(datasets, function(key, val) {
        choiceContainer.append("<input type='checkbox' name='" + key +
          "' checked='checked' id='id" + key + "'>" +
          "<label for='id" + key + "'>"
          + val.label + "</label></input>");
      });

      choiceContainer.find("input").click(plotAccordingToChoices);

      function plotAccordingToChoices() {
        function weekendAreas(axes) {

          var markings = [],
              d = new Date(axes.xaxis.min);

          // go to the first Saturday

          d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
            d.setUTCSeconds(0);
          d.setUTCMinutes(0);
          d.setUTCHours(0);

          var i = d.getTime();

          // when we don't set yaxis, the rectangle automatically
          // extends to infinity upwards and downwards

          do {
            markings.push({ xaxis: { from: i, to: i + 2 * 24 * 60 * 60 * 1000 } });
            i += 7 * 24 * 60 * 60 * 1000;
          } while (i < axes.xaxis.max);

          return markings;
        }

        var data = [];

        choiceContainer.find("input:checked").each(function () {
          var key = $(this).attr("name");
          if (key && datasets[key]) {
            data.push(datasets[key]);
          }
        });

        if (data.length > 0) {
          options = {
            yaxis: {
              min: 0
            },
            xaxis: {
              mode: "time"
            },
            points: {
              show: true
            },
            lines: {
              show: true
            },
            grid: {
              markings: weekendAreas
            },
            selection: {
              mode: "x"
            }
          }
          $.plot("#placeholder", data, options);

          var overview = $.plot("#overview", data, {
            series: {
              lines: {
                show: true,
                lineWidth: 1
              },
              shadowSize: 0
            },
            xaxis: {
              mode: "time"
            },
            yaxis: {
              min: 0,
              autoscaleMargin: 0.1
            },
            selection: {
              mode: "x"
            },
            legend: {
              show: false
            }
          });

          // now connect the two

          $("#placeholder").bind("plotselected", function (event, ranges) {

            // do the zooming

            plot = $.plot("#placeholder", data, $.extend(true, {}, options, {
              xaxis: {
                min: ranges.xaxis.from,
               max: ranges.xaxis.to
              }
            }));

            // don't fire event on the overview to prevent eternal loop


            $("#overview").bind("plotselected", function (event, ranges) {
              plot.setSelection(ranges);
            });

            overview.setSelection(ranges, true);
          });
        }
      }

      plotAccordingToChoices();
    }
  });
});

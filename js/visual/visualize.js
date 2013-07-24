visualizer = (function() {
  return {
    visualize: function(data, name, chart){
      chart.html('');

      var plot3 = $.jqplot(chart.attr('id'), data,   { 
        title: name, 
        // Series options are specified as an array of objects, one object
        // for each series.
        series:[ 
          { lineWidth:2, 
            markerOptions: { style:'dimaond' }
          },
          { lineWidth:2, 
            markerOptions: { style:'x' }
          },
          { lineWidth:2, 
            markerOptions: { style:'circle' }
          }
        ]
      });
    }
  };
})();
visualizer = (function() {
  return {
    visualize: function(data, name, chart){
      var plot = $.jqplot(chart.attr('id'), data,   { 
        title: name, 
        // Series options are specified as an array of objects, one object
        // for each series.
        series: [ 
          { lineWidth:2, 
            markerOptions: { style:'dimaond' },
          },
          { lineWidth:2, 
            markerOptions: { style:'x' }
          },
          { lineWidth:2, 
            markerOptions: { style:'circle' }
          }
        ],
        axes: {
          xaxis: {
            label: 'No. of matches (10 log())'
          },
          yaxis: {
            label: 'Percentage won',
            min: 0,
            max: 100
          }
        },
      });
    }
  };
})();
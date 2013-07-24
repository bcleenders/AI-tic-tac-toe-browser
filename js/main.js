var iterations = 10000;

var player1 = Object.create(player_ai_obj);
var player2 = Object.create(player_ai_obj);
var gamekeeper = Object.create(gameKeeper_obj);

var training_data = {
  scores: [],
  counts: []
}

// Provide training data
if(typeof player1.init == 'function')
  player1.init(training_data);
if(typeof player2.init == 'function')
  player2.init(training_data);

var helpers = (function(){
  var results_history = [[],[],[]];

  return {
    name: undefined,
    chart: undefined,
    log: function(iteration, scores) {
      if(iteration > 0 && (
        iteration % 1000 == 0 ||
        (iteration % 100 == 0 && iteration < 1000) ||
        (iteration % 10 == 0  && iteration < 100)
        )) {
        for(var i = 0; i < 3; i++)
          results_history[i].push([Math.log(iteration)/Math.log(10), (100*scores[i]/iteration)]);

        //~ Visualize!
        if(iteration % (iteration / 20 | 0) == 0)
          this.chart.html('Progress; ' + ((100*iteration/iterations) | 0) + "%");

        visualizer.visualize(results_history, this.name, this.chart);
      }
    }
  }
})();

helpers.name = "AI vs AI";
helpers.chart = $('#chart1');
var scores = gamekeeper.match(iterations, player1, player2, helpers);
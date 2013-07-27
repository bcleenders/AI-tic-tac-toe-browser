var player1 = Object.create(player_ai_obj);
var player2 = Object.create(player_ai_obj);

var player3 = Object.create(player_ai_obj);
var player4 = Object.create(player_random_obj);

var player5 = Object.create(player_ai_obj);
var player6 = Object.create(player_dumb_obj);

var gamekeeper = Object.create(gameKeeper_obj);

var training_data = {
  scores: [],
  counts: []
}

var helpers = function() {
  var results_history = [[],[],[]];

  return {
    log: function(iteration, scores) {

      if(iteration > 0 && (
        iteration % 1000 == 0 ||
        (iteration % 100 == 0 && iteration < 1000) ||
        (iteration % 10 == 0  && iteration < 100)
        )) {
        for(var i = 0; i < 3; i++)
          results_history[i].push([Math.log(iteration)/Math.log(10), (100*scores[i]/iteration)]);
      }
    },
    logged: function() {
      return results_history;
    }
  }
};

var run = function(iterations, chartID) {
  if(iterations == 0)
    return;

  var settings = ([
    { players: [player1, player2],
      title: "AI vs AI",
      chart: $('#chart1')         },
    { players: [player3, player4],
      title: "AI vs random bot",
      chart: $('#chart2')         },
    { players: [player5, player6],
      title: "AI vs dumb bot",
      chart: $('#chart3')         }
  ])[chartID - 1];

  // Start with a clean slate
  settings.chart.html("Calculating...");

  results = gamekeeper.match(iterations, settings.players[0], settings.players[1], Object.create(helpers()));
  visualizer.visualize(results, settings.title, settings.chart);
}

run(10000, 1);
run(50000, 2);
run(50000, 3);
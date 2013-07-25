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

// Provide training data
/*if(typeof player1.init == 'function')
  player1.init(training_data);
if(typeof player2.init == 'function')
  player2.init(training_data);
*/

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

results = gamekeeper.match(10000, player1, player2, Object.create(helpers()));
visualizer.visualize(results, "AI vs AI",         $('#chart1'));

results = gamekeeper.match(50000, player3, player4, Object.create(helpers()));
visualizer.visualize(results, "AI vs random bot", $('#chart2'));

results = gamekeeper.match(50000, player5, player6, Object.create(helpers()));
visualizer.visualize(results, "AI vs dumb bot",   $('#chart3'));
gameKeeper_obj = (function() {
  var players = [],
    curr_player = 0,
    game = Object.create(game_obj);

  return {
    newGame: function(player1, player2, starting_player) {
      players = [player1, player2];
      game.init();
      curr_player = starting_player % 2;
    },
    runGame: function() {
      while(!game.finished())
        this.turn();
      return game.getWinner();
    },
    turn: function() {
      var space = players[curr_player].getTurn(game, curr_player);

      if(curr_player > 1)
        throw "Invalid current player";

      game.set(space, curr_player);
      curr_player = 1 - curr_player;
    },
    endGame: function() {
      // Punish the loser (draw = loss)
      var winner = game.getWinner();

      if(winner != 0 && typeof player1.punish == 'function') 
        player1.punish(game, 0);
      if(winner != 1 && typeof player2.punish == 'function') 
        player2.punish( game, 1);
    },
    match: function(iterations, player1, player2, options) {
      var results = [0,0,0];

      var helpers = {
        pickStarter: function(iteration) { return iteration; },
        log: function(iteration, r) {
          if(iteration == 0)
            console.log(" Draw    Player 1    Player 2    Total")

          if(iteration > 0 && (
              iteration % 1000 == 0 ||
              (iteration % 100 == 0 && iteration < 1000) ||
              (iteration % 10 == 0  && iteration < 100)
            )) {
            var total = r[0] + r[1] + r[2];

            console.log(" " + (100 * (r[0]/total)).toPrecision(3) + "%    " 
                            + (100 * (r[1]/total)).toPrecision(3) + "%    "
                            + (100 * (r[2]/total)).toPrecision(3) + "%    "
                            + total);
          }
        },
        logged: function() { return undefined; }
      };

      // Merge supplied helper functions with defaults
      for (var attrname in options)
        helpers[attrname] = options[attrname];

      for(var i = 0; i < iterations; i++) {
        this.newGame(player1, player2, (helpers.pickStarter(i) % 2) );
        var winner = this.runGame();
        this.endGame();

        // Save the results (for future reference)
        results[winner + 1]++;

        // Log the results
        helpers.log(i, results);
      }

      return helpers.logged();
    }
  }
})();
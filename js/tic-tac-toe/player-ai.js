var player_ai_obj = (function() {
	var knowledge = {
		scores: [],
		counts: []
	},
	previous_state = 0,
	count = 0;

	// Strategy
	function pi(board) {
		var moves = board.getFreeSpaces();
		return tools.selectHighestScore(moves, board, knowledge.scores);
	}

	// Utility function
	function U(state) {
		var score = knowledge.scores[state];
		if(score == undefined)
			return 0;
		return score;
	}

	// Number of times we visited the state
	function N(state) {
		var count = knowledge.counts[state];
		if(count == undefined)
			return 0;
		return count;
	}

	function evaluate(old_state, new_state, winning) {
		var gamma = 0.9;

		if(winning)
			knowledge.scores[new_state] = 1;

		var old_score = U(old_state);
		var new_score = U(new_state);

		knowledge.counts[old_state] = N(old_state) + 1;
		alpha1 = tools.alpha(N(old_state));
		var old_score = old_score + alpha1*(gamma*new_score - old_score);
		knowledge.scores[old_state] = old_score;
	}

	return {
		init: function(train_data) {
			knowledge = train_data;
		},

		newGame: function() {
			previous_state = 0;
		},

		getTurn: function(board, id) {
			if(id == 1)
				board.invert();
			// From now on, let's suppose that we are player 0.

			// Think of what move we should do
			var move;
			if(tools.go_random(count))
				move = tools.getRandom(board);
			else
				move = pi(board);

			tools.simulate(move, board, function(new_board) {
				var new_state = new_board.getState();
				var winning = (new_board.getWinner() == 0);
				if(this.prev_state >= 0)
					evaluate(prev_state, new_state, winning);
				this.prev_state = new_state;
			});

			if(id == 1)
				board.invert();

			return move;
		},

		punish: function() {
			knowledge.scores[previous_state] = -0.5;
		}
	}
})();

var tools = {
	// Decides whether to go random, or follow the strategy
	go_random: function(count) {
		return Math.random() < 0.1;
	},
	alpha: function(count) {
		return (1/ (1+count));
	},
	shuffle: function(array) {
		for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
    return array;
  },
  getRandom: function(board) {
		var free = board.getFreeSpaces();
		var random = Math.random() * free.length | 0;

		return free[random];
	},
	selectHighestScore: function(moves, board, scores) {
		return this.getMinMaxMove(moves, board, scores, true);
	},
	selectLowestScore: function(moves, board, scores) {
		return this.getMinMaxMove(moves, board, scores, false);
	},
	getMinMaxMove: function(moves, board, scores, max) {
		moves = this.shuffle(moves);

		var move = moves[0];
		var state = this.getStateIfMarked(moves[0], board, (max * 1));

		for(var i = 1; i < moves.length; i++) {
			var other_state = this.getStateIfMarked(moves[i], board, (max * 1));
			if( (scores[state] < scores[other_state] && max) ||
				(scores[state] > scores[other_state] && !max)) {
				move = moves[i];
				state = other_state;
			}
		}
		return move;
	},
	getStateIfMarked: function(move, board, id) {
		return this.simulate(move, board, function() { 
			return board.getState();
		});
	},
	simulate: function(move, grid, f) {
		if(grid.set(move, 0)) {
			var r = f(grid);
			grid.set(move, -1);
			return r;
		}
	}
}
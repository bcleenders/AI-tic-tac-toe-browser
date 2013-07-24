var game_obj = (function() {
	var winningCombinations = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	],
	grid;

	return {
		init: function() {
			grid = [
				-1,-1,-1,
				-1,-1,-1,
				-1,-1,-1 
			]
		},
		set: function(field, value) {
			if(value > 1)
				throw "Invalid field value";

			if(grid[field] > -1 && value > -1) {
				console.log(grid);
				console.log(field);
				console.log(value);
				console.log(this.finished());
				throw "You can't override a field"
			}

			grid[field] = value;
			return true;
		},
		getWinner: function() {
			for(var i = 0; i < winningCombinations.length; i++) {
				var entry = winningCombinations[i];

				if(	grid[entry[0]] > -1 &&
						grid[entry[0]] == grid[entry[1]] && 
						grid[entry[1]] == grid[entry[2]]) {
					return grid[entry[0]];
				}
			}
			// No winner :(
			return -1;
		},
		finished: function() {
			// Do we have a winner?
			if(this.getWinner() > -1)
				return true;

			// Are all fields occupied?
			for(var i = 0; i < grid.length; i++)
				if(grid[i] == -1)
					return false;

			// It's a draw; all fields are occupied, but no winner :(
			return true;
		},
		getState: function() {
			var state = 0;
			for(var i = 0; i < grid.length; i++)
				if(grid[i] >= 0)
					state += (grid[i] + 1) * Math.pow(3, i);
			
			return state;
		},
		isFree: function(field) {
			return grid[field] == -1;
		},
		invert: function(toCall) {
			for(var i = 0; i < grid.length; i++)
				if(! this.isFree(i))
					grid[i] = 1 - grid[i];
		},
		getFreeSpaces: function() {
			var free = [];
			for(var i = 0; i < grid.length; i++)
				if(grid[i] == -1)
					free[free.length] = i;
			return free;
		},
		toString: function() {
			console.log(">> board: >> ");
			console.log(grid);

			var values = [' ', 'x', 'o'],
					output = '';
			for(var i = 0; i < 3; i++) {
				for(var j = 0; j< 3; j++)
					output += ' ' + values[grid[3*i + j] + 1];
				output += '\n'
			}
			return output;
		}
	}
})();
var player_random_obj = (function() {
  return {
    getTurn: function(board, id) {
      var free = board.getFreeSpaces();

      return free[(Math.random() * free.length) | 0];
    }
  }
})();
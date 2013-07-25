var player_dumb_obj = (function() {
  return {
    getTurn: function(board, id) {
      var free = board.getFreeSpaces();

      return free[0];
    }
  }
})();
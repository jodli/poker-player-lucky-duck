class Player {
  static get VERSION() {
    return 'Go go Power Rangers!';
  }

  static betRequest(gameState, bet) {
    var check = gameState["current_buy_in"] - gameState["players"][gameState["in_action"]]["bet"];
    console.error("betRequest: " + check);
    bet(check);
  }

  static showdown(gameState) {
    console.error("showdown: ");
    console.error(gameState);
  }
}

module.exports = Player;

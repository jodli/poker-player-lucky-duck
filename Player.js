class Player {
  static get VERSION() {
    return 'Default C# folding player';
  }

  static havePair(hand) {
    console.error("Check if pair: ");
    console.error("hand[0]: " + hand[0]["rank"] + " " + hand[0]["suit"]);
    console.error("hand[1]: " + hand[1]["rank"] + " " + hand[1]["suit"]);
    return hand[0]["rank"] == hand[1]["rank"];
  }

  static betRequest(gameState, bet) {
    var me = gameState["players"][gameState["in_action"]];

    var check = gameState["current_buy_in"] - me["bet"];
    var raise = 0;

    var hand = me["hole_cards"];

    if (this.havePair(hand)) {
      console.error("We have a pair.");
      raise += gameState["minimum_raise"];
      console.error("Raise by: " + raise);
    }

    var bid = check + raise;
    if (bid > me["stack"]) {
      console.error("ALL IN! WOHOO!");
      bid = me["stack"];
    }
    console.error("bidding: " + bid);
    bet(bid);
  }

  static showdown(gameState) {
    console.error("showdown: ");
    console.error(gameState);
  }
}

module.exports = Player;

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
      var number = Number(hand[0]["rank"]);
      if (number >= 2 && number <= 10) {
        console.error("Got a number pair.");
        raise += gameState["minimum_raise"];
      } else {
        console.error("Got a people pair.");
        raise += gameState["minimum_raise"] + 100;
      }
      console.error("Raise by: " + raise);
    }

    var bid = check + raise;
    bid = this.capRaise(bid, me["stack"]);

    console.error("bidding: " + bid);
    bet(bid);
  }

  static capRaise(bid, stack) {
    if (bid > stack) {
      console.error("ALL IN! WOHOO!");
      bid = stack;
    }
    return bid;
  }

  static showdown(gameState) {
    console.error("showdown: ");
    console.error(gameState);
  }
}

module.exports = Player;

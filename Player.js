class Player {
  static get VERSION() {
    return '0.0.8-beat_go_team';
  }
  static countCards(gameState) {
    var cards = {
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      'J': 0,
      'Q': 0,
      'K': 0,
      'A': 0
    };
    var me = gameState["players"][gameState["in_action"]];
    var hand = me["hole_cards"];

    cards[hand[0]["rank"]] += 1;
    cards[hand[1]["rank"]] += 1;

    gameState["community_cards"].forEach(element => {
      cards[element["rank"]] += 1;
    });

    return cards;
  }

  static havePair(hand) {
    console.error("Check if pair: ");
    console.error("hand[0]: " + hand[0]["rank"] + " " + hand[0]["suit"]);
    console.error("hand[1]: " + hand[1]["rank"] + " " + hand[1]["suit"]);
    return hand[0]["rank"] == hand[1]["rank"];
  }
  static checkCommunityCards(communityCards, hand) {
    let current = ''
    if (communityCards.length == 3) {
      current = 'flop'
    }
  }

  static betRequest(gameState, bet) {
    var cards = this.countCards(gameState);
    var me = gameState["players"][gameState["in_action"]];
    var hand = me["hole_cards"];

    if (!this.havePair(hand)) {
      var number = Number(hand[0]["rank"]);
      if ((number >= 2 && number <= 10)) {
        var number = Number(hand[1]["rank"]);
        if ((number >= 2 && number <= 10)) {
          console.error("No high card.");
          bet(0);
          return;
        }
      }
    }

    var check = gameState["current_buy_in"] - me["bet"];
    var raise = 0;

    // if (this.havePair(hand)) {
    //   console.error("We have a pair.");
    //   var number = Number(hand[0]["rank"]);
    //   if (number >= 2 && number <= 10) {
    //     console.error("Got a number pair.");
    //     raise += gameState["minimum_raise"];
    //   } else {
    //     console.error("Got a people pair.");
    //     raise += gameState["minimum_raise"] + 100;
    //   }
    //   console.error("Raise by: " + raise);
    // }

    var havePair = 0;
    var haveTriple = 0;

    for (let card in cards) {
      if (cards[card] == 2) {
        havePair++;
      } else if (cards[card] >= 3) {
        haveTriple++;
      }
    }

    if (havePair > 0) {
      console.error("pair only check");
    }
    if (haveTriple > 0) {
      console.error("triple yeah");
      raise += gameState["minimum_raise"] + 100;
    }

    if (gameState["community_cards"].length == 3) {
      if (!(havePair > 0 || haveTriple > 0)) {
        console.error("fold because no pair/triple with flop");
        bet(0);
        return;
      }
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

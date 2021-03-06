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
  static countColors(gameState) {
    var colors = {
      'spades': 0,
      'hearts': 0,
      'clubs': 0,
      'diamonds': 0
    }
    var me = gameState["players"][gameState["in_action"]];
    var hand = me["hole_cards"];

    colors[hand[0]["suit"]] += 1;
    colors[hand[1]["suit"]] += 1;


    gameState["community_cards"].forEach(element => {
      colors[element["suit"]] += 1;
    });

    return colors;
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
    var colors = this.countColors(gameState);
    var me = gameState["players"][gameState["in_action"]];
    var hand = me["hole_cards"];

    var haveSameColors = colors['clubs'] >= 2 || colors['diamonds'] >= 2 || colors['hearts'] >= 2 || colors['spades'] >= 2;

    if (!this.havePair(hand) && !haveSameColors) {
      console.error("No pair or no colors.");
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

    var havePair = 0;
    var haveTriple = 0;

    for (let card in cards) {
      if (cards[card] == 2) {
        havePair++;
      } else if (cards[card] >= 3) {
        haveTriple++;
      }
    }

    if (havePair == 1) {
      console.error("pair only check");
    } else if (havePair > 1) {
      console.error("raise when 2 pairs");
      raise += gameState["minimum_raise"] + 50;
    }
    if (haveTriple > 0) {
      console.error("triple yeah");
      raise += gameState["minimum_raise"] + 100;
    }

    // if full house
    if (havePair >= 1 && haveTriple >= 1) {
      raise += gameState["minimum_raise"] + 150;
    }

    haveSameColors = colors['clubs'] >= 4 || colors['diamonds'] >= 4 || colors['hearts'] >= 4 || colors['spades'] >= 4;

    if (haveSameColors) {
      raise += gameState["minimum_raise"] + 50;
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

var player = require("./Player");
const gameState = require("./test-api.json");

console.log(player.VERSION);

player.betRequest(gameState, (pot => console.log("bad: " + pot)));

player.showdown(gameState);

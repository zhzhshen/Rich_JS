let Block = require(path.join(__dirname, 'block'));
let Robot = require(path.join(__dirname, 'robot'));
let Bomb = require(path.join(__dirname, 'bomb'));

class BuildToolCommand {
  constructor() {
  }

  execute(player) {
    player.command = this;
    return 'WAIT_FOR_RESPONSE';
  }

  respond(player, response) {
    if (response == '1') {
      let block = new Block();
      player.buyItem(block);
    } else if (response == '2') {
      let robot = new Robot();
      player.buyItem(robot);
    } else if (response == '3') {
      let bomb = new Bomb();
      player.buyItem(bomb);
    } else {
      return 'TURN_END';
    }
    if (player.hasPointForCheapest()) {
      return 'WAIT_FOR_RESPONSE';
    } else {
      return 'TURN_END';
    }
  }
}

module.exports = BuildToolCommand;

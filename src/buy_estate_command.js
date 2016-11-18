class BuyEstateCommand {
  constructor() {
  }

  execute(player) {
    player.command = this;
    return 'WAIT_FOR_RESPONSE';
  }

  respond(player, response) {
    if (response == 'y') {
      player.buy();
    }
    return 'TURN_END';
  }
}

module.exports = BuyEstateCommand;

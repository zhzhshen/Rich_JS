class BuildEstateCommand {
  constructor() {
  }

  execute(player) {
    player.command = this;
    return 'WAIT_FOR_RESPONSE';
  }

  respond(response) {
    if (response == 'y') {
      player.build();
    }
    return 'TURN_END';
  }
}

module.exports = BuildEstateCommand;


class ChooseGiftCommand {
  constructor() {
  }

  execute(player) {
    player.command = this;
    return 'WAIT_FOR_RESPONSE';
  }

  respond(player, response) {
    if (response == '1') {
      player.gainMoney(2000);
    } else if (response == '2') {
      player.gainPoint(200);
    } else if (response == '3') {
      player.evisu();
    }

    return 'TURN_END';
  }
}

module.exports = ChooseGiftCommand;

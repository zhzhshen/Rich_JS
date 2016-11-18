let ChooseGiftCommand = require(path.join(__dirname, 'choose_gift_command'));

class GiftHouse {
  constructor(position) {
    this.position = position;
  }

  visitBy(player) {
    return new ChooseGiftCommand().execute(player);
  }
}

module.exports = GiftHouse;

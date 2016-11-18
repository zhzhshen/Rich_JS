
class MagicHouse {
  constructor(position) {
    this.position = position;
  }

  visitBy(player) {
    return 'TURN_END';
  }
}

module.exports = MagicHouse;

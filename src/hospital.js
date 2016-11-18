
class Hospital {
  constructor(position) {
    this.position = position;
  }

  visitBy(player) {
    return 'TURN_END';
  }
}

module.exports = Hospital;

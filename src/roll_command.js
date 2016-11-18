class RollCommand {
  constructor(dice) {
    this.step = dice.roll();
  }

  get step() {
    return this._step;
  }

  set step(step) {
    this._step = step;
  }

  execute(player) {
    player.currentPlace = player.map.move(player, this.step);
    return player.currentPlace.visitBy(player);
  }
}

module.exports = RollCommand;

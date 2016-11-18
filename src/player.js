class Player {
  constructor() {
    this.status = 'WAIT_FOR_COMMAND';
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  execute(command) {
    this.status = command.execute(this);
  }
}

module.exports = Player;

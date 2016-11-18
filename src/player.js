class Player {
  constructor(map, money) {
    this.map = map;
    this.money = money;
    this.status = 'WAIT_FOR_COMMAND';
  }

  get map() {
    return this._map;
  }

  set map(map) {
    this._map = map;
  }

  get money() {
    return this._money;
  }

  set money(money) {
    this._money = money;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get command() {
    return this._command;
  }

  set command(command) {
    this._command = command;
  }

  buy() {
    if (this.money >= this.currentPlace.price) {
      this.money = this.money - this.currentPlace.price;
      this.currentPlace.sellTo(this);
    } 
  }

  execute(command) {
    this.command = command
    this.status = this.command.execute(this);
  }

  respond(response) {
    this.status = this.command.respond(response)
  }
}

module.exports = Player;

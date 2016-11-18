class Player {
  constructor(map, money) {
    this.map = map;
    this.money = money;
    this.status = 'WAIT_FOR_COMMAND';
    this.specialStatus = {};
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

  get specialStatus() {
    return this._specialStatus;
  }

  set specialStatus(specialStatus) {
    this._specialStatus = specialStatus;
  }

  buy() {
    if (this.money >= this.currentPlace.price) {
      this.money -= this.currentPlace.price;
      this.currentPlace.sellTo(this);
    }
  }

  build() {
    if (this.money >= this.currentPlace.price && this.currentPlace.build()) {
      this.money -= this.currentPlace.price;
    }
  }

  burn() {
    this.specialStatus['IN_HOSPITAL'] = 3;
  }

  isInHospital() {
    return this.specialStatus.hasOwnProperty('IN_HOSPITAL');
  }

  isInPrison() {
    return this.specialStatus.hasOwnProperty('IN_PRISON');
  }

  hasEvisu() {
    return this.specialStatus.hasOwnProperty('HAS_EVISU');
  }

  prisoned() {
    this.specialStatus['IN_PRISON'] = 2;
  }

  evisu() {
    this.specialStatus['HAS_EVISU'] = 5;
  }

  execute(command) {
    this.command = command;
    this.status = command.execute(this);
  }

  respond(response) {
    this.status = this.command.respond(response);
  }
}

module.exports = Player;

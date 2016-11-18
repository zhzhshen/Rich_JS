class Player {
  constructor(map, money) {
    this.map = map;
    this.money = money;
    this.status = 'WAIT_FOR_COMMAND';
    this.specialStatus = {};
    this.items = [];
    this.point = 200;
  }

  get items() {
    return this._items;
  }

  set items(items) {
    this._items = items;
  }

  gainItem(item) {
    this._items.push(item);
  }

  get point () {
    return this._point;
  }

  set point(point) {
    this._point = point;
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

  buyItem(item) {
    if (this.point >= item.point) {
      this.point -= item.point;
      this.gainItem(item);
    }
    return 'TURN_END';
  }

  hasPointForCheapest() {
    if (this.point >= 30) {
      return true;
    } else {
      return false;
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

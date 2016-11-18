let BuyEstateCommand = require(path.join(__dirname, 'buy_estate_command'));
let BuildEstateCommand = require(path.join(__dirname, 'build_estate_command'));

class Estate {
  constructor(position, price) {
    this.position = position;
    this.price = price;
    this.level = 0;
  }

  get level() {
    return this._level;
  }

  set level(level) {
    this._level = level;
  }

  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;
  }

  get price() {
    return this._price;
  }

  set price(price) {
    this._price = price;
  }

  get owner() {
    return this._owner;
  }

  set owner(owner) {
    this._owner = owner;
  }

  build() {
    if (this.level == 3) {
      return false;
    } else {
      this.level += 1;
      return true;
    }
  }

  sellTo(player) {
    this.owner = player;
  }

  visitBy(player) {
    if (this.owner == null) {
      return new BuyEstateCommand().execute(player);
    } else if (this.owner != player) {
      if (player.money >= this.price) {
        player.money -= this.price;
        this.owner.money += this.price;
      } else {
        player.gameOver();
        this.owner.money += player.money;
      }
      return 'TURN_END';
    } else {
      return new BuildEstateCommand().execute(player);
    }
  }
}

module.exports = Estate;

class Estate {
  constructor(position, price) {
    this.position = position;
    this.price = price;
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

  sellTo(player) {
    this.owner = player;
  }
}

module.exports = Estate;

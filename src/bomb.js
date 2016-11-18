class Bomb {
  constructor() {
    this.point = 50;
  }

  get point() {
    return this._point;
  }

  set point(point) {
    this._point = point;
  }
}

module.exports = Bomb;

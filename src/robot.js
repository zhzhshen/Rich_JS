class Robot {
  constructor() {
    this.point = 30;
  }

  get point() {
    return this._point;
  }

  set point(point) {
    this._point = point;
  }
}

module.exports = Robot;

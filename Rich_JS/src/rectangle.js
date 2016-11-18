class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get area() {
    return this.width * this.height;
  }

  get circumference() {
    return 2 * this.width + 2 * this.height;
  }
}

module.exports = Rectangle;

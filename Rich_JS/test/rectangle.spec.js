let chai = require('chai');
chai.should();

path = require('path');
let Rectangle = require(path.join(__dirname, '../src', 'rectangle'));
// Tell chai that we'll be using the "should" style assertions.

describe('Rectangle', () => {
  describe('#width', () => {
    let rectangle;

    beforeEach(() => {
      // Create a new Rectangle object before every test.
      rectangle = new Rectangle(10, 20);
    });

    it('returns the width', () => {
      // This will fail if "rectangle.width" does
      // not equal 10.
      rectangle.width.should.equal(10);
    });

    it('can be changed', () => {
      // Assert that the width can be changed.
      rectangle.width = 30;
      rectangle.width.should.equal(30);
    });
  })
});

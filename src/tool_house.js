let BuyToolCommand = require(path.join(__dirname, 'buy_tool_command'));

class ToolHouse {
  constructor(position) {
    this.position = position;
  }

  visitBy(player) {
    return new BuyToolCommand().execute(player);
  }
}

module.exports = ToolHouse;

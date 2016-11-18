let chai = require('chai');
chai.should();

path = require('path');
let Player = require(path.join(__dirname, '../src', 'player'));
let RollCommand = require(path.join(__dirname, '../src', 'roll_command'));
let GameMap = require(path.join(__dirname, '../src', 'game_map'));
let Estate = require(path.join(__dirname, '../src', 'estate'));
let Dice = require(path.join(__dirname, '../src', 'dice'));

describe('RollCommand', ()=>{
  describe('#execute', ()=>{
    beforeEach(() => {
        dice = new Dice();
        dice.roll = () => 1;
        map = new GameMap();
        player = new Player(map, 1000);
        estate = new Estate(1, 200);

        map.move = () => estate;
        command = new RollCommand(dice);

        player.status.should.equal('WAIT_FOR_COMMAND');
    });

    it('should move player to empty estate and wait for response', () => {
      player.execute(command);

      player.status.should.equal('WAIT_FOR_RESPONSE');
      player.currentPlace.should.equal(estate);
    });
  });

  describe('#respond', ()=>{
    beforeEach(() => {
        dice = new Dice();
        dice.roll = () => 1;
        map = new GameMap();
        player = new Player(map, 1000);
        estate = new Estate(1, 200);

        map.move = () => estate;
        command = new RollCommand(dice);

        player.status.should.equal('WAIT_FOR_COMMAND');

        player.execute(command);

        player.status.should.equal('WAIT_FOR_RESPONSE');
        player.currentPlace.should.equal(estate);
    });

    it('should turn end if player respond no', () => {
      player.respond('n');
    });

    it('should success to buy estate if player respond yes with enough money', () => {
      player.respond('y');

      player.money.should.equal(800);
      estate.owner.should.equal(player);
    });

    it('should fail to buy estate if player respond yes without enough money', () => {
      player.money = 100;
      player.respond('y');

      player.money.should.equal(100);
      (estate.owner==null).should.equal(true);
    });

    afterEach(() => {
      player.status.should.equal('TURN_END');
      player.currentPlace.should.equal(estate);
    });
  });
});

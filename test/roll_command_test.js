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
    });

    it('should move player to others level 0 estate and turn end pay half estate price', () => {
      other = new Player(map, 1000)
      estate.owner = other;

      player.execute(command);

      player.money.should.equal(900);
      other.money.should.equal(1100);
      player.status.should.equal('TURN_END');
    });

    it('should move player to others level 3 estate and turn end pay four times estate price', () => {
      other = new Player(map, 1000)
      estate.level = 3;
      estate.owner = other;

      player.execute(command);

      player.money.should.equal(200);
      other.money.should.equal(1800);
      player.status.should.equal('TURN_END');
    });

    it('should move player to own estate and wait for response', () => {
      estate.owner = player;

      player.execute(command);

      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    afterEach(() => {
      player.currentPlace.should.equal(estate);
    });
  });

  describe('#respond to buy estate', ()=>{
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

  describe('#respond to build estate', ()=>{
    beforeEach(() => {
        dice = new Dice();
        dice.roll = () => 1;
        map = new GameMap();
        player = new Player(map, 1000);
        estate = new Estate(1, 200);
        estate.owner = player;

        map.move = () => estate;
        command = new RollCommand(dice);

        player.status.should.equal('WAIT_FOR_COMMAND');

        player.execute(command);

        player.status.should.equal('WAIT_FOR_RESPONSE');
        player.currentPlace.should.equal(estate);
    });

    it('should turn end if player respond no', () => {
      player.respond('n');

      estate.level.should.equal(0);
    });

    it('should success to build estate if player respond yes with enough money', () => {
      player.respond('y');

      player.money.should.equal(800);
      estate.level.should.equal(1);
    });

    it('should fail to build estate if player respond yes without enough money', () => {
      player.money = 100;
      player.respond('y');

      player.money.should.equal(100);
      estate.level.should.equal(0);
    });

    it('should fail to build estate if player respond yes max level', () => {
      estate.level = 3;
      player.respond('y');

      player.money.should.equal(1000);
      estate.level.should.equal(3);
    });

    afterEach(() => {
      player.status.should.equal('TURN_END');
    });
  });
});

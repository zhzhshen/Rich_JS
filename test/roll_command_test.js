let chai = require('chai');
chai.should();

path = require('path');
let Player = require(path.join(__dirname, '../src', 'player'));
let RollCommand = require(path.join(__dirname, '../src', 'roll_command'));
let GameMap = require(path.join(__dirname, '../src', 'game_map'));
let Estate = require(path.join(__dirname, '../src', 'estate'));
let StartingPoint = require(path.join(__dirname, '../src', 'starting_point'));
let Hospital = require(path.join(__dirname, '../src', 'hospital'));
let MagicHouse = require(path.join(__dirname, '../src', 'magic_house'));
let ToolHouse = require(path.join(__dirname, '../src', 'tool_house'));
let GiftHouse = require(path.join(__dirname, '../src', 'gift_house'));
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

    it('should move player to others estate and not pay if owner in hospital', () => {
      other = new Player(map, 1000)
      other.burn();
      estate.owner = other;

      player.execute(command);

      player.money.should.equal(1000);
      other.money.should.equal(1000);
      player.status.should.equal('TURN_END');
    });

    it('should move player to others estate and not pay if owner in prison', () => {
      other = new Player(map, 1000)
      other.prisoned();
      estate.owner = other;

      player.execute(command);

      player.money.should.equal(1000);
      other.money.should.equal(1000);
      player.status.should.equal('TURN_END');
    });

    it('should move player to others estate and not pay if player has evisu', () => {
      other = new Player(map, 1000)
      estate.owner = other;
      player.evisu();

      player.execute(command);

      player.money.should.equal(1000);
      other.money.should.equal(1000);
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

  describe('#execute', ()=>{
    beforeEach(() => {
        dice = new Dice();
        dice.roll = () => 1;
        map = new GameMap();
        player = new Player(map, 1000);
    });

    it('should move player to starting point and turn end', () => {
      startingPoint = new StartingPoint(1);
      map.move = () => startingPoint;
      command = new RollCommand(dice);

      player.execute(command);

      player.status.should.equal('TURN_END');
    });

    it('should move player to magic house and turn end', () => {
      magicHouse = new MagicHouse(1);
      map.move = () => magicHouse;
      command = new RollCommand(dice);

      player.execute(command);

      player.status.should.equal('TURN_END');
    });

    it('should move player to hospital and turn end', () => {
      hospital = new Hospital(1);
      map.move = () => hospital;
      command = new RollCommand(dice);

      player.execute(command);

      player.status.should.equal('TURN_END');
    });

  });

  describe('#execute', ()=>{
    beforeEach(() => {
        dice = new Dice();
        dice.roll = () => 1;
        map = new GameMap();
        player = new Player(map, 1000);

        toolHouse = new ToolHouse(1);
        map.move = () => toolHouse;
        command = new RollCommand(dice);
        player.execute(command);
    });

    it('should move player to tool house and wait for response', () => {
      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    it('should player buy block when respond 1', () => {
      player.respond(1);

      player.items.length.should.equal(1);
      player.point.should.equal(150);
      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    it('should player fail to buy block when respond 1 without enough point', () => {
      player.point = 30;
      player.respond(1);

      player.items.length.should.equal(0);
      player.point.should.equal(30);
      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    it('should player buy robot when respond 2', () => {
      player.respond(2);

      player.items.length.should.equal(1);
      player.point.should.equal(170);
      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    it('should player fail to buy robot and turn end when respond 2 without enough point', () => {
      player.point = 20;
      player.respond(2);

      player.items.length.should.equal(0);
      player.point.should.equal(20);
      player.status.should.equal('TURN_END');
    });

    it('should player buy robot when respond 3', () => {
      player.respond(3);

      player.items.length.should.equal(1);
      player.point.should.equal(150);
      player.status.should.equal('WAIT_FOR_RESPONSE');

      player.respond(2);

      player.items.length.should.equal(2);
      player.point.should.equal(120);
      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    it('should player fail to buy robot and turn end when respond 2 without enough point', () => {
      player.point = 30;
      player.respond(3);

      player.items.length.should.equal(0);
      player.point.should.equal(30);
      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    it('should player fail to buy and turn end when respond anything other than 1,2,3', () => {
      player.respond('y');

      player.items.length.should.equal(0);
      player.point.should.equal(200);
      player.status.should.equal('TURN_END');
    });
  });

  describe('#execute', ()=>{
    beforeEach(() => {
        dice = new Dice();
        dice.roll = () => 1;
        map = new GameMap();
        player = new Player(map, 1000);

        giftHouse = new GiftHouse(1);
        map.move = () => giftHouse;
        command = new RollCommand(dice);
        player.execute(command);
    });

    it('should move player to gift house and wait for response', () => {
      player.status.should.equal('WAIT_FOR_RESPONSE');
    });

    it('should player quit when respond anything other than 1,2,3', () => {
      player.respond('n');

      player.items.length.should.equal(0);
      player.point.should.equal(200);
      player.money.should.equal(1000);
    });

    it('should player gain money when respond 1', () => {
      player.respond('1');

      player.point.should.equal(200);
      player.money.should.equal(3000);
    });

    it('should player gain point when respond 2', () => {
      player.respond('2');

      player.items.length.should.equal(0);
      player.point.should.equal(400);
      player.money.should.equal(1000);
    });

    it('should player have evisu when respond 3', () => {
      player.respond('3');

      player.hasEvisu().should.equal(true);
      player.point.should.equal(200);
      player.money.should.equal(1000);
    });

    // afterEach(()=> {
    //   player.status.should.equal('TURN_END');
    // });

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

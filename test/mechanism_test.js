let chai = require('chai');
chai.should();

path = require('path');
let Player = require(path.join(__dirname, '../src', 'player'));
let Command = require(path.join(__dirname, '../src', 'command'));

describe('Player', () => {
    describe('#execute', () => {
      beforeEach(() => {
          player = new Player();
          command = new Command();
          player.status.should.equal('WAIT_FOR_COMMAND');
      });

      it('responsiveness command should turn end', () => {
        command.execute = () => 'TURN_END';

        player.execute(command);

        player.status.should.equal('TURN_END');
      });

      it('responsive command should wait for response', () => {
        command.execute = () => 'WAIT_FOR_RESPONSE';

        player.execute(command);

        player.status.should.equal('WAIT_FOR_RESPONSE');
      });

      it('responsiveness command should wait for command', () => {
        command.execute = () => 'WAIT_FOR_COMMAND';

        player.execute(command);

        player.status.should.equal('WAIT_FOR_COMMAND');
      });
    });

    describe('#respond', () => {
      beforeEach(() => {
          player = new Player();
          command = new Command();
          player.status.should.equal('WAIT_FOR_COMMAND');
          command.execute = () => 'WAIT_FOR_RESPONSE';
          player.execute(command);
          player.status.should.equal('WAIT_FOR_RESPONSE');
      });

      it('then should turn end', () => {
        command.respond = () => 'TURN_END';

        player.respond('');

        player.status.should.equal('TURN_END');
      });
    })
});

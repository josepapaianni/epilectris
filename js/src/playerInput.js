/**
 * Created by luna on 10/09/15.
 */

var Input = function (game) {

    this.game = game;

    this.keys = ["up", "right", "down", "left", "rotateRight", "rotateLeft","hold", "place", "level", "pause","powerup"];
    this.pressedKeys = {};
    this.defaultTimeOut = 250;
    this.minTimeOut = 50;
    this.timeoutStep = 100;

    this.pressKey = function (key) {
        this.pressedKeys[key].pressed = true;
        _self = this;
        setTimeout(function (keyPressed) {
            _self.pressedKeys[keyPressed].pressed = false;
        }, this.pressedKeys[key].timeout, key);
        if (this.pressedKeys[key].timeout > this.minTimeOut) {
            this.pressedKeys[key].timeout -= this.timeoutStep;
        }
    };


    this.getDirectionWithAngle = function (direction, angle) {
        var index = keys.indexOf(direction);
        if (index > 3) {
            return direction;
        } else {
            var offset = index - (angle / 90);
            if (offset < 0) {
                offset += 4;
            } else if (offset > 3) {
                offset -= 4;
            }
            return keys[offset] != "up" ? keys[offset] : "rotateRight";
        }
    };

    this.setupInput = function (wasd) {
        game.input.gamepad.start();

        // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4;

        if (wasd) {
            game.pad = game.input.gamepad.pad2;
            game.padKeys = {
                up: Phaser.Gamepad.XBOX360_STICK_LEFT_Y,
                right: Phaser.Gamepad.XBOX360_STICK_LEFT_X,
                left: Phaser.Gamepad.XBOX360_STICK_LEFT_X,
                down: Phaser.Gamepad.XBOX360_STICK_LEFT_Y,
                rotateRight: Phaser.Gamepad.XBOX360_RIGHT_TRIGGER,
                rotateLeft: Phaser.Gamepad.XBOX360_LEFT_TRIGGER,
                place: Phaser.Gamepad.XBOX360_A,
                hold: Phaser.Gamepad.XBOX360_B,
                level: Phaser.Gamepad.XBOX360_RIGHT_BUMPER,
                pause: Phaser.Gamepad.XBOX360_START,
                powerup: Phaser.Gamepad.XBOX360_X
            }
            this.game.cursors = this.game.input.keyboard.createCursorKeys();
            this.game.cursors.rotateRight = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.game.cursors.rotateLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
            this.game.cursors.place = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.cursors.hold = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
            this.game.cursors.level = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
            this.game.cursors.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
            this.game.cursors.powerup = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        } else {
            game.pad = game.input.gamepad.pad1;
            game.padKeys = {
                up: Phaser.Gamepad.XBOX360_STICK_LEFT_Y,
                right: Phaser.Gamepad.XBOX360_STICK_LEFT_X,
                down: Phaser.Gamepad.XBOX360_STICK_LEFT_Y,
                left: Phaser.Gamepad.XBOX360_STICK_LEFT_X,
                rotateRight: Phaser.Gamepad.XBOX360_RIGHT_TRIGGER,
                rotateLeft: Phaser.Gamepad.XBOX360_LEFT_TRIGGER,
                hold: Phaser.Gamepad.XBOX360_Y,
                place: Phaser.Gamepad.XBOX360_A,
                level: Phaser.Gamepad.XBOX360_RIGHT_BUMPER,
                pause: Phaser.Gamepad.XBOX360_START,
                powerup: Phaser.Gamepad.XBOX360_X
            }
            this.game.cursors = {
                up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
                rotateRight: this.game.input.keyboard.addKey(Phaser.Keyboard.K),
                rotateLeft: this.game.input.keyboard.addKey(Phaser.Keyboard.J),
                hold: this.game.input.keyboard.addKey(Phaser.Keyboard.L),
                place: this.game.input.keyboard.addKey(Phaser.Keyboard.Q),
                level: this.game.input.keyboard.addKey(Phaser.Keyboard.O),
                pause: this.game.input.keyboard.addKey(Phaser.Keyboard.P),
                powerup: this.game.input.keyboard.addKey(Phaser.Keyboard.E)
            }
        }
        this.releaseAllKeys();

    };


    this.releaseAllKeys = function () {
        _self = this;
        _.each(this.keys, function (key) {
            _self.pressedKeys[key] = {
                pressed: false,
                timeout: _self.defaultTimeOut
            }
        });
    };

    this.lockAllKeys = function () {
        _self = this;
        _.each(this.keys, function (key) {
            _self.pressedKeys[key] = {
                pressed: true,
                timeout: _self.defaultTimeOut
            }
        });
        setTimeout(function () {
            _self = this;
            _.each(this.keys, function (key) {
                _self.pressedKeys[key] = {
                    pressed: false,
                    timeout: _self.defaultTimeOut
                }
            });
        }, timeoutStep);
    };

    this.setupInput(this.game.playerId == "player-2");
}
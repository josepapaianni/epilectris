/**
 * Created by luna on 10/09/15.
 */

var Input = function (game) {

    this.game = game;

    this.keys = ["up", "right", "down", "left", "rotateRight", "rotateLeft", "place", "level", "hold", "pause"];
    this.pressedKeys = {};
    this.defaultTimeOut = 250;
    this.minTimeOut = 50;
    this.timeoutStep = 100;

    this.pressKey = function (key) {
        this.pressedKeys[key].pressed = true;
        _self = this
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

    this.setupInput = function (wasd, game) {
        if (game.id >= 4) {
            game.cursors = game.input.keyboard.createCursorKeys();
            game.cursors.rotateRight = game.input.keyboard.addKey(Phaser.Keyboard.X);
            game.cursors.rotateLeft = game.input.keyboard.addKey(Phaser.Keyboard.Z);
            game.cursors.place = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            game.cursors.hold = game.input.keyboard.addKey(Phaser.Keyboard.C);
            game.cursors.level = game.input.keyboard.addKey(Phaser.Keyboard.O);
            game.cursors.pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
        } else {
            game.cursors = {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D),
                rotateRight: game.input.keyboard.addKey(Phaser.Keyboard.K),
                rotateLeft: game.input.keyboard.addKey(Phaser.Keyboard.J),
                place: game.input.keyboard.addKey(Phaser.Keyboard.Q),
                hold: game.input.keyboard.addKey(Phaser.Keyboard.L),
                level: game.input.keyboard.addKey(Phaser.Keyboard.O),
                pause: game.input.keyboard.addKey(Phaser.Keyboard.P)
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
}
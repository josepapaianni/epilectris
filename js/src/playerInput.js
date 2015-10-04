/**
 * Created by luna on 10/09/15.
 */
var keys = ["up","right","down","left","rotateRight","rotateLeft","place","level","hold","pause"];
var pressedKeys = {};
var defaultTimeOut = 250;
var minTimeOut = 50;
var timeoutStep = 100;
function pressKey(key){
    pressedKeys[key].pressed = true;
    setTimeout(function(keyPressed){
        pressedKeys[keyPressed].pressed = false;
    },pressedKeys[key].timeout,key);
    if (pressedKeys[key].timeout > minTimeOut){
        pressedKeys[key].timeout -= timeoutStep;
    }
}


function getDirectionWithAngle(direction,angle){
    var index = keys.indexOf(direction);
    if (index > 3) {
        return direction;
    } else {
        var offset = index-(angle/90);
        if (offset < 0){
            offset+=4;
        } else if (offset > 3){
            offset-=4;
        }
        return keys[offset] != "up" ? keys[offset] : "rotateRight";
    }
}

function setupInput(wasd, game){
    if (!wasd){
        cursors = game.input.keyboard.createCursorKeys();
        cursors.rotateRight = game.input.keyboard.addKey(Phaser.Keyboard.X);
        cursors.rotateLeft = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        cursors.place = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors.hold = game.input.keyboard.addKey(Phaser.Keyboard.C);
        cursors.level = game.input.keyboard.addKey(Phaser.Keyboard.O);
        cursors.pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
    } else {
        cursors = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.K),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            rotateRight: game.input.keyboard.addKey(Phaser.Keyboard.K),
            rotateLeft: game.input.keyboard.addKey(Phaser.Keyboard.J),
            place: game.input.keyboard.addKey(Phaser.Keyboard.W),
            hold: game.input.keyboard.addKey(Phaser.Keyboard.L),
            level: game.input.keyboard.addKey(Phaser.Keyboard.O),
            pause: game.input.keyboard.addKey(Phaser.Keyboard.P)
        }
    }
    releaseAllKeys();

}

function releaseAllKeys(){
    _.each(keys,function(key){
        pressedKeys[key] = {
            pressed: false,
            timeout: defaultTimeOut
        }
    });
}

function lockAllKeys(){
    _.each(keys,function(key){
        pressedKeys[key] = {
            pressed: true,
            timeout: defaultTimeOut
        }
    });
    setTimeout(function(){
        _.each(keys,function(key){
            pressedKeys[key] = {
                pressed: false,
                timeout: defaultTimeOut
            }
        });
    },timeoutStep);
}
/**
 * Created by luna on 9/29/15.
 */
var GameState = function (game) {
  this.game = game;

  this.create = function () {
    var game = this.game;
    this.input = new Input(game);
    var backgroundImage = this.game.add.sprite(0, 0, 'backgroundImage');
    game.stage.backgroundColor = '#000000';
    //pauseWindow = game.add.sprite(0,0,"stageShadow");
    //pauseWindow.alpha = 0.8;
    //pauseWindow.visible = false;
    //game.preloaderIcon = { font: "FontAwesome",fontSize:150, fill: "#FFFFFF", align: "center" };
    //game.preloaderIcon = game.add.text(game.world.centerX, game.world.centerY-150,"",game.powerUpIconStyle);
    //game.preloaderIcon.anchor.set(0.5);
    //game.preloaderIcon.text = String.fromCharCode('0xf021');
    //game.preloaderIcon.scale.set(0);
    game.grids = game.add.group();
    currentLevel = 0;
    currentTier = 0;

    levelConfig = levels[currentTier];
    currentSpeed = levelConfig.speed;
    shakeWorld = 0;
    counter = 0;

    angleStep = 5;

    game.currentTetris = 0;


    game.tetrises = [
      new Tetris(this.game.world.centerX, this.game.height - gridSize / 2, 0, game),
    ];
    game.tetrises[game.currentTetris].startTimeOut();
    //if (game.id != 0){
    game.paused = true;

  };

  this.update = function (game) {

    //filter.update();
    var tetris = game.tetrises[game.currentTetris];
    //if (this.game.pad.justPressed(Phaser.Gamepad.XBOX360_X)){
    //  console.log('button x')
    //}
    //if (this.game.pad.justPressed(Phaser.Gamepad.XBOX360_A)){
    //  console.log('button a')
    //}
    //
    //if (this.game.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1){
    //  console.log('directional Y')
    //}
    //
    //if (this.game.pad.justPressed(Phaser.Gamepad.XBOX360_STICK_LEFT_X)){
    //  console.log('directional X')
    //}

    if (!this.game.paused && !tetris.paused) {
      _.each(this.input.keys, function (direction) {
        var actualDirection = direction == "up" ? "rotateRight" : direction;
        var isDir = this.input.keys.indexOf(actualDirection) < 4;
        //var actualDirection = getDirectionWithAngle(direction,tetris.angle);
        if (!this.input.pressedKeys[direction].pressed &&
          (this.game.cursors[direction].isDown || (this.game.pad.justPressed(this.game.padKeys[direction]) && !isDir ) || (this.game.pad.axis(this.game.padKeys[direction]) && isDir))) {
          if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.game.pad.connected && this.game.pad.axis(this.game.padKeys[direction])){
            console.log(this.game.pad.axis(this.game.padKeys[direction]), direction);
            if (this.game.pad.axis(this.game.padKeys[direction]) <= -0.1 && direction == "down"){
              //console.log('asd');
              //this.input.pressKey(direction);
              tetris.movePiece('rotateRight');
            } else if (this.game.pad.axis(this.game.padKeys[direction]) > 0.1 && direction == "down") {
              this.input.pressKey(direction);
              tetris.movePiece('down');
            } else if (this.game.pad.axis(this.game.padKeys[direction]) < -0.1 && direction == "left"){
              console.log('left')
              this.input.pressKey(direction);
              tetris.movePiece('left');
            } else if (this.game.pad.axis(this.game.padKeys[direction]) > 0.1 && direction == "right"){
              this.input.pressKey(direction);
              tetris.movePiece('right');
            }
            this.input.pressedKeys[direction].pressed = true;
          } else if (isDir) {
            this.input.pressKey(direction);
            tetris.movePiece(actualDirection);
          } else {
            this.input.pressedKeys[direction].pressed = true;
            tetris.movePiece(actualDirection);
          }
        }
        if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.game.pad.connected){
          if (this.game.cursors[direction].isUp && this.game.pad.isUp(this.game.padKeys[direction]) && this.game.pad.axis(this.game.padKeys[direction]) == 0) {
            this.input.pressedKeys[direction].pressed = false;
            this.input.pressedKeys[direction].timeout = this.input.defaultTimeOut;
          }
        } else {
          if (this.game.cursors[direction].isUp) {
            this.input.pressedKeys[direction].pressed = false;
            this.input.pressedKeys[direction].timeout = this.input.defaultTimeOut;
          }
        }
       }, this);


      if (levelConfig.continuousRotation) {
        angleStep = 1;
        _.each(tetrises, function (tetris) {
          tetris.changeAngle();
        });
      }

      //pressed = _.find(keys,function(key){
      //    return cursors[key].isDown;
      //}) != null;
      if (shakeWorld > 0) {
        var rand1 = this.game.rnd.integerInRange(-3, 3);
        var rand2 = this.game.rnd.integerInRange(-3, 3);
        this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
        shakeWorld--;
        if (shakeWorld == 0) {
          this.game.world.setBounds(0, 0, this.game.width, this.game.height); // normalize after shake?
        }
      }
    }

  };

  this.changeTetris2 = function (game) {
    game.currentTetris = (game.currentTetris + 1) % game.tetrises.length;
    game.tetrises[game.currentTetris].startTimeOut();
  };

  this.changeTetris = function (game) {
    //lockAllKeys();
    //if (levelConfig.changeAngle || !(game.tetrises[game.currentTetris].angle%45==0)) {
    //    _.each(game.tetrises, function (tetris) {
    //        tetris.changeAngle();
    //    });
    //}
    //if (levelConfig.continuousRotation || levelConfig.changeStageAngle && (tetrises[currentTetris].angle%levelConfig.changeStageAngle)==0){
    //    var prev = currentTetris;
    //    if (levelConfig.nextTetrisRandom){
    //        currentTetris = this.game.rnd.integerInRange(0,tetrises.length-1);
    //    } else {
    //        currentTetris = (currentTetris+1)%tetrises.length;
    //    }
    //    if (tetrises[currentTetris].angle != 0 && tetrises.length < levelConfig.maxStages && tetrises[prev].angle==(360-levelConfig.changeStageAngle)){
    //        tetrises.splice(currentTetris, 0, new Tetris(this.game.world.centerX,this.game.world.centerY,0));
    //    }
    //}
    if (counter % 5 == 0) {
      game.currentTetris = (game.currentTetris + 1) % game.tetrises.length;
    }
    game.tetrises[game.currentTetris].startTimeOut();
    counter++;
  };

  this.setScore = function (point) {
    //score.addScore(point);
    //linesLeft.addScore(-point);
    shakeWorld = 10;
    //if (linesLeft.score < 0){
    //    this.changeLevel();
    //}
  };

  this.changeLevel = function () {
    currentLevel++;
    if (currentLevel > levelConfig.maxLevels) {
      currentLevel = 0;
      currentTier++;
      levelConfig = levels[currentTier];
      currentSpeed = levelConfig.speed;
    } else {
      currentSpeed -= 250;
    }
    linesLeft.setScore(levelConfig.toNextLevel);
  };

  this.render = function () {
    //this.game.debug.text('Position  : ' + tetris.current.position.i+" "+tetris.current.position.j, 16, 24);

    //for (var i=0;i<tetrises[currentTetris].grid.matrix[0].length;i++){
    //    for (var j=0;j<tetrises[currentTetris].grid.matrix.length;j++){
    //        this.game.debug.text(tetrises[currentTetris].grid.matrix[j][i] instanceof Phaser.Sprite ? 1 : tetrises[currentTetris].grid.matrix[j][i], i*30, 55+j*20);
    //    }
    //}
  }

};
/**
 * Created by luna on 9/29/15.
 */

var gameState = {

    create: function() {

        setupInput();
        //filter = new Filter();
        pauseWindow = game.add.sprite(0,0,"stageShadow");
        pauseWindow.alpha = 0.8;
        pauseWindow.visible = false;

        randomGenerator = new RandomTetrisGenerator(game.width-80,80);
        hold = new PieceHold(80,80);
        score = new ScoreDisplay(80,game.height-80);
        linesLeft = new ScoreDisplay(game.width-80,game.height-80);
        grids = game.add.group();
        currentLevel = 0;
        currentTier = 0;

        levelConfig = levels[currentTier];
        currentSpeed = levelConfig.speed;
        shakeWorld = 0;
        counter = 0;
        tetrises = [new Tetris(game.world.centerX,game.world.centerY,0)];
        angleStep = 5;
        currentTetris = 0;
        tetrises[currentTetris].startTimeOut();


        //for (var i=0;i<5;i++){
        //    var controlDisplay = game.add.sprite(game.width-80,game.world.centerY - (70*2.5) + i*70 +35,"controlDisplay");
        //    controlDisplay.anchor.set(0.5,0.5);
        //}
        //for (var i=0;i<4;i++){
        //    var controlDisplay = game.add.sprite(80,game.world.centerY - (70*2.5) + i*70 +35,"controlDisplay");
        //    controlDisplay.anchor.set(0.5,0.5);
        //}

        var style = { font: "Orbitron",fontSize:20, fill: "#991b1e", align: "center" };
        var credits = game.add.text(game.world.centerX,game.height-15,"developed by: LunaFromTheMoon",style);
        credits.anchor.set(0.5,0.5);

        var credits = game.add.text(game.world.centerX,game.height*2/3,"CONTROLS \n ⇦⇩⇨ move \n Z rotate left - ⇧ X rotate right \n C hold - SPACEBAR drop \n P pause - L cheat",style);
        credits.anchor.set(0.5,0.5);
        game.add.tween(credits).to({alpha:0},3000,Phaser.Easing.Default,true,2500);

        game.input.onDown.add(this.unPauseGame,this);
    },

    pauseGame: function(){
        game.paused = true;
        pauseWindow.visible = true;
        pauseWindow.bringToTop();
    },

    unPauseGame: function(){
        if (game.paused){
            game.paused = false;
            pauseWindow.visible = false;
        }
    },

    update: function() {
        //filter.update();
        var tetris = tetrises[currentTetris];
        _.each(keys, function(direction){

            var actualDirection = direction == "up" ? "rotateRight" : direction;
            var isDir = keys.indexOf(actualDirection) < 4;
            //var actualDirection = getDirectionWithAngle(direction,tetris.angle);
            if (!pressedKeys[direction].pressed && cursors[direction].isDown) {
                if (isDir){
                    pressKey(direction);
                } else {
                    pressedKeys[direction].pressed = true;
                }
                if (direction == "level"){
                    this.changeLevel();
                    console.log("Level "+currentLevel);
                } else if (direction == "pause") {
                    this.pauseGame();
                } else {
                    tetris.movePiece(actualDirection);
                }
            }
            if (cursors[direction].isUp){
                pressedKeys[direction].pressed = false;
                pressedKeys[direction].timeout = defaultTimeOut;
            }
        },this);
        if (levelConfig.continuousRotation){
            angleStep = 1;
            _.each(tetrises, function (tetris) {
                tetris.changeAngle();
            });
        }

        //pressed = _.find(keys,function(key){
        //    return cursors[key].isDown;
        //}) != null;
        if (shakeWorld > 0) {
            var rand1 = game.rnd.integerInRange(-3,3);
            var rand2 = game.rnd.integerInRange(-3,3);
            game.world.setBounds(rand1, rand2, game.width + rand1, game.height + rand2);
            shakeWorld--;
            if (shakeWorld == 0) {
                game.world.setBounds(0, 0, game.width,game.height); // normalize after shake?
            }
        }

    },

    changeTetris: function(){
        //lockAllKeys();
        if (levelConfig.changeAngle || !(tetrises[currentTetris].angle%45==0)) {
            _.each(tetrises, function (tetris) {
                tetris.changeAngle();
            });
        }
        if (levelConfig.continuousRotation || levelConfig.changeStageAngle && (tetrises[currentTetris].angle%levelConfig.changeStageAngle)==0){
            var prev = currentTetris;
            if (levelConfig.nextTetrisRandom){
                currentTetris = game.rnd.integerInRange(0,tetrises.length-1);
            } else {
                currentTetris = (currentTetris+1)%tetrises.length;
            }
            if (tetrises[currentTetris].angle != 0 && tetrises.length < levelConfig.maxStages && tetrises[prev].angle==(360-levelConfig.changeStageAngle)){
                tetrises.splice(currentTetris, 0, new Tetris(game.world.centerX,game.world.centerY,0));
            }
        }
        tetrises[currentTetris].startTimeOut();
        counter++;
    },

    setScore: function(point){
        score.addScore(point);
        linesLeft.addScore(-point);
        shakeWorld = 10;
        if (linesLeft.score < 0){
            this.changeLevel();
        }
    },

    changeLevel: function(){
        currentLevel++;
        if (currentLevel > levelConfig.maxLevels){
            currentLevel = 0;
            currentTier++;
            levelConfig = levels[currentTier];
            currentSpeed = levelConfig.speed;
        } else {
            currentSpeed -= 250;
        }
        linesLeft.setScore(levelConfig.toNextLevel);
    },

    render: function(){
        //game.debug.text('Position  : ' + tetris.current.position.i+" "+tetris.current.position.j, 16, 24);

        //for (var i=0;i<tetrises[currentTetris].grid.matrix[0].length;i++){
        //    for (var j=0;j<tetrises[currentTetris].grid.matrix.length;j++){
        //        game.debug.text(tetrises[currentTetris].grid.matrix[j][i] instanceof Phaser.Sprite ? 1 : tetrises[currentTetris].grid.matrix[j][i], i*30, 55+j*20);
        //    }
        //}
    }

};
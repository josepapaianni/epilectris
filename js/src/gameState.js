/**
 * Created by luna on 9/29/15.
 */
var gameState = {

    create: function() {
        setupInput(null, this.game);
        var game = this.game;
        var backgroundImage = this.game.add.sprite(0,0,'backgroundImage');
        game.stage.backgroundColor = '#000000'
        //filter = new Filter();
        pauseWindow = game.add.sprite(0,0,"stageShadow");
        pauseWindow.alpha = 0.8;
        pauseWindow.visible = false;
        //hold = new PieceHold(80,80, this.game);
        //score = new ScoreDisplay(80,this.game.height-80, this.game);
        //linesLeft = new ScoreDisplay(this.game.width-80,this.game.height-80,this.game);
        game.grids = game.add.group();
        currentLevel = 0;
        currentTier = 0;

        levelConfig = levels[currentTier];
        currentSpeed = levelConfig.speed;
        shakeWorld = 0;
        counter = 0;

        angleStep = 5;

        game.currentTetris = 0;

        game.randomGenerator = new RandomTetrisGenerator(this.game.width-80,80,game);
        game.tetrises = [new Tetris(this.game.world.centerX,this.game.height-gridSize/2,0,game)];
        game.tetrises[game.currentTetris].startTimeOut();

        if (this.game.id != gamesManager.activeGame) {
            this.game.paused = true;
        }


        //for (var i=0;i<5;i++){
        //    var controlDisplay = this.game.add.sprite(this.game.width-80,this.game.world.centerY - (70*2.5) + i*70 +35,"controlDisplay");
        //    controlDisplay.anchor.set(0.5,0.5);
        //}
        //for (var i=0;i<4;i++){
        //    var controlDisplay = this.game.add.sprite(80,this.game.world.centerY - (70*2.5) + i*70 +35,"controlDisplay");
        //    controlDisplay.anchor.set(0.5,0.5);
        //}


        //
        //var style = { font: "Orbitron",fontSize:20, fill: "#991b1e", align: "center" };
        //var credits = this.game.add.text(this.game.world.centerX,this.game.height-15,"developed by: LunaFromTheMoon",style);
        //credits.anchor.set(0.5,0.5);
        //
        //var credits = this.game.add.text(this.game.world.centerX,this.game.height*2/3,"CONTROLS \n ⇦⇩⇨ move \n Z rotate left - ⇧ X rotate right \n C hold - SPACEBAR drop \n P pause - L cheat",style);
        //credits.anchor.set(0.5,0.5);
        //this.game.add.tween(credits).to({alpha:0},3000,Phaser.Easing.Default,true,2500);

        //this.game.input.onDown.add(this.unPauseGame,this);
    },

    pauseGame: function(){
        this.game.paused = true;
        pauseWindow.visible = true;
        pauseWindow.bringToTop();
    },

    unPauseGame: function(){
        if (this.game.paused){
            this.game.paused = false;
            pauseWindow.visible = false;
        }
    },

    update: function(game) {
        //filter.update();
        var tetris = game.tetrises[game.currentTetris];

        if (gamesManager.activeGame === game.id && !tetris.paused){
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
                var rand1 = this.game.rnd.integerInRange(-3,3);
                var rand2 = this.game.rnd.integerInRange(-3,3);
                this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
                shakeWorld--;
                if (shakeWorld == 0) {
                    this.game.world.setBounds(0, 0, this.game.width,this.game.height); // normalize after shake?
                }
            }
        }

    },

    changeTetris: function(game){
        //lockAllKeys();
        if (levelConfig.changeAngle || !(game.tetrises[game.currentTetris].angle%45==0)) {
            _.each(game.tetrises, function (tetris) {
                tetris.changeAngle();
            });
        }
        if (levelConfig.continuousRotation || levelConfig.changeStageAngle && (tetrises[currentTetris].angle%levelConfig.changeStageAngle)==0){
            var prev = currentTetris;
            if (levelConfig.nextTetrisRandom){
                currentTetris = this.game.rnd.integerInRange(0,tetrises.length-1);
            } else {
                currentTetris = (currentTetris+1)%tetrises.length;
            }
            if (tetrises[currentTetris].angle != 0 && tetrises.length < levelConfig.maxStages && tetrises[prev].angle==(360-levelConfig.changeStageAngle)){
                tetrises.splice(currentTetris, 0, new Tetris(this.game.world.centerX,this.game.world.centerY,0));
            }
        }
        game.tetrises[game.currentTetris].startTimeOut();
        counter++;
    },

    setScore: function(point){
        //score.addScore(point);
        //linesLeft.addScore(-point);
        shakeWorld = 10;
        //if (linesLeft.score < 0){
        //    this.changeLevel();
        //}
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
        //this.game.debug.text('Position  : ' + tetris.current.position.i+" "+tetris.current.position.j, 16, 24);

        //for (var i=0;i<tetrises[currentTetris].grid.matrix[0].length;i++){
        //    for (var j=0;j<tetrises[currentTetris].grid.matrix.length;j++){
        //        this.game.debug.text(tetrises[currentTetris].grid.matrix[j][i] instanceof Phaser.Sprite ? 1 : tetrises[currentTetris].grid.matrix[j][i], i*30, 55+j*20);
        //    }
        //}
    }

};
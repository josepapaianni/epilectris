/**
 * Created by Luna on 9/10/15.
 */
var PlayerGamesManager = function (playerInfo) {
    this.playerInfo = playerInfo;
    this.games = [];
    this.activeGame = 0;
    this.score = 0;
    this.pieceHold = new PieceHold(this.playerInfo.playerId);
    this.pieceGenerator = new RandomTetrisGenerator(this.playerInfo.playerId);
    this.powerUpManager = new PowerUpManager(this.playerInfo.playerId);
    this.attacked = false;
    this.levelIndex = -1;
    this.currentLevel = levels[0];
    this.currentSpeed = 0;

    this.setScore = function(score){
        if (this.attacked){
            this.upsideDown();
        }
        this.linesLeft-=score*score;
        if (this.linesLeft<=0){
            this.changeLevel();
        }
        this.score+=score*score;
        var paddedScore = ("000000" + this.score).substr(-6,6);
        $("#ui-"+this.playerInfo.playerId+" .score-counter").html(paddedScore);
        var paddedLines = ("000" + this.linesLeft).substr(-3,3);
        $("#ui-"+this.playerInfo.playerId+" .lines-left-counter").html(paddedLines);

    };

    this.resetScore =function(){
        $("#ui-"+this.playerInfo.playerId+" .score-counter").html("000000");
    };

    this.changeLevel = function(){
        if (this.lastLevel){
            this.linesLeft = 50;
        } else {
            if (gamesManager.isMultiplayer()){
                this.currentSpeed -= 100;
                this.currentSpeed = Math.max(this.currentSpeed,250);
                this.linesLeft = 50;
                this.currentLevel = {};
                //give special power up
            } else {
                this.currentSpeed -= this.currentLevel.speedStep;
                if (this.currentSpeed < this.currentLevel.minSpeed){
                    this.levelIndex++;
                    console.log(this.levelIndex);
                    if (this.levelIndex == levels.length){
                        this.linesLeft = 50;
                        this.zRotation = 5;
                        this.lastLevel = true;
                        _self = this;
                        this.rotationInterval = setInterval(function(){
                            if (Math.random()<0.05){
                                gamesManager.players[0].zRotation = -gamesManager.players[0].zRotation;
                            }
                            gamesManager.players[0].viewPortManager.rotateCube(0,0,gamesManager.players[0].zRotation);
                        },500)
                    } else {
                        this.currentLevel = levels[this.levelIndex];
                        this.currentSpeed = this.currentLevel.startSpeed;
                        this.linesLeft = this.currentLevel.toNextLevel;
                    }
                }

            }
        }
        var paddedLines = ("000" + this.linesLeft).substr(-3,3);
        $("#ui-"+this.playerInfo.playerId+" .lines-left-counter").html(paddedLines);
    };

    this.nextGame = function(){
        this.pieceHold.unlock();
        var newAngles = {x:0,y:0,z:0};
        if (gamesManager.isMultiplayer()){
            this.activeGame = (this.activeGame+this.playerInfo.rotateNext)%4;
            this.activeGame = this.activeGame < 0 ? 3 : this.activeGame;
            newAngles.y = this.playerInfo.rotateNext*-90;
        } else {
            if (this.currentLevel.randomFace){
                var randomGame = Math.floor(Math.random()*3)+1;
                this.activeGame = (this.activeGame+randomGame)%4;
                newAngles.y = randomGame*-90;
            } else {
                this.activeGame = (this.activeGame+this.playerInfo.rotateNext)%4;
                this.activeGame = this.activeGame < 0 ? 3 : this.activeGame;
                newAngles.y = this.playerInfo.rotateNext*-90;
            }

            if (this.currentLevel.rotateZFixed){
                newAngles.z = -15;
            }
            if (this.currentLevel.rotateZRandom){
                newAngles.z = Math.floor(Math.random()*24)*15;
            }
        }

        this.viewPortManager.rotateCube(newAngles.x,newAngles.y,newAngles.z);
        this.games[this.activeGame].tetrises[0].placedPieces = 0;
        this.pauseNonActiveGames();
    };

    this.upsideDown = function(){
        this.attacked = !this.attacked;
        this.viewPortManager.upSideDown();
    };

    this.pauseNonActiveGames = function(){
        for(var i = 0; i < this.games.length; i++){
            this.games[i].paused = !(i == this.activeGame);
        }
    };

    this.pauseAllGames = function (){
        for(var i = 0; i < this.games.length; i++){
            this.games[i].paused = true;
        }
    };

    this.usePowerUp = function(){
        var powerUp = this.powerUpManager.getFirstPowerUp();
        if (!powerUp){
            return;
        }
        var actionPlayer;
        switch (powerUp.type){
            case "help" : actionPlayer = this; break;
            case "attack" :
                actionPlayer = gamesManager.getOtherPlayer(this);
                if (!actionPlayer) {
                    return;
                }
                break;
            case "both" :
                actionPlayer = gamesManager.getOtherPlayer(this);
                if (!actionPlayer) {
                    actionPlayer = this;
                }
                break;

        }
        switch (powerUp.name){
            case "upside-down" : actionPlayer.upsideDown(); break;
            case "block-remove" : actionPlayer.removeBlocksInActiveGame(); break;
            case "clone-piece" : actionPlayer.pieceGenerator.cloneFirst(); break;
            case "bad-shuffle" : actionPlayer.pieceGenerator.badShuffle(); break;
        }
    };

    this.removeBlocksInActiveGame = function(){
        this.games[this.activeGame].tetrises[0].powerUpRemove();
    };

    this.cleanGames = function(){
        for (var i = 0; i <4; i++){
            this.games[i].tetrises[0].cleanTetris();
            this.games[i].tetrises[0].grid.alphaTween.stop();
            this.games[i].tetrises[0].startTimeOut();
        }
    };

    this.createGames = function(){
        this.viewPortManager = new ViewPortManager(this.playerInfo.cubeId);
        for (var i = 0; i <4; i++){
            this.games.push(new Phaser.Game(300,550, Phaser.CANVAS, this.playerInfo.cubeId+"-viewport-"+i));
            this.games[i].state.add("preloader", new Preloader(this.games[i]));
            this.games[i].state.add("gameState", new GameState(this.games[i]));
            this.games[i].playerId = this.playerInfo.playerId;
            this.games[i].playerManagerRef = this;
            this.games[i].id = i;
            this.games[i].state.start("preloader");
        }
    };
    this.changeLevel();
    this.createGames();
};

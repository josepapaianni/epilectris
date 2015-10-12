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

    this.randomGame = function () {
        this.activeGame = Math.floor(Math.random()*4);
        this.viewPortManager.cubeToActiveGame(this.activeGame);
        this.pauseNonActiveGames();
    };

    this.setScore = function(score){
        if (this.attacked){
            this.upsideDown();
        }
        this.score+=score*score;
        var paddedScore = ("000000" + this.score).substr(-6,6);
        $("#ui-"+this.playerInfo.playerId+" .score-counter").html(paddedScore);
    };

    this.nextGame = function(){
        this.pieceHold.unlock();
        this.activeGame = (this.activeGame+this.playerInfo.rotateNext)%4;
        this.activeGame = this.activeGame < 0 ? 3 : this.activeGame;
        this.viewPortManager.rotateCube(0,this.playerInfo.rotateNext*-90,0);
        this.pauseNonActiveGames();
    };

    this.upsideDown = function(){
        this.attacked = !this.attacked;
        this.viewPortManager.rotateCube(0,0,180);
    };

    this.pauseNonActiveGames = function(){
        for(var i = 0; i < this.games.length; i++){
            this.games[i].paused = !(i == this.activeGame);
        }
    };

    this.usePowerUp = function(){
        var powerUp = this.powerUpManager.getFirstPowerUp();
        var otherPlayer = gamesManager.getOtherPlayer(this);
        if (!powerUp || (!otherPlayer && powerUp.type == "attack")){
            return;
        }
        switch (powerUp.name){
            case "upside-down" : console.log("attacking"); otherPlayer.upsideDown(); break;
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

    this.createGames();
};

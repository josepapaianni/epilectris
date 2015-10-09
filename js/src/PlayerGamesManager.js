/**
 * Created by Luna on 9/10/15.
 */
var PlayerGamesManager = function (playerInfo) {
    this.playerInfo = playerInfo;
    this.games = [];
    this.activeGame = 0;

    this.randomGame = function () {
        this.activeGame = Math.floor(Math.random()*4);
        this.viewPortManager.cubeToActiveGame(this.activeGame);
        this.pauseNonActiveGames();
    };

    this.nextGame = function(){
        this.activeGame = (this.activeGame+this.playerInfo.rotateNext)%4;
        this.activeGame = this.activeGame < 0 ? 3 : this.activeGame;
        this.viewPortManager.rotateCube(0,this.playerInfo.rotateNext*-90,0);
        this.pauseNonActiveGames();
    };

    this.pauseNonActiveGames = function(){
        for(var i = 0; i < this.games.length; i++){
            this.games[i].paused = !(i == this.activeGame);
        }
    };

    this.createGames = function(){
        this.viewPortManager = new ViewPortManager(this.playerInfo.cubeId);
        for (var i = 0; i <4; i++){
            this.games.push(new Phaser.Game(300,550, Phaser.CANVAS, this.playerInfo.cubeId+"-viewport-"+i));
            this.games[i].state.add("preloader", new Preloader(this.games[i]));
            this.games[i].state.add("gameState", new GameState(this.games[i]));
            this.games[i].playerId = this.playerInfo.playerId;
            this.games[i].id = i;
            this.games[i].state.start("preloader");
        }
    };

    this.createGames();
};

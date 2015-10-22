/**
 * Created by Jose on 4/10/15.
 */
var GamesManager = function () {
  this.players = [];
  this.canStartNewGame = true;

  this.nextGame = function () {
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].nextGame();
    }
  };

  this.checkMultiplayerWinner = function (){
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].linesLeft <= 0 || this.players[i].gameOver()){
        return [i, this.players[i].gameOver()]
      } else {
      return false
      }
    }
  };

  this.startPlayer = function () {
    audioManager.playMusic("game");
    var _self = this;
    this.players.push(new PlayerGamesManager(playersMeta[this.players.length]));
    if (this.players.length === 1) {
      TweenMax.set(this.players[0].viewPortManager.cube,{
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1
      });
      this.players[0].viewPortManager.cube.style.display = 'block';
      TweenMax.from(this.players[0].viewPortManager.cube, 1, {
        delay: 0.5,
        scale: 0,
        ease: Power3.easeIn,
        onComplete: function () {
          _self.players[0].pauseNonActiveGames();
        }
      });
    }
    if (this.players.length == 2) {

      var appHolder = $('#app-holder');
      var appWidth = appHolder.innerWidth();
      //player two started
      $(".wait-player-2").hide();
      $(".player-2-wrapper").show();

      //pause player 1 games
      this.players[0].reset();
      this.players[0].pauseAllGames();

      TweenMax.to(this.players[0].viewPortManager.cube, 1, {
        left: appWidth * 0.325 - ($(this.players[1].viewPortManager.cube).width() / 2),
      });
      this.players[1].viewPortManager.cube.style.display = "block";
      TweenMax.from(this.players[1].viewPortManager.cube, 1, {
        x: 480,
        rotationY: -360,
        force3D: true,
        onComplete: function () {
          //reset p1 current game & resume both games
          _self.players[0].pauseNonActiveGames();
          _self.players[1].pauseNonActiveGames();
          adjustAppSize();
          //_self.players[1].changeLevel();
        }
      })
    }
  };

  this.getOtherPlayer = function (player) {
    return (this.players.length == 1) ? null : ((player == this.players[0]) ? this.players[1] : this.players[0]);
  };

  this.isMultiplayer = function () {
    return this.players.length > 1;
  };

  this.playerLose = function (multiplayerMatchResults) {
    for (var i = 0; i < this.players.length; i++){
      this.players[i].viewPortManager.removeCube()
    }
    uiUtils.hideUi();
    if (!multiplayerMatchResults){
      uiUtils.showGameOver();
    } else {
      uiUtils.showGameOver(multiplayerMatchResults)
    }
  };

  this.multiPlayerEnd = function () {
    for (var i = 0; i < this.players.length; i++){
      this.players[0].viewPortManager.removeCube()
      uiUtils.hideUi();
    }
  };

  //players start
  document.onkeydown = function (e) {
    var e = e || window.event;
    if (e.keyCode === 70 && gamesManager.players.length != 2 && gamesManager.canStartNewGame) {
      gamesManager.startPlayer();
      if (gamesManager.players.length === 1) {
        uiUtils.hideWelcomeScreen();
        uiUtils.showUi();
      }
    }
    e.preventDefault();
  };


};

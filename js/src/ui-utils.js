var UiUtils = function () {

  this.uiHidden = true;

  this.welcomeScreen = $('#welcome-screen');
  this.welcomeText = $('#welcome-screen > .text');

  this.player1Ui = $('#ui-player-1');
  this.player2Ui = $('#ui-player-2');

  //reset objects
  TweenMax.set(this.player1Ui, {
    x: -this.player1Ui.width()
  });

  TweenMax.set(this.player2Ui, {
    x: this.player2Ui.width()
  });

  TweenMax.set(this.welcomeScreen, {
    scale: 0,
    autoAlpha: 1
  });

  TweenMax.set(this.welcomeText, {
    autoAlpha: 0
  });

  this.showNextPiece = function (pieceMatrix, colour, pieceName, player) {
    $('#ui-' + player + ' .next-piece-monitor' + ' .piece-sprite').remove();
    for (var j = 0; j < pieceMatrix.length; j++) {
      for (var i = 0; i < pieceMatrix[j].length; i++) {
        if (pieceMatrix[j][i] > 0) {
          var piece = document.createElement('div');
          piece.className = 'piece-sprite' + ' piece-colour-' + colour;
          var offset = {};
          switch (pieceName) {
            case "I":
              offset = {x: 12, y: -12};
              break;
            case "O":
              offset = {x: 0, y: 10};
              break;
            default:
              offset = {x: 0, y: 0};
              break;
          }
          TweenMax.set(piece, {
            x: i * 20 + offset.x,
            y: j * 20 + offset.y
          });
          $('#ui-' + player + ' .next-piece-monitor').append(piece);
        }
      }
    }
  };

  this.showUi = function () {
    if (this.uiHidden) {
      TweenMax.to(this.player1Ui, 0.66, {
        x: 0
      });

      TweenMax.to(this.player2Ui, 0.66, {
        x: 0
      });

      this.uiHidden = false;
    }
  };

  this.hideUi = function () {
    if (!this.uiHidden) {
      TweenMax.to(this.player1Ui, 0.66, {
        x: -this.player1Ui.width()
      });

      TweenMax.to(this.player2Ui, 0.66, {
        x: this.player2Ui.width()
      });

      this.uiHidden = true;
    }
  }

  this.showWelcomeScreen = function () {
    this.welcomeScreen.css('display', 'block')
    var _self = this;
    TweenMax.to(this.welcomeScreen, 1, {
      scale: 1,
      autoAlpha: 1
    });

    TweenMax.to(this.welcomeText, 1, {
      delay: 0.5,
      autoAlpha: 1,
      onComplete: startTextLoop
    });

    function startTextLoop() {
      TweenMax.to(_self.welcomeText, 0.5, {
        autoAlpha: 0.3,
        yoyo: true,
        repeat: -1
      })
    }
  };

  this.hideWelcomeScreen = function () {
    var _self = this;
    TweenMax.to(this.welcomeScreen, 1, {
      scale: 0,
      autoAlpha: 0,
      onComplete: function () {
        _self.welcomeScreen.css('display', 'none')
      }

    });
    TweenMax.to(this.welcomeText, 1, {
      autoAlpha: 0
    });
  };

  this.showHoldPiece = function (pieceMatrix, colour, pieceName, player) {
    $('#ui-' + player + ' .hold-piece-monitor' + ' .piece-sprite').remove();
    if (!pieceMatrix) {
      return;
    }
    for (var j = 0; j < pieceMatrix.length; j++) {
      for (var i = 0; i < pieceMatrix[j].length; i++) {
        if (pieceMatrix[j][i] > 0) {
          var piece = document.createElement('div');
          piece.className = 'piece-sprite' + ' piece-colour-' + colour;
          var offset = {};
          switch (pieceName) {
            case "I":
              offset = {x: 12, y: -12};
              break;
            case "O":
              offset = {x: 0, y: 10};
              break;
            default:
              offset = {x: 0, y: 0};
              break;
          }
          TweenMax.set(piece, {
            x: i * 20 + offset.x,
            y: j * 20 + offset.y
          });
          $('#ui-' + player + ' .hold-piece-monitor').append(piece);
        }
      }
    }
  };

  this.showGameOver = function (player, winnerThis) {
    var _self = this;
    gamesManager.canStartNewGame = false;
    var gameOverText = $('#game-over');
    var winner;
    if (player) {
        switch (_.findIndex(gamesManager.players, player)) {
          case 0:
            winnerThis ? winner = 0 : winner = 1;
            break;
          case 1:
            winnerThis ? winner = 1: winner = 0;
            break;
        }
      var text = "Player " + (winner + 1) + "<br>wins!";
      gameOverText.html('<div class="align-vertical">' + text + '</div>');
    } else {
      gameOverText.html('<div class="align-vertical">game<br>over</div>');
    }
    TweenMax.set(gameOverText, {autoAlpha: 1});
    TweenMax.fromTo(gameOverText, 1, {
      scale: 0,
    }, {
      scale: 1,
      delay: 0.66,
      ease: Power3.easeOut,
      yoyo: true,
      repeat: 1,
      repeatDelay: 3,
      onComplete: function () {
        if (gamesManager.isMultiplayer()){
          _self.restartGame();
        } else {
          _self.showPlayerInputHighScore();
        }
      }
    });
  };

  this.showPlayerInputHighScore = function () {
    var _self = this;
    document.onkeydown = null;
    var highScoresInputScreen = $('#high-scores');
    highScoresInputScreen.css('display','block');
    $('#submit-btn').click(function(event){
      event.preventDefault();
      _self.saveScore($('#player-name').val(), score);
    });
    TweenMax.from(highScoresInputScreen,1,{
      scale: 0,
      ease: Power3.easeOut
    })

  };

  this.getHighScores = function () {

  };

  this.saveScore = function (name,score) {
    //var name = 'jose';
    //var score = 213;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseText) ;
      }
    }
    xmlhttp.open("GET", "./services/save-score.php?name=" + name + "&score=" + score, true);
    xmlhttp.send();
  };

  this.restartGame = function () {
    this.showWelcomeScreen();
    gamesManager.canStartNewGame = true;
    createMainClasses();
  }


};
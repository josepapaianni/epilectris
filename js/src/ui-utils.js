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
    this.welcomeScreen.css('display', 'block');
    this.welcomeScreenActive = true;
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
      });
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
    if (this.highScoresActive){
      TweenMax.to($('#high-scores-table'),1,{
        autoAlpha: 0
      })
    }
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

  this.showGameOver = function (player, winnerThis, score) {
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
      scale: 0
    }, {
      scale: 1,
      delay: 0.66,
      ease: Power3.easeOut,
      yoyo: true,
      repeat: 1,
      repeatDelay: 3,
      onComplete: function () {
        console.log(player);
        if (player){
          _self.restartGame();
        } else {
          _self.showPlayerInputHighScore(score);
        }
      }
    });
  };

  this.showPlayerInputHighScore = function (score) {
    var _self = this;
    document.onkeydown = null;
    var highScoresInputScreen = $('#high-scores');
    var playerName = $('#player-name');
    highScoresInputScreen.css('display','block');
    playerName.val('');

    $('#submit-btn').click(function(event){
      event.preventDefault();
      playerName.addClass('loader-ajax');
      _self.saveScore(playerName.val(), score);
    });
    TweenMax.from(highScoresInputScreen,1,{
      scale: 0,
      ease: Power3.easeOut
    })

  };

  this.hidePlayerInputHighScore = function () {
    var highScoresInputScreen = $('#high-scores');
    TweenMax.to(highScoresInputScreen,1,{
      scale: 0,
      ease: Power3.easeIn,
      onComplete: function () {
        TweenMax.set(highScoresInputScreen,{
          display: 'none',
          scale: 1
        })
      }
    });
  };

  this.showHighScores = function (response) {
    this.highScoresActive = true;
    var _self = this;
    var scores = $.parseJSON(response);
    if (this.welcomeScreenActive){
      TweenMax.to(this.welcomeScreen, 1, {
        scale: 0,
        autoAlpha: 0
      });
    }
    var highScoresTable = $('#high-scores-table');
    highScoresTable.css('display','block');
    highScoresTable.html('');
    highScoresTable.append('<div class="score-row-header">'+
        '<div class="name-score"> NAME </div>' +
        '<div class="score-score">SCORE</div>' +
        '</div>');
    if (scores){
      for (var i = 0; i < scores.length; i++){
        highScoresTable.append('<div class="score-row">'+
            '<div class="name-score">' +scores[i].name + '</div>' +
            '<div class="score-score">' +scores[i].score + '</div>' +
            '</div>')
      };
    }
    TweenMax.fromTo(highScoresTable,0.66,{
      scale:0,
      autoAlpha:1
    },{
      scale: 1,
      autoAlpha:1
    })
    setTimeout(function(){
      console.log('restarting')
      _self.restartGame();
    }, 7500);
  };

  this.getHighScores = function () {
    var _self = this;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        _self.showHighScores(xmlhttp.responseText);
      }
    };
    xmlhttp.open("GET", "./services/get-scores.php", true);
    xmlhttp.send();
  };



  this.saveScore = function (name,score) {
    var _self = this;
    $('#submit-btn').off();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $('#player-name').removeClass('loader-ajax');
        _self.hidePlayerInputHighScore();
        _self.getHighScores()
      }
    };
    xmlhttp.open("GET", "./services/save-score.php?name=" + name + "&score=" + score, true);
    xmlhttp.send();
  };

  this.restartGame = function () {
    if (this.highScoresActive){
      this.highScoresActive = false;
      var tableDiv = $('#high-scores-table');
      TweenMax.to(tableDiv,0.66,{
        autoAlpha: 0,
        onComplete: function(){
          tableDiv.css('display','none');
        }
      })
    }
    var _self = this;
    _self.showWelcomeScreen();
    gamesManager.canStartNewGame = true;
    createMainClasses();
  }


};
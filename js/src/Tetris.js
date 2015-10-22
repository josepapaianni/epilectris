/**
 * Created by luna on 04/09/15.
 */

function Tetris(x, y, angle, game) {
  this.movePiece = function (direction) {
    //this.stopTimeOut();
    var nextPosition = {
      i: this.current.position.i,
      j: this.current.position.j,
      rotation: this.current.rotation,
      matrix: this.current.matrix
    };
    var recalculateOffset = false;
    switch (direction ? direction : this.gravity) {
      case "down":
        nextPosition.j++;
        break;
      case "up":
        nextPosition.j--;
        break;
      case "left":
        audioManager.playSoundEffect("rotate");
        nextPosition.i--;
        break;
      case "right":
        audioManager.playSoundEffect("rotate");
        nextPosition.i++;
        break;
      case "rotateRight":
        if (this.current.piece.rotations.length == 1) {
          return false;
        }
        audioManager.playSoundEffect("rotate");
        nextPosition.rotation++;
        if (nextPosition.rotation == this.current.piece.rotations.length) {
          nextPosition.rotation = 0;
        }
        nextPosition.matrix = this.current.piece.rotations[nextPosition.rotation];
        recalculateOffset = true;
        break;
      case "rotateLeft":
        if (this.current.piece.rotations.length == 1) {
          return false;
        }
        audioManager.playSoundEffect("rotate");
        nextPosition.rotation--;
        if (nextPosition.rotation < 0) {
          nextPosition.rotation = this.current.piece.rotations.length - 1;
        }
        nextPosition.matrix = this.current.piece.rotations[nextPosition.rotation];
        recalculateOffset = true;
        break;
      case "powerup":
        game.playerManagerRef.usePowerUp();
        break;
      case "place":
        while (this.movePiece()) {
        }
        audioManager.playSoundEffect("place");
        return true;
        break;
      case "hold":
        audioManager.playSoundEffect("other");
        var newPiece = game.playerManagerRef.pieceHold.hold(this.current.piece);
        if (newPiece != this.current.piece) {
          this.current.shadow.removeAll();
          this.current.sprites.removeAll();
          this.changePiece(newPiece);
        }
        return;
        break;
    }
    if (this.allowedPosition(nextPosition.matrix, nextPosition)) {
      this.current.position = {i: nextPosition.i, j: nextPosition.j};
      if (recalculateOffset) {
        this.current.matrix = copyMatrix(nextPosition.matrix);
        this.current.rotation = nextPosition.rotation;
        this.current.pivot = getPivot(this.current.matrix);
        var index = 0;
        for (var j = 0; j < this.current.matrix.length; j++) {
          for (var i = 0; i < this.current.matrix[j].length; i++) {
            if (this.current.matrix[j][i] > 0) {
              this.current.sprites.children[index].offset = {i: i - this.current.pivot.i, j: j - this.current.pivot.j};
              index++;
            }
          }
        }
      }

      this.placePiece(this.current.sprites, this.current.position);
      this.placeShadow();
      return true;
    } else if (!direction || direction == this.gravity) {
      this.placePieceInGrid();
      this.changePiece();
      this.placeShadow();
      return false;
    }
    return false;
  };


  this.placeShadow = function () {
    this.current.shadow.destroy();
    this.current.shadow = game.add.group();
    var j = this.current.position.j + 1;
    while (this.allowedPosition(this.current.matrix, {i: this.current.position.i, j: j}) && j < this.grid.limits.j) {
      j++;
    }
    if (j <= this.grid.limits.j) {
      this.current.sprites.forEach(function (piece) {
        var shadow = this.current.shadow.create(0, 0, "shadow");
        shadow.anchor.set(0, 0.5);
        shadow.offset = piece.offset;
      }, this);
      this.placePiece(this.current.shadow, {i: this.current.position.i, j: j - 1});
    }
  };

  this.allowedPosition = function (pieceMatrix, piecePosition) {
    var piecePivot = getPivot(pieceMatrix);
    var start = {i: piecePosition.i - piecePivot.i, j: piecePosition.j - piecePivot.j};
    for (var j = 0; j < pieceMatrix.length; j++) {
      for (var i = 0; i < pieceMatrix[j].length; i++) {
        if (this.grid.matrix[start.j + j] == undefined || this.grid.matrix[start.j + j][start.i + i] == undefined || (pieceMatrix[j][i] > 0 && this.grid.matrix[start.j + j][start.i + i] != 0)) {
          return false;
        }
      }
    }
    return true;
  };

  this.cleanTetris = function () {
    var _self = this;
    for (var j = 0; j < this.grid.matrix.length; j++) {
      for (var i = 0; i < this.grid.matrix[j].length; i++) {
        if (this.grid.matrix[j][i] != 0) {
          var piece = this.grid.matrix[j][i];
          //piece.destroy();
          TweenMax.to(piece, 0.5, {
            delay: Math.random() * 0.5,
            y: Math.random() * 50,
            alpha: 0,
            onComplete: function (obj) {
              obj.target.destroy();
            },
            onCompleteParams: ["{self}"]
          });
          _self.grid.matrix[j][i] = 0;
        }
      }
    }
  };

  this.placePieceInGrid = function () {
    this.current.shadow.removeAll();
    var piecePivot = getPivot(this.current.matrix);
    var start = {i: this.current.position.i - piecePivot.i, j: this.current.position.j - piecePivot.j};
    var pieceIndex = 0;
    for (var j = 0; j < this.current.matrix.length; j++) {
      for (var i = 0; i < this.current.matrix[j].length; i++) {
        if (this.current.matrix[j][i] > 0) {
          var piece = this.current.sprites.getChildAt(pieceIndex);
          piece.finalPosition = {j: start.j + j, i: start.i + i};
          this.grid.matrix[piece.finalPosition.j][piece.finalPosition.i] = piece;
          pieceIndex++;
        }
      }
    }
    this.current.sprites.moveAll(this.grid.blocks);
    game.playerManagerRef.pieceHold.unlock();
    this.placeGrid();
    this.placedPieces++;
    this.checkTetris();
  };

  this.checkTetris = function (isComingFromPowerUp) {
    var linesRemoved = [];
    for (var j = 0; j < this.grid.limits.j; j++) {
      if (this.checkTetrisLine(j, true)) {
        //if (j == (this.grid.pivot.j-1) && this.checkTetrisLine(j+1,true)){
        //    this.clearAll(true);
        //    gameState.setScore(10);
        //} else {
        linesRemoved.push(j);
        //}
      }
    }

    if (linesRemoved.length > 0) {
      audioManager.playSoundEffect("lines");
      game.playerManagerRef.setScore(linesRemoved.length);
      game.playerManagerRef.showLinesMessage(linesRemoved.length);
      if (linesRemoved.length > 1) {
        game.playerManagerRef.powerUpManager.addPowerUp(linesRemoved.length);
        game.playerManagerRef.powerUpWon(powerUps[(linesRemoved.length - 2) + (gamesManager.isMultiplayer() ? 0 : 3)].name);
      }
      this.removeLine(linesRemoved, true, isComingFromPowerUp);
    } else {
      if (game.playerManagerRef.currentLevel.changeEach && this.placedPieces >= game.playerManagerRef.currentLevel.changeEach ) {
        gamesManager.nextGame();
      }
    }

    //this.placeGrid();
  };

  this.checkTetrisLine = function (line, checkOthers) {
    var clear = true;
    //var round = false;
    for (var i = 0; i < this.grid.matrix[line].length; i++) {
      //if (this.grid.matrix[line][i]==-1){
      //    round = true;
      //}
      if (this.grid.matrix[line][i] == 0) {
        return false;
        //clear = false;
        //break;
      }
    }
    return true;
    //if (clear){
    //if (!round || !checkOthers){
    //    return true;
    //}
    //return _.reduce(tetrises,function(previous, tetris){
    //    return previous && ((tetris == this) || (tetris.checkTetrisLine(line,false)));
    //},true);
    //}
    //return false;
  };

  this.removeLine = function (lines, checkOthers, isComingFromPowerUp) {
    var deferred = Q.defer();
    var blocksToRemove = [];
    var remainingBlocks = [];
    var _self = this;
    var round = false;
    for (var h = 0; h < lines.length; h++) {
      for (var j = 0; j <= lines[h]; j++) {
        for (var i = 0; i < this.grid.matrix[j].length; i++) {
          if (this.grid.matrix[j][i] instanceof Phaser.Sprite) {
            if (j == lines[h]) {
              //this.grid.blocks.remove(this.grid.matrix[line][i],true);
              blocksToRemove.push(this.grid.matrix[j][i]);
            } else if (this.grid.matrix[j + 1][i] == -1) {
              blocksToRemove.push(this.grid.matrix[j][i]);
              //this.grid.blocks.remove(this.grid.matrix[j][i],true);
              this.grid.matrix[j][i] = -1;
            } else {
              remainingBlocks.push({
                sprite: this.grid.matrix[j][i],
                position: this.grid.matrix[j][i].finalPosition.j++
              });
            }
          } else if (this.grid.matrix[j + 1][i] == -1) {
            this.grid.matrix[j][i] = -1;
          }
        }
      }
    }

    remainingBlocks = _.uniq(remainingBlocks, function (item, key, sprite) {
      return item.sprite;
    });
    this.explodeLine(lines, blocksToRemove).then(function () {
      _self.moveRemainingBlocks(remainingBlocks).then(function () {
        _self.grid.alphaTween.resume();
        _self.paused = false;
        console.log(game.playerManagerRef.linesLeft);
        if (!game.playerManagerRef.isChangingLevel){
          gamesManager.nextGame();
        } else {
          _self.powerUpArrange();
        }
        //This if is to cancel the cube spin to next game if the line is made by a powerup
        //if (!isComingFromPowerUp) {
        //  gamesManager.nextGame();
        //}
      })
    });

    //if (round && checkOthers){
    //    gameState.setScore(5);
    //    _.each(tetrises,function(tetris){
    //        if (tetris != this){
    //            tetris.removeLine(line,false);
    //        }
    //    });
    //} else if (checkOthers){
    //    gameState.setScore(1);
    //}

    //this.placeGrid();
  };


  this.moveRemainingBlocks = function (remainingBlocks) {
    var deferred = Q.defer();
    var angle = this.angle * (Math.PI / 180);
    for (var i = 0; i < remainingBlocks.length; i++) {
      var advance = {
        y: (remainingBlocks[i].sprite.finalPosition.j - remainingBlocks[i].position) * gridSize,
        x: 0
      };
      TweenMax.to(remainingBlocks[i].sprite, 0.2, {
        //finalPosition: remainingBlocks[i].position,
        x: remainingBlocks[i].sprite.x + Math.cos(angle) * advance.x - Math.sin(angle) * advance.y,
        y: remainingBlocks[i].sprite.y + Math.cos(angle) * advance.y - Math.sin(angle) * advance.x,
        delay: 0.015 * [i],
        ease: Power3.easeIn,
        onComplete: function () {
          deferred.resolve()
        }
      });
    }
    return deferred.promise;
    //this.grid.matrix[j][i].finalPosition.j++;
  };

  this.explodeLine = function (line, blocks) {
    this.grid.alphaTween.pause();
    this.paused = true;
    var deferred = Q.defer();
    var _self = this;
    TweenMax.staggerTo(blocks, 0.15, {
      alpha: 0,
      onStart: function (tween) {
        TweenMax.to(tween.target.scale, 0.15, {
          x: 2,
          y: 2
        })
      },
      onStartParams: ["{self}"],
      onComplete: function (tween) {
        _self.grid.blocks.remove(tween.target, true);
      },
      onCompleteParams: ["{self}"]
    }, 0.05, removeLine, [line]);

    function removeLine(line) {
      for (var i = 0; i < line.length; i++) {
        _self.grid.matrix.splice(line[i], 1);
        _self.grid.matrix.unshift(getEmptyRow(_self.grid.limits.i));
      }
      deferred.resolve()
    }

    return deferred.promise;
  };

  this.powerUpRemove = function () {
    game.paused = true;
    var _self = this;
    var blocksToRemove = [];
    var remainingBlocks = [];

    for (var j = 0; j < this.grid.matrix.length; j++) {
      for (var i = 0; i < this.grid.matrix[j].length; i++) {
        if (this.grid.matrix[j][i] instanceof Phaser.Sprite) {
          if (Math.random() > 0.5) {
            blocksToRemove.push(this.grid.matrix[j][i]);
            this.grid.matrix[j][i] = 0;
          } else {
            remainingBlocks.push({
              sprite: this.grid.matrix[j][i],
              positionX: i,
              positionY: j
            });
          }
        }
      }
    }
    if (blocksToRemove.length == 0) {
      game.paused = false;
      return;
    }

    TweenMax.staggerTo(blocksToRemove, 0.66, {
      onComplete: function (tween) {
        _self.grid.blocks.remove(tween.target, true);
      },
      onCompleteParams: ["{self}"],
      onStart: function (tween) {
        TweenMax.to(tween.target.scale, 0.33, {
          y: -1
        });
        TweenMax.to(tween.target.scale, 0.33, {
          delay: 0.5,
          y: 0
        });
      },
      onStartParams: ["{self}"]
    }, 0.05, function () {
      for (var l = 0; l < remainingBlocks.length; l++) {
        var offset = 0;
        for (var m = remainingBlocks[l].positionY; m < _self.grid.matrix.length; m++) {
          if (!(_self.grid.matrix[m][remainingBlocks[l].positionX] instanceof Phaser.Sprite)) {
            offset++
          }
        }
        remainingBlocks[l].offset = offset;
      }
      _self.getEmptySpaces(remainingBlocks);
    });
  };

  this.powerUpEmptySpaces = function () {
    game.paused = true;
    var remainingBlocks = [];
    for (var j = 0; j < this.grid.matrix.length; j++) {
      for (var i = 0; i < this.grid.matrix[j].length; i++) {
        if (this.grid.matrix[j][i] instanceof Phaser.Sprite) {
          remainingBlocks.push({
            sprite: this.grid.matrix[j][i],
            positionX: i,
            positionY: j
          });
        }
      }
    }
    if (remainingBlocks.length == 0) {
      game.paused = false;
      return;
    }
    for (var l = 0; l < remainingBlocks.length; l++) {
      var offset = 0;
      for (var m = remainingBlocks[l].positionY; m < this.grid.matrix.length; m++) {
        if (!(this.grid.matrix[m][remainingBlocks[l].positionX] instanceof Phaser.Sprite)) {
          offset++
        }
      }
      remainingBlocks[l].offset = offset;
    }
    this.getEmptySpaces(remainingBlocks);
  };

  //Helper function for vertical powerups
  this.getEmptySpaces = function (remainingBlocks) {
    var _self = this;
    for (var k = 0; k < remainingBlocks.length; k++) {
      this.grid.matrix[remainingBlocks[k].positionY][remainingBlocks[k].positionX] = 0;
    }
    for (var i = 0; i < remainingBlocks.length; i++) {
      var advance = remainingBlocks[i].sprite.y + (remainingBlocks[i].offset * gridSize);
      this.grid.matrix[remainingBlocks[i].positionY + remainingBlocks[i].offset][remainingBlocks[i].positionX] = remainingBlocks[i].sprite;
      remainingBlocks[i].sprite.finalPosition.j = remainingBlocks[i].sprite.finalPosition.j + remainingBlocks[i].offset;

      TweenMax.to(remainingBlocks[i].sprite, 0.2, {
        y: advance,
        delay: 0.015 * [i],
        ease: Power3.easeIn,
        onComplete: function (index) {
          if (index == remainingBlocks.length - 1) {
            game.paused = false;
            _self.checkTetris(true);
          }
        },
        onCompleteParams: [i]
      });
    }
  };

  this.powerUpArrange = function () {
    game.paused = true;
    var remainingBlocks = [];
    for (var j = 0; j < this.grid.matrix.length; j++) {
      for (var i = 0; i < this.grid.matrix[j].length; i++) {
        if (this.grid.matrix[j][i] instanceof Phaser.Sprite) {
          remainingBlocks.push({
            sprite: this.grid.matrix[j][i],
            positionX: i,
            positionY: j
          });
        }
      }
    }
    for (var l = 0; l < remainingBlocks.length; l++) {
      var offset = 0;
      for (var m = remainingBlocks[l].positionX; m < this.grid.matrix[remainingBlocks[l].positionY].length; m++) {
        if (!(this.grid.matrix[remainingBlocks[l].positionY][m] instanceof Phaser.Sprite)) {
          offset++
        }
      }
      remainingBlocks[l].offset = offset;
      console.log(offset)
    }
    this.getEmptyHorizontalSpaces(remainingBlocks);
  };

  //Helper function for horizontal powerups
  this.getEmptyHorizontalSpaces = function (remainingBlocks) {
    var _self = this;
    for (var k = 0; k < remainingBlocks.length; k++) {
      this.grid.matrix[remainingBlocks[k].positionY][remainingBlocks[k].positionX] = 0;
    }
    for (var i = 0; i < remainingBlocks.length; i++) {
      var advance = remainingBlocks[i].sprite.x + (remainingBlocks[i].offset * gridSize);
      this.grid.matrix[remainingBlocks[i].positionY][remainingBlocks[i].positionX + remainingBlocks[i].offset] = remainingBlocks[i].sprite;
      remainingBlocks[i].sprite.finalPosition.i = remainingBlocks[i].sprite.finalPosition.i + remainingBlocks[i].offset;

      TweenMax.to(remainingBlocks[i].sprite, 0.2, {
        x: advance,
        delay: 0.015 * [i],
        ease: Power3.easeIn,
        onComplete: function (index) {
          if (index == remainingBlocks.length - 1) {
            game.paused = false;
            _self.checkTetris(true);
          }
        },
        onCompleteParams: [i]
      });
    }
  };


  this.clearAll = function (checkOthers) {
    for (var j = 0; j < this.grid.matrix.length; j++) {
      for (var i = 0; i < this.grid.matrix[j].length; i++) {
        if (this.grid.matrix[j][i] instanceof Phaser.Sprite) {
          this.grid.matrix[j][i] = 0;
        }
      }
    }
    this.grid.blocks.removeAll();
    if (checkOthers) {
      _.each(tetrises, function (tetris) {
        if (tetris != this) {
          tetris.clearAll(false);
        }
      });
    }
    this.placeGrid();
  };

  this.changePiece = function (piece) {
    var newPiece = piece ? piece : game.playerManagerRef.pieceGenerator.getNextPiece();
    this.current = {
      piece: newPiece,
      matrix: copyMatrix(newPiece.rotations[0]),
      sprites: game.add.group(),
      shadow: game.add.group(),
      pivot: newPiece.pivot,
      position: {i: this.startOffset.i, j: this.startOffset.j + newPiece.pivot.j},
      rotation: 0
    };
    for (var j = 0; j < this.current.matrix.length; j++) {
      for (var i = 0; i < this.current.matrix[j].length; i++) {
        if (this.current.matrix[j][i] > 0) {
          var sprite = this.current.sprites.create(0, 0, "pieces", newPiece.colour);
          sprite.anchor.set(0, 0.5);
          sprite.offset = {i: i - this.current.pivot.i, j: j - this.current.pivot.j};
        }
      }
    }
    this.placePiece(this.current.sprites, this.current.position);
    if (!this.allowedPosition(this.current.matrix, this.current.position)) {
      //lose
      this.lose();
    }
  };

  this.lose = function () {
    //this.clearAll(false);
    game.gameOver = true;
    game.playerManagerRef.nextGame();
  };

  this.placePiece = function (spritesGroup, position) {
    var angle = this.angle * (Math.PI / 180);
    spritesGroup.forEach(function (piece) {
      var place = {
        i: (piece.finalPosition ? piece.finalPosition.i : position.i + piece.offset.i) - this.grid.pivot.i,
        j: (piece.finalPosition ? piece.finalPosition.j : position.j + piece.offset.j) - this.grid.pivot.j
      };
      piece.x = this.x + Math.cos(angle) * place.i * gridSize - Math.sin(angle) * place.j * gridSize;
      piece.y = this.y + Math.cos(angle) * place.j * gridSize + Math.sin(angle) * place.i * gridSize;
    }, this);
    spritesGroup.setAll("angle", this.angle);
  };

  this.placeGrid = function () {
    var angle = this.angle * (Math.PI / 180);
    this.grid.blocks.forEach(function (block) {
      var place = {
        i: block.finalPosition.i - this.grid.pivot.i,
        j: block.finalPosition.j - this.grid.pivot.j
      };
      block.angle = this.angle;
      block.x = this.x + Math.cos(angle) * place.i * gridSize - Math.sin(angle) * place.j * gridSize;
      block.y = this.y + Math.cos(angle) * place.j * gridSize + Math.sin(angle) * place.i * gridSize;
    }, this);
  };

  this.changeAngle = function () {
    this.angle -= angleStep;
    if (this.angle < 0) {
      this.angle += 360;
    }
    this.setPositionWithAngle();
    this.grid.sprite.angle = this.angle;
    this.grid.sprite.x = this.x;
    this.grid.sprite.y = this.y;

    this.placeGrid();
    this.placePiece(this.current.sprites, this.current.position);
    if (this.current.shadow.total > 0) {
      this.placeShadow();
    }

  };
  this.setPositionWithAngle = function () {
    var angle = this.angle * (Math.PI / 180);
    this.x = this.originalPosition.x + Math.sin(angle) * gridSize;
    this.y = this.originalPosition.y - Math.cos(angle) * gridSize;
  };

  this.angle = angle;
  this.gravity = "down";
  this.originalPosition = {x: x, y: y};
  this.setPositionWithAngle();


  this.grid = {
    limits: {i: 10, j: 20},
    matrix: getPlainMatrix(10, 20, 0),
    sprite: game.grids.create(this.x, this.y, "grid"),
    blocks: game.add.group()
  };
  this.startOffset = {i: Math.floor(this.grid.limits.i / 2), j: 0};
  this.grid.pivot = {i: this.startOffset.i, j: this.grid.limits.j - 1};
  this.grid.sprite.angle = this.angle;
  this.grid.sprite.pivot.set(this.grid.sprite.width / 2, this.grid.sprite.height - 40);
  this.grid.sprite.offset = {x: 0, y: 0};
  //this.grid.sprite.visible = false;
  this.paused = false;
  this.placedPieces = 0;
  this.grid.sprite.alpha = 0.2;
  this.startTimeOut = function () {
    this.placeShadow();
    this.grid.blocks.setAll("alpha", 1);
    this.current.sprites.setAll("alpha", 1);
    this.grid.alphaTween = game.add.tween(this.grid.sprite).to({alpha: 0.5}, game.playerManagerRef.currentSpeed, Phaser.Easing.Linear.None, true);
    this.grid.alphaTween.yoyo(true);
    this.grid.alphaTween.onComplete.add(function () {
      this.movePiece();
      this.grid.sprite.alpha = 0.2;
      this.grid.blocks.setAll("alpha", 0.2);
      this.current.sprites.setAll("alpha", 0.2);
      this.current.shadow.removeAll();
      game.state.states.gameState.changeTetris(game);
      //console.log(game);
    }, this);
  };

  this.changePiece();
}
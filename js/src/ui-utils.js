var UiUtils = function () {
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

  this.showHoldPiece = function (pieceMatrix, colour, pieceName, player) {
    $('#ui-' + player + ' .hold-piece-monitor' + ' .piece-sprite').remove();
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

};
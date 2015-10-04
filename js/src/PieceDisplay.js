/**
 * Created by luna on 10/09/15.
 */

function PieceDisplay(x,y,game){
    var game = game;
    this.display = game.add.sprite(x,y,"pieceDisplay");
    this.display.anchor.set(0.5,0.5);
    this.display.alpha = 0.7;
    this.piece = game.add.group();
    this.x = x;
    this.y = y;
    this.showPiece = function(piece){
        this.piece.removeAll();
        var matrix = piece.rotations[0];
        var offset = {
            x: this.x-(matrix[0].length*10),
            y: this.y-(matrix.length*10)
        };
        for (var j=0;j<matrix.length;j++){
            for (var i=0;i<matrix[j].length;i++){
                if (matrix[j][i]>0){
                    this.piece.create(offset.x+i*20,offset.y+j*20,"pieces",piece.colour);
                }
            }
        }
    }
}
/**
 * Created by luna on 10/09/15.
 */

function PieceHold(player){
    this.pieceHeld = null;
    this.lastPiece = null;
    this.locked = false;
    this.player = player;
    this.hold = function(piece){
        if (this.locked){
            return piece;
        }
        $("#ui-"+this.player+" .hold-piece-monitor").css("background-image","url(./assets/pieces/"+piece.name+".png)");
        this.locked = true;
        this.lastPiece = this.pieceHeld;
        this.pieceHeld = piece;
        return this.lastPiece;
    };

    this.unlock = function(){
        this.locked = false;
    }

}
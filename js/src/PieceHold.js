/**
 * Created by luna on 10/09/15.
 */

function PieceHold(x,y){
    this.pieceHeld = null;
    this.lastPiece = null;
    this.pieceDisplay = new PieceDisplay(x,y);
    this.locked = false;

    this.hold = function(piece){
        if (this.locked){
            return piece;
        }
        this.locked = true;
        this.lastPiece = this.pieceHeld;
        this.pieceHeld = piece;
        this.pieceDisplay.showPiece(this.pieceHeld);
        return this.lastPiece;
    }

    this.unlock = function(){
        this.locked = false;
    }

}
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

        uiUtils.showHoldPiece(piece.rotations[0], piece.colour, piece.name, player);
        this.locked = true;
        this.lastPiece = this.pieceHeld;
        this.pieceHeld = piece;
        return this.lastPiece;
    };

    this.unlock = function(){
        this.locked = false;
    };

    this.reset = function(){
        this.pieceHeld = null;
        this.lastPiece = null;
        this.locked = false;
        uiUtils.showHoldPiece(null,null,null,this.player);
    }

}
/**
 * Created by luna on 10/09/15.
 */

var pieces = [
    {
        pivot:{i:0,j:1},
        rotations: [
            [[1],[2],[1],[1]],
            [[1,2,1,1]]
        ],
        colour:0
    },
    {
        pivot:{i:0,j:1},
        rotations: [
            [[1,1],[2,0],[1,0]],
            [[1,2,1],[0,0,1]],
            [[0,1],[0,2],[1,1]],
            [[1,0,0],[1,2,1]]
        ],
        colour:1
    },
    {
        pivot:{i:1,j:1},
        rotations: [
            [[1,1],[0,2],[0,1]],
            [[0,0,1],[1,2,1]],
            [[1,0],[2,0],[1,1]],
            [[1,2,1],[1,0,0]]
        ],
        colour:2
    },
    {
        pivot:{i:0,j:0},
        rotations: [[[2,1],[1,1]]],
        colour:3
    },
    {
        pivot:{i:1,j:1},
        rotations: [
            [[0,1],[1,2],[1,0]],
            [[1,1,0],[0,2,1]]
        ],
        colour:4
    },
    {
        pivot:{i:0,j:1},
        rotations: [
            [[1,0],[2,1],[0,1]],
            [[0,2,1],[1,1,0]]
        ],
        colour:5
    },
    {
        pivot:{i:0,j:1},
        rotations: [
            [[1,0],[2,1],[1,0]],
            [[1,2,1],[0,1,0]],
            [[0,1],[1,2],[0,1]],
            [[0,1,0],[1,2,1]]
        ],
        colour:6
    }
];

function RandomTetrisGenerator(x,y){

    this.bag = _.range(7);
    this.pieceDisplay = new PieceDisplay(x,y);

    this.shuffle = function(){
        this.bag = _.shuffle(this.bag);
        this.bagIndex = -1;
    };

    this.generateNextPiece = function(){
        if (this.bagIndex == this.bag.length-1){
            this.shuffle();
        }
        this.bagIndex++;
        this.nextPiece = pieces[this.bag[this.bagIndex]];
        this.pieceDisplay.showPiece(this.nextPiece);
    };

    this.getNextPiece = function(){
        var nextPiece = this.nextPiece;
        this.generateNextPiece();
        return nextPiece;
    };

    this.shuffle();
    this.generateNextPiece();
}
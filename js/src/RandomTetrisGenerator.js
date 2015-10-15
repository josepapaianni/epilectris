/**
 * Created by luna on 10/09/15.
 */

var pieces = [
    {//0
        pivot:{i:0,j:1},
        rotations: [
            [[1],[2],[1],[1]],
            [[1,2,1,1]]
        ],
        colour:0,
        name: "I"
    },
    {//1
        pivot:{i:0,j:1},
        rotations: [
            [[1,1],[2,0],[1,0]],
            [[1,2,1],[0,0,1]],
            [[0,1],[0,2],[1,1]],
            [[1,0,0],[1,2,1]]
        ],
        colour:1,
        name: "J"
    },
    {//2
        pivot:{i:1,j:1},
        rotations: [
            [[1,1],[0,2],[0,1]],
            [[0,0,1],[1,2,1]],
            [[1,0],[2,0],[1,1]],
            [[1,2,1],[1,0,0]]
        ],
        colour:2,
        name: "L"
    },
    {//3
        pivot:{i:0,j:0},
        rotations: [[[2,1],[1,1]]],
        colour:3,
        name: "O"
    },
    {//4
        pivot:{i:1,j:1},
        rotations: [
            [[0,1],[1,2],[1,0]],
            [[1,1,0],[0,2,1]]
        ],
        colour:4,
        name:"Z"
    },
    {//5
        pivot:{i:0,j:1},
        rotations: [
            [[1,0],[2,1],[0,1]],
            [[0,2,1],[1,1,0]]
        ],
        colour:5,
        name: "S"
    },
    {//6
        pivot:{i:0,j:1},
        rotations: [
            [[1,0],[2,1],[1,0]],
            [[1,2,1],[0,1,0]],
            [[0,1],[1,2],[0,1]],
            [[0,1,0],[1,2,1]]
        ],
        colour:6,
        name: "T"
    }
];

function RandomTetrisGenerator(player){
    this.bag = _.range(7);
    this.player = player;
    this.shuffle = function(){
        this.bag = _.range(7);
        this.bag = _.shuffle(this.bag);
        this.bagIndex = -1;
    };

    this.generateNextPiece = function(){
        if (this.bagIndex == this.bag.length-1){
            this.shuffle();
        }
        this.bagIndex++;
        this.nextPiece = pieces[this.bag[this.bagIndex]];
        uiUtils.showNextPiece(this.nextPiece.rotations[0], this.nextPiece.colour, this.nextPiece.name, player);
    };

    this.getNextPiece = function(){
        var nextPiece = this.nextPiece;
        this.generateNextPiece();
        return nextPiece;
    };

    this.cloneFirst = function(){
        var first = this.bag[this.bagIndex];
        this.bag = [first,first,first,first,first,first,first,first];
        this.bagIndex = -1;
    };

    this.badShuffle = function(){
        this.bag = [4,4,4,4,5,5,5,5];
        this.bagIndex = -1;
    };

    this.shuffle();
    this.generateNextPiece();
}
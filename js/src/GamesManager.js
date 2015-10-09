/**
 * Created by Jose on 4/10/15.
 */
var GamesManager = function () {
    this.activeGame = 0;

    this.randomGame = function () {
        var randomizer = Math.floor(Math.random()*4);
        viewPortManager.cubeToActiveGame(randomizer);
        this.activeGame = viewPortManager.activeFace;

        for(var i = 0; i < games.length; i++){
            console.log(i);
            if (i == this.activeGame || i == this.activeGame+4 ){
                games[i].paused = false;
            } else {
                games[i].paused = true;
            }
        }
    };

    this.startSingleGame = function (gameId){
        games[gameId].paused = false;
    }

    //2 players start
    document.onkeydown = function(e) {
        var e = e || window.event;
        if (e.keyCode === 70 && matchModel.playersCount != 2){
            //start 2 player game
            matchModel.playersCount = 2;
            viewPortManager.twoCubesLayout();
            games[4].paused = false;
        }
        e.preventDefault()
    };
};

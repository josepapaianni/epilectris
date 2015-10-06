/**
 * Created by Jose on 4/10/15.
 */
var GamesManager = function () {
    this.activeGame = 0;

    this.randomGame = function () {
        var randomizer = Math.floor(Math.random()*4);
        viewPortManager.cubeToActiveGame(randomizer);

        this.activeGame = viewPortManager.activeFace;

        for (var i = 0; i < games.length; i++){
            if (i != this.activeGame){
                games[i].paused = true;
            } else {
                games[i].paused = false;
            }
        }


    }
};

/**
 * Created by Jose on 4/10/15.
 */
var GamesManager = function () {
    this.activeGame = 0;

    this.randomGame = function () {
        //var randomizer = Math.floor(Math.random()*4);
        viewPortManager.cubeToActiveGame((this.activeGame+1)%4);

        this.activeGame = viewPortManager.activeFace;

        for (var i = 0; i < games.length; i++){
            if (i == this.activeGame || i == this.activeGame+4 ){
                games[i].paused = false;
            } else {
                games[i].paused = true;
            }
        }


    }
};

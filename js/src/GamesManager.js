/**
 * Created by Jose on 4/10/15.
 */
var GamesManager = function () {
    this.activeGame = 0;

    this.randomGame = function () {
        var randomizer = -90 + 90 * Math.floor(Math.random()*1);
        viewPortManager.rotateView(randomizer);

        this.activateGame = viewPortManager.activeFace;

        for (var i = 0; i < games.length; i++){
            if (i != this.activateGame){
                games[i].paused = true;
            } else {
                games[i].paused = false;
            }
        }


    }
};

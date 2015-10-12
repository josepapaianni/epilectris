/**
 * Created by Jose on 4/10/15.
 */
var GamesManager = function () {
    this.players = [];

    this.nextGame = function(){
        for(var i = 0; i < this.players.length; i++){
            this.players[i].nextGame();
        }
    };

    this.startPlayer = function(){
        this.players.push(new PlayerGamesManager(playersMeta[this.players.length]));
        if (this.players.length == 2){
            //player two started
            $(".wait-player-2").hide();
            $(".player-2-wrapper").show();
            TweenMax.to(this.players[0].viewPortManager.cube, 1,{
                x: -170
            });
            this.players[1].viewPortManager.cube.style.display = "block";
            TweenMax.from (this.players[1].viewPortManager.cube, 1, {
                x: 480,
                rotationY: -360
            })
        }
    };

    //2 players start
    document.onkeydown = function(e) {
        var e = e || window.event;
        if (e.keyCode === 70 && gamesManager.players.length != 2){
            gamesManager.startPlayer();
            //matchModel.playersCount = 2;
        }
        e.preventDefault()
    };



};

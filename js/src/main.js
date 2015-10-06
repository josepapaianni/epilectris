var games = [];
var gamesManager = new GamesManager();
var viewPortManager = new ViewPortManager();
viewPortManager.createFaces();

for (var i = 0; i < 4; i++){

    games.push(new Phaser.Game(300,500, Phaser.AUTO, "cube-viewport-"+i));

    games[i].state.add("gameState", gameState);
    //games[i].state.add("menuState", menuState);
    games[i].state.add("preloader", preloader);
    games[i].state.start("preloader");
}



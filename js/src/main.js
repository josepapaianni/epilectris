var games = [];
var gamesManager = new GamesManager();
var viewPortManager = new ViewPortManager();
viewPortManager.createFaces();

for (var i = 0; i < 4; i++){

    games.push(new Phaser.Game(360,660, Phaser.AUTO, "cube-viewport-"+i));

    games[i].state.add("preloader", new Preloader(games[i]));
    games[i].state.add("gameState", gameState);

    games[i].state.start("preloader");
    console.log(games[i].id);
}







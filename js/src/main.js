var games = [];
var gamesManager = new GamesManager();
var viewPortManager = new ViewPortManager();
viewPortManager.createFaces();

for (var i = 0; i < 4; i++){

    games.push(new Phaser.Game(360,660, Phaser.CANVAS, "cube-viewport-"+i));

    games[i].state.add("preloader", new Preloader(games[i]));
    games[i].state.add("gameState", new GameState(games[i]));

    games[i].state.start("preloader");
    console.log(games[i].id);
}

for (var j = 0; j < 4; j++){

    games.push(new Phaser.Game(360,660, Phaser.CANVAS, "b-cube-viewport-"+(j+4)));

    games[j+4].state.add("preloader", new Preloader(games[j+4]));
    games[j+4].state.add("gameState", new GameState(games[j+4]));

    games[j+4].state.start("preloader");
    console.log(games[j+4].id);
}

gamesManager.randomGame();








var game = new Phaser.Game(960,640, Phaser.AUTO, "game");

game.state.add("gameState", gameState);
game.state.add("menuState", menuState);
game.state.add("preloader", preloader);


game.state.start("preloader");


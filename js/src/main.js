var gamesManager;
var audioManager;
var spaceEffect;
var uiUtils;

$(document).ready(function () {

  gamesManager = new GamesManager();
  audioManager = new AudioManager();
  spaceEffect = new SpaceEffect();
  uiUtils = new UiUtils();

  uiUtils.showWelcomeScreen();

  $(window).resize(function () {
    adjustAppSize()
  });

  adjustAppSize();
});

function adjustAppSize() {
  var appHolder = $('#app-holder');
  var container = $('#container');
  var cubeA = $('#cube');
  var cubeB = $('#b-cube');

  var fontSizeRatioWidth = 0.0146;
  var fontSizeRatioHeight = 0.021;
  var appWidth = appHolder.innerWidth();
  var appHeight = appHolder.innerHeight();

  if (appWidth > 880) {

    container.width(appWidth);
    container.height(appHeight);

    spaceEffect.resize(appWidth, appHeight);

    if (gamesManager.isMultiplayer()) {
      TweenMax.set(cubeA, {
        x: 0,
      })
      TweenMax.set(cubeB, {
        x: 0,
      })
      TweenMax.to(cubeA, 0.25, {
        left: appWidth * 0.325 - (cubeA.width() / 2),
        force3D: true
      })
      TweenMax.to(cubeB, 0.25, {
        left: appWidth * 0.6725 - (cubeB.width() / 2),
        force3D: true
      })

    }
  }
  //
  //if (appWidth / appHeight > 1.5){
  //  $('body').css('fontSize',fontSizeRatioHeight * appHeight);
  //} else {
  //  $('body').css('fontSize',fontSizeRatioWidth * appWidth);
  //}
}

//gamesManager.startPlayer();


//for (var i = 0; i <8; i++){
//
//    if (i < 4) {
//        games.push(new Phaser.Game(300,550, Phaser.CANVAS, "cube-viewport-"+i));
//        games[i].state.add("preloader", new Preloader(games[i]));
//        games[i].state.add("gameState", new GameState(games[i]));
//
//        games[i].state.start("preloader");
//
//    } else {
//        games.push(new Phaser.Game(300,550, Phaser.CANVAS, "cube-viewport-"+i));
//        console.log(document.getElementById("b-cube-viewport-"+i), games[i]);
//        games[i].state.add("preloader", new Preloader(games[i]));
//        games[i].state.add("gameState", new GameState(games[i]));
//
//        games[i].state.start("preloader");
//    }
//}









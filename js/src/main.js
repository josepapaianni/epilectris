var gamesManager;
var audioManager;
var spaceEffect;
var uiUtils;

$(document).ready(function () {


  createMainClasses();
  audioManager = new AudioManager();
  spaceEffect = new SpaceEffect();

  uiUtils.showWelcomeScreen();

  $(window).resize(function () {
    adjustAppSize()
  });

  adjustAppSize();
});

function createMainClasses(){
  gamesManager = new GamesManager();
  uiUtils = new UiUtils();
}


function adjustAppSize() {
  var appHolder = $('#app-holder');
  var container = $('#container');
  var cubeA = $('#cube');
  var cubeB = $('#b-cube');

  var fontSizeRatioWidth = 0.0146;
  var fontSizeRatioHeight = 0.021;
  var appWidth = appHolder.innerWidth();
  var appHeight = appHolder.innerHeight();

  if (appWidth >= 840) {
    var appWidth = appHolder.innerWidth();
    var appHeight = appHolder.innerHeight();
    container.width(appWidth);
    container.height(appHeight);
    spaceEffect.resize(appWidth, appHeight);

  } else {
    var appWidth = 840
    var appHeight = 620;
    container.width(appWidth);
    container.height(appHeight);
    spaceEffect.resize(840, 620);
  }

  if (gamesManager.isMultiplayer()) {
    TweenMax.set(cubeA, {
      x: 0
    });
    TweenMax.set(cubeB, {
      x: 0
    });
    TweenMax.to(cubeA, 0.25, {
      left: appWidth * 0.325 - (cubeA.width() / 2),
      force3D: true
    });
    TweenMax.to(cubeB, 0.25, {
      left: appWidth * 0.6725 - (cubeB.width() / 2),
      force3D: true
    })

  } else {
    TweenMax.to(cubeA, 0.25, {
      left: appWidth * 0.5 - (cubeA.width() / 2),
      force3D: true
    });

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









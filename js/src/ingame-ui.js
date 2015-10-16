/**
 * Created by jose on 10/15/15.
 */
var IngameUi = function () {

  this.showLevelInfo = function (level, game){
    if (!game) return;
    game.linesEffectGlow = game.add.sprite(game.world.centerX, game.world.centerY, 'linesEffect');
    game.linesEffectGlow.anchor.set(0.5);
    game.linesEffectGlow.alpha = 0;

    game.textStyle = { font: "Orbitron",fontSize:22, fill: "#FFFFFF", align: "center" };
    game.textStyleSmall = { font: "Orbitron",fontSize:18, fill: "#FFFFFF", align: "center" };

    game.levelText = game.add.text(game.world.centerX, game.world.centerY,"",game.textStyle);
    game.levelText.anchor.set(0.5,0.5);
    game.levelText.scale.set(0,0);

    game.levelReady = game.add.text(game.world.centerX, game.world.centerY,"",game.textStyleSmall);
    game.levelReady.anchor.set(0.5,0.5);
    game.levelReady.scale.set(0,0);

    game.levelGo = game.add.text(game.world.centerX, game.world.centerY,"",game.textStyleSmall);
    game.levelGo.anchor.set(0.5,0.5);
    game.levelGo.scale.set(0,0);


    game.levelText.text = "LEVEL " + level + " START";
    game.levelReady.text = "READY";
    game.levelGo.text = "GO!";

    TweenMax.to (game.linesEffectGlow, 0.33,{
      alpha: 0.3,
      yoyo: true,
      repeat: 1,
      repeatDelay: 3.5,
      onComplete: function (){
        //game.linesEffectGlow.destroy()
      }
    });

    TweenMax.to (game.levelText.scale, 0.5,{
      x: 1,
      y: 1
    });

    TweenMax.to (game.levelText, 0.5,{
      delay: 1,
      y: game.levelText.y - 25,
    });

    TweenMax.to (game.levelReady.scale, 0.5, {
      delay: 1.5,
      x: 1,
      y: 1
    });


    TweenMax.to (game.levelReady, 0.5, {
      delay: 2.5,
      alpha: 0,
      onComplete: function(){
        game.levelReady.destroy();
      }
    });

    TweenMax.to (game.levelGo.scale, 0.5, {
      delay: 3,
      x: 1,
      y: 1
    });

    TweenMax.to (game.levelGo, 0.5, {
      delay: 4,
      alpha: 0,
      onComplete: function(){
        game.levelGo.destroy();
      }
    });

    TweenMax.to (game.levelText, 0.5,{
      delay: 4,
      alpha: 0,
      onComplete: function(){
        game.levelText.destroy();
      }
    });

  };

  this.showMessage = function (numberOfLines, game) {
    var asset;
    var tint;
    switch (numberOfLines) {
      case 1:
        tint = 0xffffff;
        break;
      case 2:
        asset = 'doubleTxt';
        tint = 0xff00ae;
        break;
      case 3:
        asset = 'tripleTxt';
        tint = 0x00fff6;
        break;
      case 4:
        asset = 'tetrisTxt';
        tint = 0x00ff33;
        break;
    }

    game.linesEffectGlow = game.add.sprite(game.world.centerX, game.world.centerY, 'linesEffect');
    game.linesEffectGlow.anchor.set(0.5);
    game.linesEffectGlow.alpha = 0;
    game.linesEffectGlow.tint = tint;

    TweenMax.to (game.linesEffectGlow, 0.33,{
      alpha: 0.6,
      yoyo: true,
      repeat: 1,
      repeatDelay: 0.33,
      onComplete: function (){
        //game.linesEffectGlow.destroy()
      }
    });

    if (numberOfLines > 1){
      game.linesTxt = game.add.sprite(game.world.centerX, game.world.centerY, asset);
      game.linesTxt.anchor.set(0.5);
      game.linesTxt.scale.set(0);

      TweenMax.to (game.linesTxt.scale, 0.33,{
        y: 1,
        x: 1,
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.33,
        ease: Back.easeOut.config(1.7),
        onComplete: function (){
          //game.linesTxt.destroy()
        }
      })
    }

  }
}
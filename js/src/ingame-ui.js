/**
 * Created by jose on 10/15/15.
 */
var IngameUi = function () {

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
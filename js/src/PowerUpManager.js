/**
 * Created by luna on 10/09/15.
 */

var powerUps = [
  {
    name: "upside-down",
    type: "attack"
  },
  {
    name: "block-remove",
    type: "help"
  },
  {
    name: "arrange-blocks",
    type: "help"
  },
  {
    name: "block-clean",
    type: "help"
  },
  {
    name: "bad-shuffle",
    type: "attack"
  },
  {
    name: "clone-piece",
    type: "both"
  }
];

function PowerUpManager(player) {
  //
  ////reset dom objects scale
  //TweenMax.set ($('.power-up-icon'),{
  //    scale: 1
  //})
  this.powerUps = [];

  this.player = player;

  this.addPowerUp = function (numberOfLines) {
    if (this.powerUps.length < 3) {
      var newPowerUp;
      if (gamesManager.players.length == 1) {
        switch (numberOfLines) {
          case 2:
            newPowerUp = powerUps[2];
            break;
          case 3:
            newPowerUp = powerUps[3];
            break;
          case 4:
            newPowerUp = powerUps[1];
            break;
        }
      } else {
        switch (numberOfLines) {
          case 2:
            newPowerUp = powerUps[0];
            break;
          case 3:
            newPowerUp = powerUps[4];
            break;
          case 4:
            newPowerUp = powerUps[5];
            break;
        }
      }
      this.powerUps.push(newPowerUp);
      this.showPowerUps();
    }
  };

  this.showPowerUps = function (clean) {
    TweenMax.set($('.power-up-icon'), {
      scale: 1
    })

    for (var i = 0; i < 3; i++) {
      if (i >= this.powerUps.length) {
        $($("#ui-" + this.player + " .power-up-icon")[i]).attr('class', 'power-up-icon');
      } else {
        $($("#ui-" + this.player + " .power-up-icon")[i]).addClass(this.powerUps[i].name);
        if (!clean) {
          TweenMax.to($("#ui-" + this.player + " .power-up-icon").eq(this.powerUps.length - 1), 0.25, {
            scale: 1.1,
            ease: Power2.easeOut,
            yoyo: true,
            repeat: 1,
            force3D: true
          })
        }
      }
    }
  };
  //
  //this.hidePowerUp = function () {
  //  TweenMax.to($("#ui-" + this.player + " .power-up-icon").eq(this.powerUps.length - 1), 0.5,{
  //    rotation: 90
  //  })
  //}

  this.getFirstPowerUp = function () {
    if (this.powerUps.length == 0) {
      return null;
    }
    var firstPowerUp = this.powerUps[0];
    this.powerUps.shift();
    this.showPowerUps(true);
    return firstPowerUp;
  }

}
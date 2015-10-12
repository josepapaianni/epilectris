/**
 * Created by luna on 10/09/15.
 */

var powerUps = [
    {
        name: "upside-down",
        type: "attack"
    }
];

function PowerUpManager(player){
    this.powerUps = [];

    this.player = player;

    this.addPowerUp = function(){
        var newPowerUp = powerUps[Math.floor(Math.random()*powerUps.length)];
        this.powerUps.push(newPowerUp);
        this.showPowerUps();
    };

    this.showPowerUps = function(){
        for (var i=0; i < 4; i++){
            if (i>=this.powerUps.length){
                $($("#ui-"+this.player+" .power-up-icon")[i]).css("background-image","");
            } else {
                $($("#ui-"+this.player+" .power-up-icon")[i]).css("background-image","url(./assets/powerups/"+this.powerUps[i].name+".png)");
            }
        }
    };

    this.getFirstPowerUp = function(){
        if (this.powerUps.length == 0) {
            return null;
        }
        var firstPowerUp = this.powerUps.pop();
        this.showPowerUps();
        return firstPowerUp;
    }

}
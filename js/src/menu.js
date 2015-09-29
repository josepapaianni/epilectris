/**
 * Created by luna on 9/29/15.
 */

var menuState = {
    create : function(){
        game.add.sprite(0,0,"menuBackground");

        front_emitter = game.add.emitter(game.world.centerX, -32, 40);
        front_emitter.makeParticles('pieces', [0, 1, 2, 3, 4, 5, 6]);
        front_emitter.maxParticleScale = 1;
        front_emitter.minParticleScale = 0.5;
        front_emitter.setYSpeed(100, 200);
        front_emitter.gravity = 0;
        front_emitter.width = game.world.width * 1.5;
        front_emitter.minRotation = 0;
        front_emitter.maxRotation = 40;
        front_emitter.start(false, 6000, 120);

        var nova = game.add.sprite(game.world.centerX,game.world.centerY-100,"menuNova");
        var logo = game.add.sprite(game.world.centerX,game.world.centerY-100,"menuLogo");
        var logoGlow = game.add.sprite(game.world.centerX,game.world.centerY-100,"menuLogoGlow");
        logo.anchor.set(0.5,0.5);
        logoGlow.anchor.set(0.5,0.5);
        nova.anchor.set(0.5,0.5);
        //logo.scale.set(0.7);
        //logoGlow.scale.set(0.7);
        //nova.scale.set(0.7);
        //nova.alpha = 0.6;
        game.add.tween(logoGlow).to({alpha:0},2500,Phaser.Easing.Bounce.InOut,true,0,-1,true);
        //game.add.tween(nova).to({alpha:1},1500,Phaser.Easing.Bounce.InOut,true,0,-1,true);

        var style = { font: "Orbitron",fontSize:40, fill: "#991b1e", align: "center" };
        var start = game.add.text(game.world.centerX,game.height-150,"",style);
        var settings = game.add.text(game.world.centerX,game.height-100,"",style);
        start.anchor.set(0.5,0.5);
        settings.anchor.set(0.5,0.5);
        start.alpha = 0;
        settings.alpha = 0;

        setTimeout(function(){
            start.text = "START";
            settings.text = "SETTINGS";
            start.inputEnabled = true;
            start.events.onInputDown.add(function(){
                game.state.start("gameState");
            }, this);
            game.add.tween(start).to({alpha:1},1500,Phaser.Easing.Default,true);
            game.add.tween(settings).to({alpha:1},1500,Phaser.Easing.Default,true);

        },100);
    }
}


/**
 * Created by luna on 9/29/15.
 */

var preloader = {
    preload : function(){
        game.load.image('shadow', 'assets/glow-white.png');
    },

    create : function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
        game.load.onFileComplete.add(this.showProgress, this);
        game.load.onLoadComplete.add(this.startGame, this);

        game.load.image('grid', 'assets/light-grid.png');
        game.load.spritesheet('pieces', 'assets/glow.png',26,26);
        game.load.image('pieceDisplay', 'assets/pieceDisplay-red.png');
        game.load.image('controlDisplay', 'assets/control-display.png');
        game.load.image('tierDisplay', 'assets/tier-display.png');
        game.load.image('stageShadow', 'assets/wholegrid.png');
        game.load.image('menuBackground', 'assets/welcome-bg.jpg');
        game.load.image('menuNova', 'assets/welcome-nova.png');
        game.load.image('menuLogo', 'assets/welcome-logo.png');
        game.load.image('menuLogoGlow', 'assets/welcome-logo-glow.png');
        progressCube = 0;
        game.load.start();

    },

    showProgress : function(progress, cacheKey, success, totalLoaded, totalFiles){
        if (progress > progressCube*10){
            var cube = game.add.sprite(game.world.centerX-130+progressCube*26,game.world.centerY,"shadow");
            cube.anchor.set(0.5,0.5);
            cube.alpha = 0;
            game.add.tween(cube).to({alpha:1},1000,Phaser.Easing.Default,true);
            progressCube++;
        }
    },

    startGame : function(){
        game.state.start("gameState");
    }



}


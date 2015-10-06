/**
 * Created by luna on 9/29/15.
 */

var preloader = {
    preload : function(){
        this.game.load.image('shadow', 'assets/glow-white-30.png');

        this.game.load.image('grid','assets/background-green-glow.png');
        this.game.load.spritesheet('pieces', 'assets/glow-30.png',30,30);
        this.game.load.image('pieceDisplay', 'assets/pieceDisplay-red.png');
        this.game.load.image('controlDisplay', 'assets/control-display.png');
        this.game.load.image('tierDisplay', 'assets/tier-display.png');
        this.game.load.image('stageShadow', 'assets/wholegrid.png');
        this.game.load.image('menuBackground', 'assets/welcome-bg.jpg');
        this.game.load.image('menuNova', 'assets/welcome-nova.png');
        this.game.load.image('menuLogo', 'assets/welcome-logo.png');
        this.game.load.image('menuLogoGlow', 'assets/welcome-logo-glow.png');
        this.game.load.image('backgroundImage', 'assets/background-face.jpg');
    },

    create : function(){
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        this.game.load.onFileComplete.add(this.showProgress, this);
        this.game.load.onLoadComplete.add(this.startGame, this);

        progressCube = 0;
        this.game.load.start();

    },

    showProgress : function(progress, cacheKey, success, totalLoaded, totalFiles){
        //if (progress > progressCube*10){
        //    var cube = this.game.add.sprite(this.game.world.centerX-130+progressCube*26,this.game.world.centerY,"shadow");
        //    cube.anchor.set(0.5,0.5);
        //    cube.alpha = 0;
        //    this.game.add.tween(cube).to({alpha:1},1000,Phaser.Easing.Default,true);
        //    progressCube++;
        //}
    },

    startGame : function(){
        //if (this.game.id === 0) {
        this.game.state.start("gameState");
        //}
    }



}


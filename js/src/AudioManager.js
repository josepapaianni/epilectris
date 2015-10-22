/**
 * Created by luna on 10/16/15.
 */

function AudioManager(){

    this.playSoundEffect = function(key){
        if (!this.ready){
            return;
        }
        this.soundEffects[key].play();
    };

    this.playMusic = function(key){
        if (!this.ready){
            setTimeout(function(){ audioManager.playMusic(key) }, 500);
            return;
        }
        if (this.currentMusic){
            this.currentMusic.stop();
        }
        this.currentMusic = this.music[key];
        this.currentMusic.play();
    };

    this.preload = function(){
        game.load.image('shadow', 'assets/glow-white-30.png');

        game.load.image('grid','assets/light-grid.png');
        game.load.spritesheet('pieces', 'assets/glow-30.png',25,25);
        game.load.image('pieceDisplay', 'assets/pieceDisplay-red.png');
        game.load.image('controlDisplay', 'assets/control-display.png');
        game.load.image('tierDisplay', 'assets/tier-display.png');
        game.load.image('stageShadow', 'assets/wholegrid.png');
        game.load.image('menuBackground', 'assets/welcome-bg.jpg');
        game.load.image('menuNova', 'assets/welcome-nova.png');
        game.load.image('menuLogo', 'assets/welcome-logo.png');
        game.load.image('menuLogoGlow', 'assets/welcome-logo-glow.png');
        game.load.image('backgroundImage', 'assets/background-face.png');
        game.load.image('linesEffect', 'assets/ui/lines-effect.png');
        game.load.image('doubleTxt', 'assets/ui/double-txt.png');
        game.load.image('tripleTxt', 'assets/ui/triple-txt.png');
        game.load.image('tetrisTxt', 'assets/ui/tetris-txt.png');


        game.load.audio('menu-music', 'assets/audio/Blue Space v0_8.mp3');
        game.load.audio('game-music', 'assets/audio/Twister-Tetris.ogg');

        game.load.audio('lines', 'assets/audio/lines.ogg');
        game.load.audio('rotate', 'assets/audio/rotate.ogg');
        game.load.audio('other', 'assets/audio/other.ogg');
        game.load.audio('attack', 'assets/audio/upside-down.ogg');
        game.load.audio('help', 'assets/audio/block-remove.ogg');
        game.load.audio('place', 'assets/audio/place.ogg');
        game.load.audio('asdf', 'assets/audio/asdf.ogg');
    };

    this.create = function(){
        audioManager.music = {
            menu: game.add.audio('menu-music',0.7,true),
            game: game.add.audio('game-music',0.7,true)
        };

        audioManager.soundEffects = {
            lines: game.add.audio('lines'),
            rotate: game.add.audio('rotate',0.7),
            other: game.add.audio('other'),
            attack: game.add.audio('attack'),
            help: game.add.audio('help'),
            place: game.add.audio('place'),
            levelUp: game.add.audio('asdf')
        };

        audioManager.currentMusic = null;
        audioManager.ready = true;
        audioManager.playMusic("menu");
    };




    var game = new Phaser.Game(0,0, Phaser.CANVAS, "audio-manager",{preload:this.preload,create:this.create});

}
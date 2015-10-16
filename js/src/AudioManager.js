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
        game.load.audio('menu-music', 'assets/audio/Blue Space v0_8.mp3');
        game.load.audio('game-music', 'assets/audio/Twister Tetris.mp3');

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
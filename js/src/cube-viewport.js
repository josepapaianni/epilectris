/**
 * Created by Jose on 30/9/15.
 */
;

var facesStatus = [];
var cubeStatus = {};

var game ;



function createFaces () {
    var container = document.getElementsByClassName('container');
    TweenMax.set(container, {
        z: -400
    });
    cubeStatus.rotation = 0;
    cubeStatus.activeFace = 0;
    for (var i = 0; i < 4; i++){
        var face = document.createElement('div');
        face.id = 'cube-viewport-'+i;
        face.className = 'cube-viewport';
        TweenMax.set(face, {
            overflow:'hidden',
            zIndex:-i,
            transformPerspective:-1000,
            transformOrigin:'50% 50% 100px',
            rotationY:i * 90,
            z:-0
        });;
        facesStatus.push({face: i, rotation: i*90, initRotationY: i * 90});
        container[0].appendChild(face);

        game = new Phaser.Game(200, 300, Phaser.AUTO, 'cube-viewport-'+i);

        game.state.add("preloader", preloader);
        game.state.add("gameState", gameState);
        game.state.add("menuState", menuState);

        game.state.start("preloader");



    }
}




function rotateFaces(degrees){

    cubeStatus.rotation = cubeStatus.rotation + degrees;
    cubeStatus.activeFace = getFaceIndex(cubeStatus.rotation);

    var face = document.getElementsByClassName('cube-viewport');


    for (var i = 0; i < 4; i++){

        var pagePos = cubeStatus.activeFace;

        if(pagePos > 1){

            pagePos = 2 + pagePos;
        }
        if(pagePos < 0){

            pagePos =+ pagePos;
        };

        destAlpha = 1 + pagePos;

        if(destAlpha < 0){
            destAlpha = -destAlpha
        };

        if(destAlpha > 1 ){

            destAlpha = 2 - destAlpha;
        };

        TweenMax.to(face[i], 1, {
            rotationY: facesStatus[i].initRotationY + cubeStatus.rotation,
            force3D: true,
            zIndex: pagePos+i,
            ease: Back.easeOut.config(1.3)
        });
        facesStatus[i].rotation = facesStatus[i].rotation + cubeStatus.rotation;
    }
};


function getFaceIndex(degrees) {
    var face;
    var isNegative = degrees < 0;
    if (isNegative) {
        degrees*= -1;
    }


    if (degrees >= 0 && degrees < 360) {
        face = (degrees / 90);

        if (!isNegative) {
            return face;
        } else {
            face = 3 - face + 1;
            return face;
        }
    }

    if (degrees >= 360) {
        var fit = Math.floor(degrees / 360);
        face = (degrees - (360 * fit)) / 90;

        if (!isNegative) {
            return face;
        } else {
            face === 0 ? face = 0 : face=4-face;
            return face;
        }
    }
}


createFaces();





var ViewPortManager = function () {
    this.faces = [];
    this.actualCubeRotation = {x: 0, y: 0, z: 0};
    this.activeFace = 0;
    this.cube = document.getElementsByClassName('cube');

    this.createFaces = function () {
        //var container = document.getElementById('container');
        //TweenMax.set(container, {
        //    z: -400
        //});
        var face = document.getElementsByClassName('cube-viewport');

        for (var i = 0; i < 4; i++){
            face[i].id = 'cube-viewport-'+i;
            this.faces.push({face: i, rotation: -i*90, originalRotationAngle: -i*90, zindex: 360-i});
            //container.appendChild(face);
        }
    };

    this.spinCube = function (spinX, spinY, spinZ) {
        this.actualCubeRotation.x = this.actualCubeRotation.x + 360 * spinX;
        this.actualCubeRotation.y = this.actualCubeRotation.y + 360 * spinY;
        this.actualCubeRotation.z = this.actualCubeRotation.z + 360 * spinZ;

        TweenMax.to(this.cube[0], 1.33,{
            rotationX: this.actualCubeRotation.x,
            rotationY: this.actualCubeRotation.y,
            rotationZ: this.actualCubeRotation.z,
            ease: Back.easeOut.config(1.3)
        })
    };

    this.rotateCube = function (degreesX, degreesY, degreesZ) {
        this.actualCubeRotation.x = degreesX;
        this.actualCubeRotation.y = degreesY;
        this.actualCubeRotation.z = degreesZ;

        TweenMax.to(this.cube[0], 0.66,{
            rotationX: degreesX,
            rotationY: degreesY,
            rotationZ: degreesZ,
            ease: Back.easeOut.config(1.3)
        })
    };

    this.cubeToActiveGame = function (activeGame){
        this.activeFace = activeGame;
        gamesManager.activeGame = this.activeFace;
        this.actualCubeRotation.y = 360 - activeGame * 90;
        TweenMax.to(this.cube[0], 1,{
            rotationY: this.actualCubeRotation.y,
            ease: Back.easeOut.config(1.3)
        });
    };

    this.getActiveFace = function(){
        var angle = this.actualCubeRotation;
        var cycles = Math.floor(this.actualCubeRotation/360) + 1;

        console.log((angle/90 - (4*cycles)) + 4);
        return (angle/90 - (4*cycles)) + 4;

    };
};

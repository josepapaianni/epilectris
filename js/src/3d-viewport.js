var ViewPortManager = function (cubeId) {

    this.actualCubeRotation = {x: 0, y: 0, z: 0};
    this.cube = document.getElementById(cubeId);

    this.spinCube = function (spinX, spinY, spinZ) {
        this.actualCubeRotation.x = this.actualCubeRotation.x + 360 * spinX;
        this.actualCubeRotation.y = this.actualCubeRotation.y + 360 * spinY;
        this.actualCubeRotation.z = this.actualCubeRotation.z + 360 * spinZ;

        TweenMax.to(this.cube, 1.33,{
            rotationX: this.actualCubeRotation.x,
            rotationY: this.actualCubeRotation.y,
            rotationZ: this.actualCubeRotation.z,
            ease: Back.easeOut.config(1.3)
        })
    };

    this.rotateCube = function (degreesX, degreesY, degreesZ) {
        this.actualCubeRotation.x += degreesX;
        this.actualCubeRotation.y += degreesY;
        this.actualCubeRotation.z += degreesZ;
        TweenMax.to(this.cube, 0.66,{
            rotationX: this.actualCubeRotation.x,
            rotationY: this.actualCubeRotation.y,
            rotationZ: this.actualCubeRotation.z,
            ease: Back.easeOut.config(1.3)
        });
    };

    this.cubeToActiveGame = function (activeGame){
        TweenMax.to(this.cube , 1,{
            rotationY: activeGame * -90,
            ease: Back.easeOut.config(1.3)
        });
    };
};

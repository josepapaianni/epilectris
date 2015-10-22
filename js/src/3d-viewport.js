
var ViewPortManager = function (cubeId) {

    this.actualCubeScale = 1;
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
            ease: Back.easeOut.config(1.3),
            force3D:true
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
            ease: Back.easeOut.config(1.3),
            force3D:true
        });
    };

    this.resetAngle = function(){
        this.rotateCube(-this.actualCubeRotation.x,-this.actualCubeRotation.y,-this.actualCubeRotation.z);
    };

    this.resetXZ = function(){
        TweenMax.to(this.cube, 1,{
            rotationX: 0,
            rotationZ: 0,
            ease: Power2.easeOut,
            force3D:true
        });
    };

    this.upSideDown = function () {
        TweenMax.to(this.cube, 0.33, {
            scaleX: 0.8,
            scaleY: 0.8,
            force3D:true,
            ease: Power3.easeOut
        });
        TweenMax.to(this.cube, 0.33, {
            delay: 0.33,
            rotationZ: this.actualCubeRotation.z + 180,
            force3D:true,
            ease: Power2.easeOut
        });
        TweenMax.to(this.cube, 0.33, {
            delay: 0.66,
            scale: 1,
            force3D:true,
            ease: Power3.easeIn
        });

        this.actualCubeRotation.z = this.actualCubeRotation.z + 180;
    };

    this.cubeToActiveGame = function (activeGame){
        TweenMax.to(this.cube , 1,{
            rotationY: activeGame * -90,
            ease: Back.easeOut.config(1.3),
            force3D:true
        });
    };

    this.removeCube = function(){
        TweenMax.to(this.cube, 1,{
            scaleX: 0,
            scaleY: 0,
            ease: Power3.easeIn,
            //force3D:true
        });
    }
};

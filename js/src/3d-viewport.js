var ViewPortManager = function () {
    this.faces = [];
    this.actualCubeRotation = {x: 0, y: 0, z: 0};
    this.activeFace = 0;
    this.cube = document.getElementById('cube');
    this.bCube = document.getElementById('b-cube');
    this.createFaces = function () {
        //var container = document.getElementById('container');
        //TweenMax.set(container, {
        //    z: -400
        //});
        var face = document.getElementsByClassName('cube-viewport');
        var faceb = document.getElementsByClassName('b-cube-viewport');

        //for (var i = 0; i < 4; i++){
        //    face[i].id = 'cube-viewport-'+i;
        //    this.faces.push({face: i, rotation: -i*90, originalRotationAngle: -i*90, zindex: 360-i});
        //    //container.appendChild(face);
        //}
        //for (var j = 0; j < 4; j++){
        //    faceb[j].id = 'b-cube-viewport-'+ j;
        //    this.faces.push({face: j, rotation: -j*90, originalRotationAngle: -j*90, zindex: 360-j});
        //    //container.appendChild(face);
        //}
    };

    this.twoCubesLayout = function (){
        TweenMax.to(this.cube, 1,{
            x: -200,
        });
        this.bCube.style.display = "block";
        TweenMax.from (this.bCube, 1, {
            x: 560,
            rotationY: -360
        })

    };

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
        this.actualCubeRotation.x = degreesX;
        this.actualCubeRotation.y = degreesY;
        this.actualCubeRotation.z = degreesZ;

        TweenMax.to(this.cube, 0.66,{
            rotationX: degreesX,
            rotationY: degreesY,
            rotationZ: degreesZ,
            ease: Back.easeOut.config(1.3)
        })
    };

    this.cubeToActiveGame = function (activeGame){
        this.activeFace = activeGame;
        gamesManager.activeGame = this.activeFace;
        //this.actualCubeRotation.y -= 90;
        //this.actualCubeRotation.z -= 15;
        TweenMax.to([this.cube, this.bCube] , 1,{
            rotationY: activeGame * -90,
            //rotationZ: this.actualCubeRotation.z,
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

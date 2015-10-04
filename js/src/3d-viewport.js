var ViewPortManager = function () {
    this.faces = [];
    this.actualCubeRotation = 0;
    this.activeFace = 0;

    this.createFaces = function () {
        var container = document.getElementById('container');
        TweenMax.set(container, {
            z: -400
        });
        for (var i = 0; i < 4; i++){
            var face = document.createElement('div');
            face.id = 'cube-viewport-'+i;
            face.className = 'cube-viewport';
            TweenMax.set(face, {
                overflow:'hidden',
                zIndex:360-i,
                transformPerspective:-600,
                transformOrigin:'50% 50% 150px',
                rotationY: -i * 90,
                z:-0
            });
            this.faces.push({face: i, rotation: -i*90, originalRotationAngle: -i*90, zindex: 360-i});
            container.appendChild(face);
        }
    };

    this.rotateView = function (degrees) {
        _self = this;
        this.actualCubeRotation = this.actualCubeRotation + degrees;
        this.activeFace = this.getActiveFace();
        gamesManager.activeGame = this.activeFace;
        var face = document.getElementsByClassName('cube-viewport');
        for (var i = 0; i < 4; i++) {
            TweenMax.to(face[i], 0.66, {
                rotationY: this.faces[i].rotation + degrees,
                zIndex: this.activeFace == i ? i : -i,
                ease: Back.easeOut.config(1.4)
            });
            this.faces[i].rotation = this.faces[i].rotation + degrees;
        }
    }

    this.getActiveFace = function(){
        var angle = this.actualCubeRotation;
        var cycles = Math.floor(this.actualCubeRotation/360) + 1;

        return (angle/90 - (4*cycles)) + 4;

    };
};

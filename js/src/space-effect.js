/**
 * Created by Jose on 10/10/15.
 */
var SpaceEffect = function () {

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var container = document.getElementById("container");
    canvas.width = 960;
    canvas.height = 640;
    container.appendChild(canvas);

    var particles = {},
        particleIndex = 0;

    var _self = this;

    this.resize = function (width, height) {
        canvas.width = width;
        canvas.height = height;
    };

    this.settings = {
            particleSize: 1,
            particleMinSize: 0.5,
            particleMaxSize: 3,
            startingX: canvas.width / 2,
            startingY: canvas.height / 2,
            gravity: 0,
            speedX: 6,
            speedY: 6,
            density: 20,
        };

    // Set up a function to create multiple particles
    function Particle() {
        // Establish starting positions and velocities
        this.x = _self.settings.startingX - 20 + Math.random() * 20;
        this.y = _self.settings.startingY - 20 + Math.random() * 20;

        this.vx = Math.random() * _self.settings.speedX - _self.settings.speedX/2;
        this.vy = Math.random() * _self.settings.speedY - _self.settings.speedY/2;

        this.size = Math.floor(Math.random() * _self.settings.particleMaxSize);
        // Add new particle to the index
        // Object used as it's simpler to manage that an array
        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.maxLife = 400;
        this.alpha = 0;
    }

    // Some prototype methods for the particle's "draw" function
    Particle.prototype.draw = function () {
        this.x += this.vx;
        this.y += this.vy;

        // Age the particle
        this.life++;

        if (this.life >= this.maxLife) {
            delete particles[this.id];
        }

        _self.settings.density = _self.settings.speedX * 3;
        this.alpha += _self.settings.speedX / 1000;

        // Create the shapes
        context.clearRect(_self.settings.leftWall, _self.settings.groundLevel, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

    }

    function animate() {
        context.fillStyle = "rgba(0,0,0,0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the particles
        for (var i = 0; i < _self.settings.density; i++) {
            if (Math.random() > 0.97) {
                new Particle();
            }
        }

        for (var i in particles) {
            particles[i].draw();
        }
        window.requestAnimationFrame(animate)
    };

    window.requestAnimationFrame(animate);

}
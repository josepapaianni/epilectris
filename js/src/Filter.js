/**
 * Created by luna on 10/09/15.
 */

function Filter(){

    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2     resolution;",
        "uniform vec2      mouse;",

        "#define PI 3.1415926535897932384626433832795",

        "const float position = 0.0;",
        "const float scale = 1.0;",
        "const float intensity = 1.0;",

        //"varying vec2 surfacePosition;",
        // "vec2 pos;",

        "float band(vec2 pos, float amplitude, float frequency) {",
        "float wave = scale * amplitude * sin(1.0 * PI * frequency * pos.x + time) / 2.05;",
        "float light = clamp(amplitude * frequency * 0.02, 0.001 + 0.001 / scale, 5.0) * scale / abs(wave - pos.y);",
        "return light;",
        "}",

        "void main() {",

        "vec3 color = vec3(0.5, 0, 0);",
        "color = color == vec3(0.0)? vec3(10.5, 0.5, 1.0) : color;",
        "vec2 pos = (gl_FragCoord.xy / resolution.xy);",
        "pos.y += - 1.;",
        "float spectrum = 0.0;",
        "const float lim = 28.0;",
        "#define time time*0.037 + pos.x*10.",

        "vec2 lines[8];",
        "lines[3] = vec2( 0.7, 2.5);",
        "lines[2] = vec2( 0.4, 2.0 );",
        "lines[0] = vec2( 0.05, 4.5 );",
        "lines[1] = vec2( 0.1, 7.0 );",
        "lines[4] = vec2( 0.1, 1.0 );",
        "lines[5] = vec2( 0.6, 4. );",
        "lines[6] = vec2( 0.4, sin(time) );",
        "lines[7] = vec2( cos(time), 3. );",
        "int maxIndex = int(mouse.x);",
        "int tier = int(mouse.y);",
        "for(int i = 0; i < 8; i++){",
            "if (tier==0){",
                "if (i<maxIndex){",
                    "spectrum += band(pos, lines[i].x, lines[i].y);",
                "}",
            "}",
            "if (tier==1){",
                "if (i<maxIndex){",
                    "spectrum += band(pos, sin(time*lines[i].x), sin(lines[i].y));",
                "}",
            "}",
            "if (tier==4){",
                "if (i<maxIndex){",
                    "spectrum += band(pos, tan(time*lines[i].x), cos(lines[i].y));",
                "}",
            "}",
            "if (tier==2){",
                "if (i<maxIndex){",
                    "spectrum += band(pos, cos(time*lines[i].x), sin(time*lines[i].y*0.3));",
                "}",
            "}",
            "if (tier==3){",
                "if (i<maxIndex){",
                    "spectrum += band(pos, cos(time*lines[i].x), sin(time*lines[i].y));",
                "}",
            "}",

        "}",
        "if (maxIndex > 8){",
            "for(float i = 0.; i < lim; i++){",
                "spectrum += band(pos, 1.0*sin(time*0.1), 1.0*sin(time*i/lim))/pow(lim, 0.25);",
            "}",
        "}",
        "gl_FragColor = vec4(color * spectrum, spectrum);",

        "}"

    ];

    this.filter = new Phaser.Filter(game, null, fragmentSrc);
    this.filter.setResolution(game.width/2,game.height/2);

    var sprite = game.add.sprite(0,0);
    sprite.width = game.width;
    sprite.height = game.height;

    sprite.filters = [ this.filter ];

    var square = game.add.sprite(0,0,"stageShadow");
    square.alpha = 0.6;

    this.update = function(){
        this.filter.update();

        this.filter.uniforms.mouse.value.x = currentLevel.toFixed(2);
        this.filter.uniforms.mouse.value.y = currentTier.toFixed(2);
    }
}

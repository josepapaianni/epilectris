/**
 * Created by luna on 10/09/15.
 */

function ScoreDisplay(x,y){
    this.display = game.add.sprite(x,y,"pieceDisplay");
    this.display.anchor.set(0.5,0.5);
    this.display.alpha = 0.7;

    this.score = 0;
    this.style = { font: "Orbitron",fontSize:50, fill: "#FFFFFF", align: "center" };
    this.text = game.add.text(x,y+5,"",this.style);
    this.text.anchor.set(0.5,0.5);

    this.addScore = function(score){
        this.score += score;
        this.text.text = this.score;
    }
    this.setScore = function(score){
        this.score = score;
        this.text.text = this.score;
    }
}
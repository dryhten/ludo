import { START_POSITIONS, TOKEN_COLORS } from "./constants";

class Token {
  constructor(boardSize, x, y, color, dir) {
    this.x = x;
    this.y = y;
    this.radius = boardSize / 32;
    this.stepSize = boardSize / 15;
    this.color = color;
    this.centerX = (x + 0.5) * this.stepSize;
    this.centerY = (y + 0.5) * this.stepSize;
    // @ts-ignore
    this.open = false;
    this.home = false;
    this.dir = dir;
  }

  draw(ctx) {
    ctx.fillStyle = TOKEN_COLORS[this.color];
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.centerX = (x + 0.5) * this.stepSize;
    this.centerY = (y + 0.5) * this.stepSize;
  }

  openToken() {
    this.open = true;
    this.moveTo(START_POSITIONS[this.color].x, START_POSITIONS[this.color].y);
  }
}

export default Token;

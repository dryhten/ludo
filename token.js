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

  // Maybe move this function outside. Into Player?
  move(numMoves) {
    while (numMoves) {
      switch (this.dir) {
        case "r":
          if (this.x === 14 || this.x === 8) {
            this.moveTo(this.x, this.y + 1);
            this.dir = "d";
          } else if (this.x === 5) {
            this.moveTo(this.x + 1, this.y - 1);
            this.dir = "u";
          } else {
            this.moveTo(this.x + 1, this.y);
          }
          break;
        case "l":
          if (this.x === 9) {
            this.moveTo(this.x - 1, this.y + 1);
            this.dir = "d";
          } else if (this.x === 6 || this.x === 0) {
            this.moveTo(this.x, this.y - 1);
            this.dir = "u";
          } else {
            this.moveTo(this.x - 1, this.y);
          }
          break;
        case "u":
          if (this.y === 9) {
            this.moveTo(this.x - 1, this.y - 1);
            this.dir = "l";
          } else if (this.y === 6 || this.y === 0) {
            this.moveTo(this.x + 1, this.y);
            this.dir = "r";
          } else {
            this.moveTo(this.x, this.y - 1);
          }
          break;
        case "d":
          if (this.y === 5) {
            this.moveTo(this.x + 1, this.y + 1);
            this.dir = "r";
          } else if (this.y === 8 || this.y === 14) {
            this.moveTo(this.x - 1, this.y);
            this.dir = "l";
          } else {
            this.moveTo(this.x, this.y + 1);
          }
          break;
        default:
          break;
      }
      numMoves--;
    }
  }

  openToken() {
    this.open = true;
    this.moveTo(START_POSITIONS[this.color].x, START_POSITIONS[this.color].y);
  }
}

export default Token;

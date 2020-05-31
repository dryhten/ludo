import Token from "./token";
import { HOME_POSITIONS } from "./constants";

function getInitialDirection(color) {
  switch (color) {
    case "RED":
      return "u";
    case "BLUE":
      return "l";
    case "GREEN":
      return "r";
    case "YELLOW":
      return "d";
    default:
      return null;
  }
}

class Player {
  constructor(boardSize, color) {
    this.score = 0;
    this.turn = false;
    this.color = color;
    this.tokens = HOME_POSITIONS[color].map(
      (position) =>
        new Token(
          boardSize,
          position.x,
          position.y,
          color,
          getInitialDirection(color)
        )
    );
  }

  move(token, numMoves) {
    while (numMoves) {
      switch (token.dir) {
        case "r":
          if (token.x === 14 || token.x === 8) {
            token.moveTo(token.x, token.y + 1);
            token.dir = "d";
          } else if (token.x === 5) {
            token.moveTo(token.x + 1, token.y - 1);
            token.dir = "u";
          } else {
            token.moveTo(token.x + 1, token.y);
          }
          break;
        case "l":
          if (token.x === 9) {
            token.moveTo(token.x - 1, token.y + 1);
            token.dir = "d";
          } else if (token.x === 6 || token.x === 0) {
            token.moveTo(token.x, token.y - 1);
            token.dir = "u";
          } else {
            token.moveTo(token.x - 1, token.y);
          }
          break;
        case "u":
          if (token.y === 9) {
            token.moveTo(token.x - 1, token.y - 1);
            token.dir = "l";
          } else if (token.y === 6 || token.y === 0) {
            token.moveTo(token.x + 1, token.y);
            token.dir = "r";
          } else {
            token.moveTo(token.x, token.y - 1);
          }
          break;
        case "d":
          if (token.y === 5) {
            token.moveTo(token.x + 1, token.y + 1);
            token.dir = "r";
          } else if (token.y === 8 || token.y === 14) {
            token.moveTo(token.x - 1, token.y);
            token.dir = "l";
          } else {
            token.moveTo(token.x, token.y + 1);
          }
          break;
        default:
          break;
      }
      numMoves--;
    }
  }
}

export default Player;

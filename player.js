import Token from "./token";
import { HOME_POSITIONS } from "./constants";

function getDirection(color) {
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
    this.turn = false;
    this.tokens = HOME_POSITIONS[color].map(
      (position) =>
        new Token(boardSize, position.x, position.y, color, getDirection(color))
    );
  }
}

export default Player;

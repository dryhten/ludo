// @ts-nocheck
import Board from "./board";
import Player from "./player";
import Dice from "./dice";
import { PLAYERS } from "./constants";
import { getMousePos, isIntersecting } from "./utils";

class Game {
  constructor(boardSize) {
    this.canvas = document.getElementById("gameScreen");
    this.ctx = this.canvas.getContext("2d");
    this.board = new Board(boardSize);
    this.players = PLAYERS.map(
      (playerColor) => new Player(boardSize, playerColor)
    );
    this.dice = new Dice();
    this.canvas.width = boardSize;
    this.canvas.height = boardSize;
    this.canvas.addEventListener("click", (e) => this.callback(e));
  }
  clearBoard(boardSize) {
    this.ctx.clearRect(0, 0, boardSize, boardSize);
  }

  refreshBoard(board, players, ctx) {
    this.clearBoard(board.size);
    board.draw(ctx);
    players.forEach((player) =>
      player.tokens.forEach((token) => token.draw(ctx))
    );
  }

  callback(e) {
    const mousePosition = getMousePos(this.canvas, e);
    this.players.forEach((player) => {
      player.tokens.forEach((token) => {
        if (token.open && player.turn && isIntersecting(mousePosition, token)) {
          this.dice.roll();
          player.move(token, this.dice.value);
          this.refreshBoard(this.board, this.players, this.ctx);
          // requestAnimationFrame(callback);
        }
      });
    });
  }

  play() {
    this.players[1].tokens[0].openToken();
    this.players[1].turn = true;
    this.board.draw(this.ctx);
    this.players.forEach((player) =>
      player.tokens.forEach((token) => token.draw(this.ctx))
    );
  }
}

export default Game;

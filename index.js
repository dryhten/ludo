// @ts-nocheck
import Board from "./board";
import Token from "./token";
import Player from "./player";
import { PLAYERS } from "./constants";

const BOARD_SIZE = 600;

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

function clearBoard() {
  ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
}

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

function isIntersecting(point, token) {
  return (
    Math.sqrt((point.x - token.centerX) ** 2 + (point.y - token.centerY) ** 2) <
    token.radius
  );
}

function refreshBoard(board, players, ctx) {
  clearBoard();
  board.draw(ctx);
  players.forEach((player) =>
    player.tokens.forEach((token) => token.draw(ctx))
  );
}

function callback(e) {
  const mousePosition = getMousePos(canvas, e);
  players.forEach((player) => {
    player.tokens.forEach((token) => {
      if (token.open && player.turn && isIntersecting(mousePosition, token)) {
        token.move(5);
        refreshBoard(board, players, ctx);
        // requestAnimationFrame(callback);
      }
    });
  });
}

const board = new Board(BOARD_SIZE);
const players = PLAYERS.map(
  (playerColor) => new Player(BOARD_SIZE, playerColor)
);
canvas.width = BOARD_SIZE;
canvas.height = BOARD_SIZE;

board.draw(ctx);
players.forEach((player) => player.tokens.forEach((token) => token.draw(ctx)));

canvas.addEventListener("click", callback);

players[0].tokens[0].openToken();
players[1].tokens[0].openToken();
players[1].turn = true;
refreshBoard(board, players, ctx);

// const starttime = 0;

// function game(timestamp, duration) {
//   const ts = timestamp || new Date().getTime();
//   const runtime = ts - starttime;
//   const progress = Math.min(runtime / duration, 1);

//   clearBoard();
//   board.draw(ctx);
//   players[0].tokens[0].move(1);
//   players[0].tokens[0].draw(ctx);
//   if (runtime < duration) {
//     requestAnimationFrame((timestamp) => game(timestamp, duration));
//   }
// }

// requestAnimationFrame((timestamp) => {
//   // const starttime = starttime || new Date().getTime();
//   game(null, 2000);
// });

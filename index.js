import Game from "./game";

const BOARD_SIZE = 600;

new Game(BOARD_SIZE).play();
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

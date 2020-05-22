// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board = /*#__PURE__*/function () {
  function Board(boardSize) {
    _classCallCheck(this, Board);

    this.size = boardSize;
    this.strokeWidth = 1;
    this.space = this.size / 5;
    this.squareSide = this.space * 2;
    this.rowSide = this.space / 3;
  }

  _createClass(Board, [{
    key: "draw",
    value: function draw(ctx) {
      // Background
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, this.size, this.size); // Home rows

      this.drawHomeRows(ctx); // Grid

      this.drawGrid(ctx); // Corners

      this.drawHomeCorners(ctx); // Center

      this.drawCenter(ctx); // Home circles

      this.drawHomeCircles(ctx);
    }
  }, {
    key: "drawHomeCircles",
    value: function drawHomeCircles(ctx) {
      this.drawCircles(ctx, this.squareSide / 2, this.squareSide / 2);
      this.drawCircles(ctx, this.squareSide / 2 + this.space + this.squareSide, this.squareSide / 2);
      this.drawCircles(ctx, this.squareSide / 2, this.squareSide / 2 + this.space + this.squareSide);
      this.drawCircles(ctx, this.squareSide / 2 + this.space + this.squareSide, this.squareSide / 2 + this.space + this.squareSide);
    }
  }, {
    key: "drawHomeCorners",
    value: function drawHomeCorners(ctx) {
      this.drawSquare(ctx, 0, 0, "#0f0");
      this.drawSquare(ctx, this.squareSide + this.space, 0, "#ff0");
      this.drawSquare(ctx, this.squareSide + this.space, this.squareSide + this.space, "#00f");
      this.drawSquare(ctx, 0, this.squareSide + this.space, "#f00");
    }
  }, {
    key: "drawHomeRows",
    value: function drawHomeRows(ctx) {
      ctx.fillStyle = "#0f0";
      ctx.fillRect(this.rowSide, this.squareSide, this.rowSide, this.rowSide * 2);
      ctx.fillRect(this.rowSide * 2, this.squareSide + this.rowSide, this.rowSide * 4, this.rowSide);
      ctx.fillStyle = "#ff0";
      ctx.fillRect(this.squareSide + this.rowSide, this.rowSide, this.rowSide * 2, this.rowSide);
      ctx.fillRect(this.squareSide + this.rowSide, this.rowSide * 2, this.rowSide, this.rowSide * 4);
      ctx.fillStyle = "#00f";
      ctx.fillRect(this.size - this.rowSide * 2, this.squareSide + this.rowSide, this.rowSide, this.rowSide * 2);
      ctx.fillRect(this.squareSide + this.space, this.squareSide + this.rowSide, this.rowSide * 4, this.rowSide);
      ctx.fillStyle = "#f00";
      ctx.fillRect(this.squareSide, this.size - this.rowSide * 2, this.rowSide * 2, this.rowSide);
      ctx.fillRect(this.squareSide + this.rowSide, this.squareSide + this.space, this.rowSide, this.rowSide * 4);
    }
  }, {
    key: "drawCenter",
    value: function drawCenter(ctx) {
      ctx.fillStyle = "#0f0";
      ctx.beginPath();
      ctx.moveTo(this.squareSide, this.squareSide);
      ctx.lineTo(this.squareSide + this.space / 2, this.squareSide + this.space / 2);
      ctx.lineTo(this.squareSide, this.squareSide + this.space);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ff0";
      ctx.beginPath();
      ctx.moveTo(this.squareSide, this.squareSide);
      ctx.lineTo(this.squareSide + this.space, this.squareSide);
      ctx.lineTo(this.squareSide + this.space / 2, this.squareSide + this.space / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#00f";
      ctx.beginPath();
      ctx.moveTo(this.squareSide + this.space, this.squareSide);
      ctx.lineTo(this.squareSide + this.space, this.squareSide + this.space);
      ctx.lineTo(this.squareSide + this.space / 2, this.squareSide + this.space / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#f00";
      ctx.beginPath();
      ctx.moveTo(this.squareSide, this.squareSide + this.space);
      ctx.lineTo(this.squareSide + this.space, this.squareSide + this.space);
      ctx.lineTo(this.squareSide + this.space / 2, this.squareSide + this.space / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(this.squareSide, this.squareSide);
      ctx.lineTo(this.squareSide + this.space, this.squareSide + this.space);
      ctx.moveTo(this.squareSide + this.space, this.squareSide);
      ctx.lineTo(this.squareSide, this.squareSide + this.space);
      ctx.closePath();
      ctx.stroke();
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(ctx, x, y) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, this.rowSide, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.stroke();
    }
  }, {
    key: "drawSquare",
    value: function drawSquare(ctx, x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, this.squareSide, this.squareSide);
    }
  }, {
    key: "drawGrid",
    value: function drawGrid(ctx) {
      ctx.fillStyle = "#000";
      ctx.lineWidth = this.strokeWidth;
      ctx.beginPath();

      for (var i = 0; i < this.size + this.rowSide; i += this.rowSide) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, this.size);
        ctx.moveTo(0, i);
        ctx.lineTo(this.size, i);
      }

      ctx.closePath();
      ctx.stroke();
    }
  }, {
    key: "drawCircles",
    value: function drawCircles(ctx, x, y) {
      ctx.beginPath();
      this.drawCircle(ctx, x - this.squareSide / 4, y - this.squareSide / 4);
      this.drawCircle(ctx, x + this.squareSide / 4, y - this.squareSide / 4);
      this.drawCircle(ctx, x - this.squareSide / 4, y + this.squareSide / 4);
      this.drawCircle(ctx, x + this.squareSide / 4, y + this.squareSide / 4);
    }
  }]);

  return Board;
}();

var _default = Board;
exports.default = _default;
},{}],"constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLAYERS = exports.START_POSITIONS = exports.TOKEN_COLORS = exports.HOME_POSITIONS = void 0;
var HOME_POSITIONS = {
  RED: [{
    x: 1,
    y: 10
  }, {
    x: 1,
    y: 13
  }, {
    x: 4,
    y: 10
  }, {
    x: 4,
    y: 13
  }],
  GREEN: [{
    x: 1,
    y: 1
  }, {
    x: 1,
    y: 4
  }, {
    x: 4,
    y: 1
  }, {
    x: 4,
    y: 4
  }],
  YELLOW: [{
    x: 10,
    y: 1
  }, {
    x: 10,
    y: 4
  }, {
    x: 13,
    y: 1
  }, {
    x: 13,
    y: 4
  }],
  BLUE: [{
    x: 10,
    y: 10
  }, {
    x: 10,
    y: 13
  }, {
    x: 13,
    y: 10
  }, {
    x: 13,
    y: 13
  }]
};
exports.HOME_POSITIONS = HOME_POSITIONS;
var TOKEN_COLORS = {
  RED: "#be0000",
  GREEN: "#037d50",
  BLUE: "#0000be",
  YELLOW: "#ffea00"
};
exports.TOKEN_COLORS = TOKEN_COLORS;
var START_POSITIONS = {
  RED: {
    x: 6,
    y: 13
  },
  BLUE: {
    x: 13,
    y: 8
  },
  GREEN: {
    x: 1,
    y: 6
  },
  YELLOW: {
    x: 8,
    y: 1
  }
};
exports.START_POSITIONS = START_POSITIONS;
var PLAYERS = ["RED", "BLUE", "GREEN", "YELLOW"];
exports.PLAYERS = PLAYERS;
},{}],"token.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Token = /*#__PURE__*/function () {
  function Token(boardSize, x, y, color, dir) {
    _classCallCheck(this, Token);

    this.x = x;
    this.y = y;
    this.radius = boardSize / 32;
    this.stepSize = boardSize / 15;
    this.color = color;
    this.centerX = (x + 0.5) * this.stepSize;
    this.centerY = (y + 0.5) * this.stepSize; // @ts-ignore

    this.open = false;
    this.dir = dir;
  }

  _createClass(Token, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = _constants.TOKEN_COLORS[this.color];
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      this.x = x;
      this.y = y;
      this.centerX = (x + 0.5) * this.stepSize;
      this.centerY = (y + 0.5) * this.stepSize;
    } // Maybe move this function outside. Into Player?

  }, {
    key: "move",
    value: function move(numMoves) {
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
  }, {
    key: "openToken",
    value: function openToken() {
      this.open = true;
      this.moveTo(_constants.START_POSITIONS[this.color].x, _constants.START_POSITIONS[this.color].y);
    }
  }]);

  return Token;
}();

var _default = Token;
exports.default = _default;
},{"./constants":"constants.js"}],"player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = _interopRequireDefault(require("./token"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Player = function Player(boardSize, color) {
  _classCallCheck(this, Player);

  this.turn = false;
  this.tokens = _constants.HOME_POSITIONS[color].map(function (position) {
    return new _token.default(boardSize, position.x, position.y, color, getDirection(color));
  });
};

var _default = Player;
exports.default = _default;
},{"./token":"token.js","./constants":"constants.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _board = _interopRequireDefault(require("./board"));

var _token = _interopRequireDefault(require("./token"));

var _player = _interopRequireDefault(require("./player"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-nocheck
var BOARD_SIZE = 600;
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

function clearBoard() {
  ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}

function isIntersecting(point, token) {
  return Math.sqrt(Math.pow(point.x - token.centerX, 2) + Math.pow(point.y - token.centerY, 2)) < token.radius;
}

function refreshBoard(board, players, ctx) {
  clearBoard();
  board.draw(ctx);
  players.forEach(function (player) {
    return player.tokens.forEach(function (token) {
      return token.draw(ctx);
    });
  });
}

function callback(e) {
  var mousePosition = getMousePos(canvas, e);
  players.forEach(function (player) {
    player.tokens.forEach(function (token) {
      if (token.open && player.turn && isIntersecting(mousePosition, token)) {
        token.move(5);
        refreshBoard(board, players, ctx); // requestAnimationFrame(callback);
      }
    });
  });
}

var board = new _board.default(BOARD_SIZE);

var players = _constants.PLAYERS.map(function (playerColor) {
  return new _player.default(BOARD_SIZE, playerColor);
});

canvas.width = BOARD_SIZE;
canvas.height = BOARD_SIZE;
board.draw(ctx);
players.forEach(function (player) {
  return player.tokens.forEach(function (token) {
    return token.draw(ctx);
  });
});
canvas.addEventListener("click", callback);
players[0].tokens[0].openToken();
players[1].tokens[0].openToken();
players[1].turn = true;
refreshBoard(board, players, ctx); // const starttime = 0;
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
},{"./board":"board.js","./token":"token.js","./player":"player.js","./constants":"constants.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62769" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/ludo.e31bb0bc.js.map
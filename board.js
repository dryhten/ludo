class Board {
  constructor(boardSize) {
    this.size = boardSize;
    this.strokeWidth = 1;
    this.space = this.size / 5;
    this.squareSide = this.space * 2;
    this.rowSide = this.space / 3;
  }

  draw(ctx) {
    // Background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, this.size, this.size);

    // Home rows
    this.drawHomeRows(ctx);

    // Grid
    this.drawGrid(ctx);

    // Corners
    this.drawHomeCorners(ctx);

    // Center
    this.drawCenter(ctx);

    // Home circles
    this.drawHomeCircles(ctx);
  }

  drawHomeCircles(ctx) {
    this.drawCircles(ctx, this.squareSide / 2, this.squareSide / 2);
    this.drawCircles(
      ctx,
      this.squareSide / 2 + this.space + this.squareSide,
      this.squareSide / 2
    );
    this.drawCircles(
      ctx,
      this.squareSide / 2,
      this.squareSide / 2 + this.space + this.squareSide
    );
    this.drawCircles(
      ctx,
      this.squareSide / 2 + this.space + this.squareSide,
      this.squareSide / 2 + this.space + this.squareSide
    );
  }

  drawHomeCorners(ctx) {
    this.drawSquare(ctx, 0, 0, "#0f0");
    this.drawSquare(ctx, this.squareSide + this.space, 0, "#ff0");
    this.drawSquare(
      ctx,
      this.squareSide + this.space,
      this.squareSide + this.space,
      "#00f"
    );
    this.drawSquare(ctx, 0, this.squareSide + this.space, "#f00");
  }

  drawHomeRows(ctx) {
    ctx.fillStyle = "#0f0";
    ctx.fillRect(this.rowSide, this.squareSide, this.rowSide, this.rowSide * 2);
    ctx.fillRect(
      this.rowSide * 2,
      this.squareSide + this.rowSide,
      this.rowSide * 4,
      this.rowSide
    );
    ctx.fillStyle = "#ff0";
    ctx.fillRect(
      this.squareSide + this.rowSide,
      this.rowSide,
      this.rowSide * 2,
      this.rowSide
    );
    ctx.fillRect(
      this.squareSide + this.rowSide,
      this.rowSide * 2,
      this.rowSide,
      this.rowSide * 4
    );
    ctx.fillStyle = "#00f";
    ctx.fillRect(
      this.size - this.rowSide * 2,
      this.squareSide + this.rowSide,
      this.rowSide,
      this.rowSide * 2
    );
    ctx.fillRect(
      this.squareSide + this.space,
      this.squareSide + this.rowSide,
      this.rowSide * 4,
      this.rowSide
    );
    ctx.fillStyle = "#f00";
    ctx.fillRect(
      this.squareSide,
      this.size - this.rowSide * 2,
      this.rowSide * 2,
      this.rowSide
    );
    ctx.fillRect(
      this.squareSide + this.rowSide,
      this.squareSide + this.space,
      this.rowSide,
      this.rowSide * 4
    );
  }

  drawCenter(ctx) {
    ctx.fillStyle = "#0f0";
    ctx.beginPath();
    ctx.moveTo(this.squareSide, this.squareSide);
    ctx.lineTo(
      this.squareSide + this.space / 2,
      this.squareSide + this.space / 2
    );
    ctx.lineTo(this.squareSide, this.squareSide + this.space);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ff0";
    ctx.beginPath();
    ctx.moveTo(this.squareSide, this.squareSide);
    ctx.lineTo(this.squareSide + this.space, this.squareSide);
    ctx.lineTo(
      this.squareSide + this.space / 2,
      this.squareSide + this.space / 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#00f";
    ctx.beginPath();
    ctx.moveTo(this.squareSide + this.space, this.squareSide);
    ctx.lineTo(this.squareSide + this.space, this.squareSide + this.space);
    ctx.lineTo(
      this.squareSide + this.space / 2,
      this.squareSide + this.space / 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo(this.squareSide, this.squareSide + this.space);
    ctx.lineTo(this.squareSide + this.space, this.squareSide + this.space);
    ctx.lineTo(
      this.squareSide + this.space / 2,
      this.squareSide + this.space / 2
    );
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

  drawCircle(ctx, x, y) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, this.rowSide, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.stroke();
  }

  drawSquare(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, this.squareSide, this.squareSide);
  }

  drawGrid(ctx) {
    ctx.fillStyle = "#000";
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();
    for (let i = 0; i < this.size + this.rowSide; i += this.rowSide) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.size);
      ctx.moveTo(0, i);
      ctx.lineTo(this.size, i);
    }
    ctx.closePath();
    ctx.stroke();
  }

  drawCircles(ctx, x, y) {
    ctx.beginPath();
    this.drawCircle(ctx, x - this.squareSide / 4, y - this.squareSide / 4);
    this.drawCircle(ctx, x + this.squareSide / 4, y - this.squareSide / 4);
    this.drawCircle(ctx, x - this.squareSide / 4, y + this.squareSide / 4);
    this.drawCircle(ctx, x + this.squareSide / 4, y + this.squareSide / 4);
  }
}

export default Board;

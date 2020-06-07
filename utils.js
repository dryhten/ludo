export function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

export function isIntersecting(point, token) {
  return (
    Math.sqrt((point.x - token.centerX) ** 2 + (point.y - token.centerY) ** 2) <
    token.radius
  );
}

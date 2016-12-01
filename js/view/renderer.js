var Renderer = function() {}

Renderer.drawBear = function(ctx, centerX, centerY, sizeX, sizeY) {
  ctx.drawImage(BEAR, centerX - sizeX / 2, centerY - sizeY / 2, sizeX, sizeY);
}

Renderer.drawBike = function(ctx, centerX, centerY, sizeX, sizeY) {
  ctx.drawImage(BIKE, centerX - sizeX / 2, centerY - sizeY / 2, sizeX, sizeY);
}

Renderer.drawWater = function(ctx, centerX, centerY, sizeX, sizeY, angle) {
  ctx.translate(centerX, centerY)
  ctx.rotate(angle)
  ctx.drawImage(WATER, - sizeX / 2, - sizeY / 2, sizeX, sizeY)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

Renderer.drawArrowButton = function(ctx, centerX, centerY, sizeX, sizeY) {
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(centerX - sizeX / 4, centerY - sizeY / 4);
  ctx.lineTo(centerX + sizeX / 4, centerY);
  ctx.lineTo(centerX - sizeX / 4, centerY + sizeY / 4);
  ctx.closePath();
  ctx.fill();
}

Renderer.drawThumb = function(ctx, centerX, centerY, sizeX, sizeY) {
  ctx.drawImage(THUMB, centerX - sizeX / 2, centerY - sizeY / 2, sizeX, sizeY);
}

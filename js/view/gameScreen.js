var GameScreen = function(model) {
  this.model = model;
  Panel.call(this, 0, 0, 800, 600);
  this.color = "#AAAAAA";
}

GameScreen.prototype = Object.create(Panel.prototype);

GameScreen.prototype.keydownHandler = function(keyEvent) {
  this.model.keydownHandler(keyEvent);
}
GameScreen.prototype.postprocess = function(ctx, windowX, windowY) {
  var x1 = this.model.player1.x * 700;
  var y1 = (1 - this.model.player1.y) * 100;
  ctx.drawImage(BEAR, x1 + windowX, 250 + windowY, 100, 100)
  Renderer.drawWater(ctx, 200, 100, 100, 100, (1 - this.model.player1.y) * Math.PI)
  Renderer.drawBear(ctx, 150, 150, 50, 50);
  for (var i = 0; i < this.model.player1.laps; i++) {
    Renderer.drawThumb(ctx, 10 + 20 * i, 225, 20, 20);
  }

  var x2 = this.model.player2.x * 700;
  var y2 = (1 - this.model.player2.y) * 100;
  ctx.drawImage(BIKE, x2 + windowX, windowY + 450, 100, 100);
  Renderer.drawWater(ctx, 600, 100, 100, 100, (1 - this.model.player2.y) * Math.PI)
  Renderer.drawBike(ctx, 550, 150, 50, 50);
  for (var i = 0; i < this.model.player2.laps; i++) {
    Renderer.drawThumb(ctx, 10 + 20 * i, 425, 20, 20);
  }

  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0 + windowX, 200 - 10 + windowY, 800, 20);
  ctx.fillRect(0 + windowX, 400 - 10 + windowY, 800, 20);
  ctx.font = "48px serif";
  ctx.fillText((Math.round(this.model.timer * 100)/100).toString(), 400, 100);
}

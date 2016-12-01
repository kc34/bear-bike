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
  ctx.drawImage(BEAR, x1 + windowX, 200 + windowY, 100, 100)
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(100 + windowX, 100 + y1 + windowY, 50, 100 - y1);

  var x2 = this.model.player2.x * 700;
  var y2 = (1 - this.model.player2.y) * 100;
  ctx.drawImage(BIKE, x2 + windowX, windowY + 500, 100, 100);
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(100 + windowX, 100 + y2 + windowY + 300, 50, 100 - y2);
}

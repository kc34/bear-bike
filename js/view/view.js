"use strict";
function View(model) {
  this.model = model;
  ViewPanel.call(this, document.getElementById("myCanvas"));

  this.color = "#CCCCCC";
  this.putMainMenu();
}

View.prototype = Object.create(ViewPanel.prototype);

View.prototype.putMainMenu = function() {
  this.components = {};
  var mainMenu = new Panel(0, 0, 800, 600);
  mainMenu.color = "#44AA44";

  mainMenu.postprocess = function(ctx, windowX, windowY) {
    Renderer.drawBear(ctx, 225, 225, 250, 250);
    Renderer.drawBike(ctx, 575, 225, 250, 250);
  }

  var nextButton = new Panel(650, 450, 100, 100);
  nextButton.color = "#22CC22"
  nextButton.clickHandler = function() {
    this.parent.parent.putInstructions();
  }
  nextButton.postprocess = function(ctx, windowX, windowY) {
    Renderer.drawArrowButton(ctx, windowX + 50, windowY + 50, 100, 100)
    // ctx.drawImage(BEAR, 5 + windowX, 5 + windowY, 90, 90);
  }

  mainMenu.addComponent("nextButton", nextButton);
  this.addComponent("mainMenu", mainMenu);
}

View.prototype.putInstructions = function() {
  this.components = {};
  var mainMenu = new Panel(0, 0, 800, 600);
  mainMenu.color = "#44AA44";

  mainMenu.postprocess = function(ctx, windowX, windowY) {
    ctx.fillStyle = "#AAAAAA";
    ctx.fillRect(200, 100, 400, 300)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(200, 195, 400, 10)
    ctx.fillRect(200, 295, 400, 10)
    Renderer.drawBear(ctx, 225, 250, 50, 50)
    Renderer.drawWater(ctx, 300, 150, 50, 50, 0.66)
    Renderer.drawBike(ctx, 425, 350, 50, 50)
    Renderer.drawWater(ctx, 500, 150, 50, 50, 0)
    ctx.font = "48px serif";
    ctx.fillText("s", 300, 50+24);
    ctx.fillText("k", 500, 50+24);
    ctx.fillText("a & d", 600, 250+24);
    ctx.fillText("j & l", 600, 350+24);

    ctx.fillStyle = "#FF0000";
    ctx.fillText("#1", 400, 150);
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(200, 100, 400, 95)

    ctx.fillStyle = "#0000FF";
    ctx.fillText("#2", 400, 300);
    ctx.strokeStyle = "#0000FF";
    ctx.strokeRect(200, 205, 400, 195)
  }

  var startButton = new Panel(650, 450, 100, 100);
  startButton.color = "#22CC22"
  startButton.clickHandler = function() {
    this.parent.parent.startGame();
  }
  startButton.postprocess = function(ctx, windowX, windowY) {
    Renderer.drawArrowButton(ctx, windowX + 50, windowY + 50, 100, 100)
    //ctx.drawImage(BIKE, 5 + windowX, 5 + windowY, 90, 90);
  }
  mainMenu.addComponent("startButton", startButton);
  this.addComponent("mainMenu", mainMenu);
}

View.prototype.connect = function(model) {
  this.model = model
  this.model.view = this
}

View.prototype.startGame = function() {
  this.removeComponent("mainMenu");
  this.model.start();

  var gameScreen = new GameScreen(this.model);

  this.addComponent("gameScreen", gameScreen)

  this.model.start();
}

View.prototype.endGame = function(winnerID, finalTime) {
  this.components = {}
  var endScreen = new Panel(0, 0, 800, 600);
  this.addComponent("endScreen", endScreen);
  var music = new Audio("js/assets/supa-hot-fire.mp3");
  music.play();
  endScreen.color = "#44AA44";
  if (winnerID == 1) {
    endScreen.drawPanel = function(ctx, windowX, windowY) {
      ctx.drawImage(BEAR, 0, 0, 800, 600);
      ctx.font = "48px serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText((Math.round(finalTime * 100)/100).toString(), 400, 100);
    }
  } else {
    endScreen.drawPanel = function(ctx, windowX, windowY) {
      ctx.drawImage(BIKE, 0, 0, 800, 600);
      ctx.font = "48px serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText((Math.round(finalTime * 100)/100).toString(), 400, 100);
    }
  }

  var nextButton = new Panel(650, 450, 100, 100);
  nextButton.color = "#22CC22"
  nextButton.clickHandler = function() {
    this.parent.parent.putMainMenu();
  }
  nextButton.postprocess = function(ctx, windowX, windowY) {
    Renderer.drawArrowButton(ctx, windowX + 50, windowY + 50, 100, 100)
  }

  endScreen.addComponent("nextButton", nextButton);

}

// View.prototype.preprocess = function(ctx, offsetX, offsetY) {
//
//   /**
//    * Defaults to 1920 by 1080 with at least x% margins.
//    */
//   var margins = 0.00;
//   // What's the limiting factor?
//   if (this.width * 1.0 / this.height > 1920 / 1080) {
//     // Wider. Capped on height.
//     this.components["exampleMainScreen"].y = this.height * margins;
//     this.components["exampleMainScreen"].height = this.height * (1 - 2 * margins);
//     this.components["exampleMainScreen"].x = (this.width - this.height / 1080 * 1920 * (1 - 2 * margins)) * 0.5;
//     this.components["exampleMainScreen"].width = this.height / 1080 * 1920 * (1 - 2 * margins);
//   } else {
//     // Taller. Capped on width.
//     this.components["exampleMainScreen"].x = this.width * margins;
//     this.components["exampleMainScreen"].width = this.width * (1 - 2 * margins);
//     this.components["exampleMainScreen"].y = (this.height - this.width / 1920 * 1080 * (1 - 2 * margins)) * 0.5;
//     this.components["exampleMainScreen"].height = this.width / 1920 * 1080 * (1 - 2 * margins);
//   }
// }

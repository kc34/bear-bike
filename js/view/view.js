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

  var startButton = new Panel(50, 450, 100, 100);
  startButton.color = "#22CC22"
  startButton.clickHandler = function() {
    this.parent.parent.startGame();
  }
  startButton.postprocess = function(ctx, windowX, windowY) {
    ctx.drawImage(BEAR, 5 + windowX, 5 + windowY, 90, 90);
  }

  mainMenu.addComponent("startButton", startButton);
/*
  var otherButton = new Panel(650, 450, 100, 100);
  otherButton.color = "#22CC22"

  otherButton.postprocess = function(ctx, windowX, windowY) {
    ctx.drawImage(BIKE, 5 + windowX, 5 + windowY, 90, 90);
  }
  mainMenu.addComponent("otherButton", otherButton);
  */

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

View.prototype.endGame = function(winnerID) {
  var endScreen = new Panel(0, 0, 800, 600);
  this.addComponent("endScreen", endScreen);
  endScreen.color = "#44AA44";
  if (winnerID == 1) {
    endScreen.postprocess = function(ctx, windowX, windowY) {
      ctx.drawImage(BEAR, 0, 0, 800, 600);
    }
  } else {
    endScreen.postprocess = function(ctx, windowX, windowY) {
      ctx.drawImage(BIKE, 0, 0, 800, 600);
    }
  }
  endScreen.clickHandler = function() {
    this.parent.putMainMenu();
  }
  this.removeComponent("gameScreen");

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

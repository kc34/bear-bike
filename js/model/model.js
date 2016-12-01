/**
 *
 */
function Model(view) {
  this.view = view;
  this.player1 = {}
  this.player2 = {}
  this.winner = null;
  this.gameState = "NULL";
}

Model.prototype.update = function(dt) {
  if (this.gameState == "RUNNING") {
    this.timer += dt;
  } else {
    this.freeze_timer -= dt;
    if (this.freeze_timer <= 0) {
      if (this.gameState == "FREEZE") {
        this.view.endGame(this.winner, this.timer);
        this.gameState = "ENDED";
      }
    }
  }
}

Model.prototype.start = function() {
  this.player1 = {x : 0, y : 1, nextPedal: "LEFT", mode: "DRINK", laps : 0}
  this.player2 = {x : 0, y : 1, nextPedal: "RIGHT", mode: "DRINK", laps : 0}
  this.timer = -2.0
  this.winner = null;
  this.freeze_timer = 3.0; // How long to freeze after "GAME!";
  this.gameEnded = false;
  this.gameState = "RUNNING";
}

Model.prototype.keydownHandler = function(keyEvent) {
  if (this.timer < 0) {
    return;
  }
  if (this.gameState != "RUNNING") {
    return;
  }
  console.log(keyEvent.keyCode);
  if (keyEvent.keyCode == 65) {
    if (this.player1.nextPedal == "LEFT" && this.player1.mode == "BIKE") {
      this.player1.x += 0.05;
      this.player1.nextPedal = "RIGHT";
      if (this.player1.x >= 1) {
        this.player1.x = 0;
        this.player1.mode = "DRINK";
        this.player1.laps += 1;
      }
    }
  } else if (keyEvent.keyCode == 68) {
    if (this.player1.nextPedal == "RIGHT" && this.player1.mode == "BIKE") {
      this.player1.x += 0.05;
      this.player1.nextPedal = "LEFT";
      if (this.player1.x >= 1) {
        this.player1.x = 0;
        this.player1.mode = "DRINK";
        this.player1.laps += 1;
      }
    }
  } else if (keyEvent.keyCode == 83 && this.player1.mode == "DRINK") {
    this.player1.y -= 0.1;
    if (this.player1.y <= 0.001) {
      this.player1.y = 1;
      this.player1.mode = "BIKE";
    }
  }
  if (keyEvent.keyCode == 74 || keyEvent.keyCode == 37) {
    if (this.player2.nextPedal == "LEFT" && this.player2.mode == "BIKE") {
      this.player2.x += 0.05;
      this.player2.nextPedal = "RIGHT";
      if (this.player2.x >= 1) {
        this.player2.x = 0;
        this.player2.mode = "DRINK";
        this.player2.laps += 1;
      }
    }
  } else if (keyEvent.keyCode == 76 || keyEvent.keyCode == 39) {
    if (this.player2.nextPedal == "RIGHT" && this.player2.mode == "BIKE") {
      this.player2.x += 0.05;
      this.player2.nextPedal = "LEFT";
      if (this.player2.x >= 1) {
        this.player2.x = 0;
        this.player2.mode = "DRINK";
        this.player2.laps += 1;
      }
    }
  } else if ((keyEvent.keyCode == 75 || keyEvent.keyCode == 40) && this.player2.mode == "DRINK") {
    this.player2.y -= 0.1;
    console.log(this.player2.y);
    if (this.player2.y <= 0.001) {
      this.player2.y = 1;
      this.player2.mode = "BIKE";
    }
  }
  if (this.gameState == "RUNNING") {
    if (this.player1.laps == 3) {
      if (this.winner == null) {
        this.winner = 1;
        this.gameState = "FREEZE";
        music = new Audio("js/assets/game.mp3");
        music.play();
      }
    }
    if (this.player2.laps == 3) {
      if (this.winner == null) {
        this.winner = 2;
        this.gameState = "FREEZE";
        music = new Audio("js/assets/game.mp3");
        music.play();
      }
    }
  }
}

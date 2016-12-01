/**
 *
 */
function Model(view) {
  this.view = view;
  this.player1 = {}
  this.player2 = {}
}

Model.prototype.update = function() {
}

Model.prototype.start = function() {
  console.log("Starting!");
  this.player1 = {x : 0, y : 1, nextPedal: "LEFT", mode: "DRINK", laps : 0}
  this.player2 = {x : 0, y : 1, nextPedal: "RIGHT", mode: "DRINK", laps : 0}
}

Model.prototype.keydownHandler = function(keyEvent) {
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
    if (this.player1.y <= 0) {
      this.player1.y = 1;
      this.player1.mode = "BIKE";
    }
  }
  if (keyEvent.keyCode == 37) {
    if (this.player2.nextPedal == "LEFT" && this.player2.mode == "BIKE") {
      this.player2.x += 0.05;
      this.player2.nextPedal = "RIGHT";
      if (this.player2.x >= 1) {
        this.player2.x = 0;
        this.player2.mode = "DRINK";
        this.player2.laps += 1;
      }
    }
  } else if (keyEvent.keyCode == 39) {
    if (this.player2.nextPedal == "RIGHT" && this.player2.mode == "BIKE") {
      this.player2.x += 0.05;
      this.player2.nextPedal = "LEFT";
      if (this.player2.x >= 1) {
        this.player2.x = 0;
        this.player2.mode = "DRINK";
        this.player2.laps += 1;
      }
    }
  } else if (keyEvent.keyCode == 40 && this.player2.mode == "DRINK") {
    this.player2.y -= 0.1;
    if (this.player2.y <= 0) {
      this.player2.y = 1;
      this.player2.mode = "BIKE";
    }
  }
  if (this.player1.laps == 3) {
    this.view.endGame(1);
  }
  if (this.player2.laps == 3) {
    this.view.endGame(2);
  }
}

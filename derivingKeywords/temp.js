//How do I create the desired number of arrays with adequate scope?
//Are there setup in javascript constructor function?

function Bubble(arr, listLevel, bubbleName) {
  this.listDown = false;
  this.reachedEnd = false;
  this.listLevel = listLevel;
  this.totalLevels = 5;
  this.nextProperty;
  this.bubbleName = bubbleName;
  this.textFactor;
  this.colour;
  this.fade = 255;

  this.arrayContained = arr;
  this.categories = [];

  this.location; //= createVector(random(width), random(height)); //width / 2, height / 2);
  this.radius; // = 75;
  this.originLoc;

  this.initialization = function(loc, radius, endLine) {
    this.nextProperty = this.listToProperty(this.listLevel + 1);
    this.colour = this.listToColour(this.listLevel + 1);
    this.sortArrayObjects();
    this.location = loc;
    this.radius = radius;
    this.originLoc = endLine || loc;
    textSize(20);
    var textWide;
    if (this.bubbleName !== "") {
      textWide = textWidth(this.bubbleName);
    } else {
      textWide = textWidth(this.arrayContained.length.toString());
      textWide *= 2;
    }
    this.textFactor = 20 / (textWide / (1.75 * this.radius));
  }

  this.display = function() {
    fill(this.colour);
    if (this.originLoc) {
      stroke(255, 255, 0, 50);
      line(this.location.x, this.location.y, this.originLoc.x, this.originLoc.y);
      noStroke();
    }
    stroke(0, 50);
    ellipse(this.location.x, this.location.y, 2 * this.radius, 2 * this.radius);
    fill(0);
    textSize(this.textFactor);
    textAlign(CENTER, CENTER);
    text(this.bubbleName, this.location.x, this.location.y);
    textSize(this.textFactor / 2);
    text("(" + this.arrayContained.length + ")", this.location.x, this.location.y + this.textFactor);
    noFill();
    noStroke();
  }

  this.outputArrayContained = function() {
    fill(255, this.fade);
    textSize(10);
    var j = 1;
    for (var i = 0; i < this.arrayContained.length; i++) {
      text(this.arrayContained.genus + " " + this.arrayContained.species, 40 * j, i * 10);
      if (i * 10 > height) {
        j++;
      }
    }
    this.fade--;
  }

  this.incomingPressed = function(loc) {
    if (this.listLevel <= this.totalLevels && !this.reachedEnd) {
      if (!this.listDown) {
        if (p5.Vector.dist(this.location, loc) < this.radius) {
          this.listDown = true;
          var time = millis();
          this.cutArray();
          this.prepareNext();
          console.log("Time taken to process " + this.nextProperty + " : " + (millis() - time));
        }
      } else {
        for (var i = 0; i < this.categories.length; i++) {
          this.categories[i].incomingPressed(loc);
        }
      }
    } else {
      this.reachedEnd = true;
    }
  }

  this.cutArray = function() {
    var previousIndex = 0;
    for (var i = 1; i < this.arrayContained.length; i++) {
      if (i < this.arrayContained.length - 1) {
        if (this.arrayContained[i - 1][this.nextProperty] != this.arrayContained[i][this.nextProperty]) { // != or !==
          this.categories.push(new Bubble(this.arrayContained.slice(previousIndex, i - 1), this.listLevel + 1, this.arrayContained[i - 1][this.nextProperty]));
          previousIndex = i;
        }
      } else {
        this.categories.push(new Bubble(this.arrayContained.slice(previousIndex, i), this.listLevel + 1, this.arrayContained[i][this.nextProperty]));
      }
    }
  }


  this.listToProperty = function(level) {
    if (level === 1) {
      return "kingdom";
    } else if (level === 2) {
      return "phylum";
    } else if (level === 3) {
      return "clas";
    } else if (level === 4) {
      return "order";
    } else if (level === 5) {
      return "family";
    } else if (level === 0) {
      return "begin";
    } else {
      return "Not valid/exhausted all the options";
    }
  }
  this.listToColour = function(level) {
    if (level === 1) {
      return color(255, 255, 0); //yellow
    } else if (level === 2) {
      return color(0, 255, 255); //cyan
    } else if (level === 3) {
      return color(255, 0, 255); //magenta
    } else if (level === 4) {
      return color(75, 0, 130); //indigo
    } else if (level === 5) {
      return color(12, 240, 116); // aqua green
    } else if (level === 0) {
      return color(255);
    } else {
      return color(255);
    }
  }


  this.prepareNext = function() {
    var angleRotate = 360 / this.categories.length;
    var nextRadius = Math.pow(Math.pow(this.radius, 2) / this.categories.length, 1 / 2);
    for (var j = 0; j < this.categories.length; j++) {
      var newCenter = this.location.copy();
      newCenter = newCenter.sub(this.originLoc);
      newCenter = newCenter.mult(2);
      newCenter = newCenter.add(this.originLoc)
      var newLocX = (this.radius * Math.cos(radians(angleRotate * j)) + newCenter.x);
      var newLocY = (this.radius * Math.sin(radians(angleRotate * j)) + newCenter.y);
      this.categories[j].initialization(createVector(newLocX, newLocY), nextRadius, createVector(newCenter.x, newCenter.y));
    }
  }

  this.decide = function() {
    if (!this.reachedEnd) {
      if (!this.listDown) {
        this.display();
      } else {
        for (var i = 0; i < this.categories.length; i++) {
          this.categories[i].decide();
        }
      }
    } else {
      this.outputArrayContained();
    }
  }

  this.sortArrayObjects = function() {
    if (this.arrayContained.length > 20) {
      this.arrayContained.sort(function(a, b) {
        var nameA = a[this.nextProperty].toLowerCase();
        var nameB = b[this.nextProperty].toLowerCase();
        if (nameA < nameB) { //sort string ascending
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      }.bind(this))
    } else {
      for (var i = 0; i < this.arrayContained.length; i++) { //insertionSort
        var current = this.arrayContained[i][this.nextProperty].toLowerCase();
        var currentObject = this.arrayContained[i][this.nextProperty];
        for (var j = i; j > 0 && this.arrayContained[j - 1][this.nextProperty].toLowerCase() > current; j--) {
          this.arrayContained[j] = this.arrayContained[j - 1];
        }
        this.arrayContained[j] = currentObject;
      }
    }
  }

}

/*
Let's begin:0
kingdom:1 
phylum:2
class:3
order:4 
family:5
*/

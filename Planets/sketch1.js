const G = 6.674*(10^(-11));
const PI = 3.141592653589793;

var Canvas = {
  x: 2000,
  y: 2000,
};

const Max = {
  diameter: 100,
  velocity: 0,
  acceleration: 0,
  mass: 50,
};

let planets = [];

function setup() {
  createCanvas(Canvas.x, Canvas.y);
}

function draw() {
  background(50);
  noStroke();
  fill(sun.color.r, sun.color.g, sun.color.b);
  ellipse(sun.x, sun.y, sun.diameter, sun.diameter);
  for (i = 0; i < planets.length; i++) {
  planets[i].move();
  planets[i].show();
  }
}

function mousePressed(){
		let p = new Planet;
		planets.push(p);
}

class Planet {
  constructor(x, y, diameter, density, mass, color) {
    this.x = mouseX;
    this.y = mouseY;
    this.diameter = random(0, Max.diameter);
    this.mass = random(0, Max.mass);
    this.velocity = {
      x: random(-Max.velocity, Max.velocity),
      y: random(-Max.velocity, Max.velocity),
    };
    this.acceleration = {
      x: random(-Max.acceleration, Max.acceleration),
      y: random(-Max.acceleration, Max.acceleration),
    };
    this.color = {
      r: random(0, 250),
      g: random(0, 250),
      b: random(0, 250),
    };
    this.xDirection = {
      sun: 0,
      other: 0,
    };
    this.yDirection = {
      sun: 0,
      other: 0,
    };
  }

  move() {
    if(this.x > sun.x){this.xDirection.sun = -1}
    else{this.xDirection.sun = 1}
    if(this.y > sun.y){this.yDirection.sun = -1}
    else{this.yDirection.sun = 1}
    this.acceleration.x =
      this.acceleration.x +
      G * this.xDirection.sun * sun.mass/((sun.x - this.x)^2);
    this.acceleration.y =
      this.acceleration.y +
      G * this.yDirection.sun * sun.mass/((sun.y - this.y)^2);
    this.velocity.x = this.velocity.x + this.acceleration.x;
    this.velocity.y = this.velocity.y + this.acceleration.y;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

  show() {
  noStroke();
  fill(this.color.r, this.color.g, this.color.b);
  ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

var sun = {
    x : Canvas.x/2,
    y : Canvas.y/2,
    diameter : 200,
    mass : 300,
    color : {
      r: 200,
      g: 100,
      b: 0,
    },
  };
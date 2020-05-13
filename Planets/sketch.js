const G = 6.674*10^(-11);
var numPressed = 0;

let planets = [];
let copies = [];
let lines = [];

var Canvas = {x: 7000, y: 3500};

var sun = {
    x : Canvas.x/2,
    y : Canvas.y/2,
    diameter : 200,
    mass : 10000,
    color : {
      r: 200,
      g: 100,
      b: 0,
    },
};

function setup() {
  createCanvas(Canvas.x, Canvas.y);
  }

function draw() {
  background(210);
  noStroke();
  fill(sun.color.r, sun.color.g, sun.color.b);
  ellipse(sun.x, sun.y, sun.diameter, sun.diameter);
  for (i = 0; i < planets.length; i++) {
	planets[i].show();
  }
  CreateCopy();
  for (i = 0; i < copies.length; i++) {
	copies[i].move();
	copies[i].show();
  }
  
}

  
class Copy {
  constructor() {
	this.x = planets[0].x;
	this.y = planets[0].y;
	this.accelerationX = planets[0].x - mouseX;
	this.accelerationY = planets[0].y - mouseY;
    this.diameter = 100;
    this.mass = 50;
    this.velocity = {
      x: 0,
      y: 0,
    };
    
	this.color = {
      r: planets[0].color.r,
      g: planets[0].color.g,
      b: planets[0].color.b,
    };
    this.direction = {
      sun: 0,
      other: 0,
	};
  }

  move() {
    this.direction.sun = atan2(sun.y - this.y, sun.x - this.x)
    this.accelerationX =
      this.accelerationX +
      (G * sin(this.direction.sun) * sun.mass)/((dist(sun.x, sun.y, this.x, this.y))^2);
    this.accelerationY =
      this.accelerationY +
      (G * cos(this.direction.sun) * sun.mass)/((dist(sun.x, sun.y, this.x, this.y))^2);
	this.velocity.x = this.velocity.x + this.accelerationX;
    this.velocity.y = this.velocity.y + this.accelerationY;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

  show() {
  noStroke();
  fill(this.color.r, this.color.g, this.color.b, 90);
  ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class Planet {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.diameter = 100;
    this.mass = 50;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.acceleration = {
      x: 0,
      y: 0,
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

  show() {
  noStroke();
  fill(this.color.r, this.color.g, this.color.b);
  ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function mousePressed(){
	if (numPressed == 0){
		let p = new Planet;
		planets.push(p);
		numPressed++;
		}
}

function CreateCopy(){
	if (numPressed == 1){
		let c = new Copy();
		copies.push(c);
	}
}



class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 9;
    this.maxSpeed = 10;
    this.maxForce = 1;
  }

  behaviors() {
    const arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);

    arrive.mult(.2);
    flee.mult(5);


    this.addForce(arrive);
    this.addForce(flee)

  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(255);
    strokeWeight(9);
    point(this.pos.x, this.pos.y);
  }

  addForce(f) {
    this.acc.add(f);
  }

  arrive(target) {
    let desire = p5.Vector.sub(target, this.pos);
    let speed = this.maxSpeed;
    let d = desire.mag();
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    if (speed === 0)
      desire.mult(0)
    else
      desire.setMag(speed);
    const steer = p5.Vector.sub(desire, this.vel);
    steer.limit(this.maxForce);

    return steer;
  }


  flee(target) {
    const desire = p5.Vector.sub(target, this.pos);
    let d = desire.mag()
    if (d < 50) {
      desire.setMag(this.maxSpeed);
      desire.mult(-1);
      const steer = p5.Vector.sub(desire, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }

  }
}



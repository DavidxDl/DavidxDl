let font;
let vehicles = [];
function preload() {
  font = loadFont("./Inconsolata/Inconsolata.otf")
}
function setup() {
  createCanvas(1270, 200);

  let points = font.textToPoints("David Elich", 100, 170, 192)
  for (const pt of points) {
    const vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  console.log(vehicles)
}

function draw() {
  background(0)
  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
    vehicle.behaviors()
    vehicle.show()
    vehicle.update()
  }

}

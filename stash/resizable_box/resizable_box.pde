void setup() {
  fullScreen();
}

void draw() {
  background(0);
  noFill();
  stroke(255);
  strokeWeight(5);
  beginShape();
  vertex(50, 50);
  vertex(200, 50);
  vertex(200, 200);
  vertex(50, 200);
  endShape(CLOSE);
}  
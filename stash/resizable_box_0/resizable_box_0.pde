import controlP5.*;

ControlP5 cp5;

DBox[] dbox = new DBox[3];        // detection box

int[] populations = new int[4];
float[] distances = new float[4];

final static float fieldOfView = 0.84823; // kinect v1 field of view angle in radians
final static int roomWidth = 800;         // room  width and height 
final static int roomHeight = 600;        // TODO : custom coor sys to have real dimensions    
final static int viewWidth = 640/2;       // view width scaling for rendering on screen
final static int viewHeight = 480/2;      
JSONObject data;                          // data stored from previous session

void setup() {
  size(1500, 1000);
  frameRate(30);

  //-------------------------------------------------------------
  //                     SETUP DETECTION BOX
  dbox[0] = new DBox(0, 20);
  dbox[1] = new DBox(1, 20);
  dbox[2] = new DBox(2, 20);

 //-------------------------------------------------------------
  //                      SET UP USER INTERFACE
  // controlP5 lib for controllers : buttons, sliders, etc
  cp5 = new ControlP5(this);
  setupControl();
}

void draw() { 
  background(140, 140, 140);

  //-------------------------------------------------------------
  //                      DISPLAY DASHBOARD

  // shift to virtual room area
  pushMatrix();
  translate(0, 200);
  fill(#AAAAAA);
  noStroke();
  rect(20, 0, roomWidth, roomHeight);
  popMatrix();

  // Display framerate (style in Toolbox)
  displayFramerate();


  //-------------------------------------------------------------
  //                       DBOX RENDERING

  dbox[0].update();
  dbox[0].display();
  dbox[1].update();
  dbox[1].display();
  dbox[2].update();
  dbox[2].display();
}


void mouseReleased() {
  for (int id = 0; id<dbox.length; id++) {
    dbox[id].releaseEvent();
  }
}
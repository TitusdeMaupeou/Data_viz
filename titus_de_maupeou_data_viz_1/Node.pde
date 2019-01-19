class Node {
  float x, y, d, z;
  String name;

  Node(float x_, float y_, float d_, String name_) {
    x = x_;
    y = y_;
    d = d_;
    name = name_;
  }
  
  void drawNodes() {
    fill(0);
    text(name, x, y);
    //ellipse(x,y,d,d);
  
  }
}

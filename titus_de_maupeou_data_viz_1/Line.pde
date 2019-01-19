class Line {
  float x1,y1,x2,y2,col;
  
  Line(float x1_, float x2_, float y1_, float y2_, float col_) {
    x1 = x1_;
    y1 = y1_;
    x2 = x2_;
    y2 = y2_;
    col = col_;
  }
    void drawLine() {
     fill(col);
     line(x1,x2,y1,y2);
    }
  }
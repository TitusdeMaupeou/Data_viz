Table table; 
PFont mono;

Node[] nodes;
Node[] regionNodes;
Node[] genderNodes;
Node[] birthplaceNodes;
Node[] ageNodes;
Line[] lines;

String[] regions;
String[] ages;
String[] genders;
String[] birthplaces;

PVector line1From;
PVector line1To;
PVector line2From;
PVector line2To;
PVector line2Z;
PVector line3From;
PVector line3To;

float opacity;
float curveSeed = -5;

void setup() { 
  //fullScreen();
  fullScreen();
  background(255);
  smooth(0);
  textSize(30);
  loadData();
  displayNodes();
  displayLinks();
  save("dataviz1.png");
}

void draw() {
  for (Node n : ageNodes) {
    n.drawNodes();
  }

  for (Node n : birthplaceNodes) {
    n.drawNodes();
  }

  for (Node n : genderNodes) {
    n.drawNodes();
  }

  for (Node n : regionNodes) {
    n.drawNodes();
  }
}

void loadData() {
  table = loadTable("bevolking_belgie_census_2011.csv", "header");
}

void displayNodes() {
  //Nodes for the regions
  regions = table.getUnique("TX_GEO_DESCR_NL_LVL_1");
  regionNodes = new Node[regions.length];  
  for (int i = 0; i < regions.length; i++) {
    regionNodes[i] = new Node(random(0, width), random(0, height), random(0, 10), regions[i]);
  }
  genders = table.getUnique("TX_SEX_DESCR_NL_LVL_1");
  genderNodes = new Node[genders.length];
  for (int i = 0; i < genders.length; i++) {
    genderNodes[i] = new Node(random(0, width), random(0, height), 5, genders[i]);
  }
  birthplaces = table.getUnique("TX_POB_DESCR_NL_LVL_1");
  birthplaceNodes = new Node[birthplaces.length];
  for (int i = 0; i < birthplaces.length; i++) {
    birthplaceNodes[i] = new Node(random(0, width), random(0, height), 10, birthplaces[i]);
  }
  ages = table.getUnique("TX_AGE_DESCR_NL_LVL_1");
  ageNodes = new Node[ages.length];
  for (int i = 0; i < ages.length; i++) {
    ageNodes[i] = new Node(random(0, width), random(0, height), 10, ages[i]);
  }
}

void displayLinks() {
  for (int i = 0; i < table.getRowCount(); i++) {
    TableRow row = table.getRow(i);
    String region = row.getString("TX_GEO_DESCR_NL_LVL_1");
    String age = row.getString("TX_AGE_DESCR_NL_LVL_1");
    String birthplace = row.getString("TX_POB_DESCR_NL_LVL_1");
    for (int j = 0; j < regionNodes.length; j++) {
      if (region.equals(regionNodes[j].name)) {
        line1From = new PVector(regionNodes[j].x, regionNodes[j].y);
        line2To = new PVector(regionNodes[j].x, regionNodes[j].y);
        opacity+=0.02;
      } else {
        println("region not found");
      }
    }
    for (int k = 0; k < ageNodes.length; k++) {
      if (age.equals(ageNodes[k].name)) {
        line1To = new PVector(ageNodes[k].x, ageNodes[k].y);
        line3From = new PVector(ageNodes[k].x, ageNodes[k].y);
      } else {
        println("age not found");
      }
    }
    for (int l = 0; l < birthplaces.length; l++) {
      if (birthplace.equals(birthplaceNodes[l].name)) {
        line2From = new PVector(birthplaceNodes[l].x, birthplaceNodes[l].y);
        line3To = new PVector(birthplaceNodes[l].x, birthplaceNodes[l].y);
      }
    }
    noFill();
    strokeWeight(0.2);
    stroke(255, 0, 10, opacity);
    curveSeed++;
    curve(line1From.x - round(random(-3, 3)) * i, line1From.y, line1From.x, line1From.y, line1To.x, line1To.y, line1To.x - round(random(-3, 3)) * i, line1To.y);
    stroke(150, 0, 100, opacity);
    curve(line2From.x - round(random(-3, 3)) * i, line2From.y, line2From.x, line2From.y, line2To.x, line2To.y, line2To.x - round(random(-3, 3))* i, line2To.y);
    stroke(200, 0, 100, opacity);
    curve(line3From.x - round(random(-3, 3)) * i, line3From.y, line3From.x, line3From.y, line3To.x, line3To.y, line3To.x - round(random(-3, 3))* i, line3To.y);
  }
}

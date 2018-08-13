function setup() {
  // put setup code here

  angleMode(DEGREES);
  robotoRegular = loadFont("minesweeper\\assets\\fonts\\roboto\\Roboto-Regular.ttf");
  robotoItalic = loadFont('minesweeper\\assets\\fonts\\roboto\\Roboto-Italic.ttf');
  robotoBold = loadFont('minesweeper\\assets\\fonts\\roboto\\Roboto-Bold.ttf');

  field = new Field();
  let gameDif = 1
  switch (gameDif) {
    case 0:
      //novice
      field.width = 9;
      field.height = 9;
      field.minesCount = 10;
      break;
    case 1:
      //intermidiate
      field.width = 16;
      field.height = 16;
      field.minesCount = 40;
      break;
    case 2:
      //expert
      field.width = 30;
      field.height = 16;
      field.minesCount = 99;
      break;
  }

  field.cellsView = new CellView(30, 30, 3, 15);
  field.prepear();

  let w = field.width * (field.cellsView.width + field.cellsView.padding) + 7;
  let h = field.height * (field.cellsView.width + field.cellsView.padding) + 7;
  createCanvas(w, h);
}

let field;

function mousePressed(e) {
  //console.log('mouse event: ', e);
  field.click(mouseX, mouseY, e.button);
}

function draw() {
  background(210);
  fill(0)
    .strokeWeight(0)
    .textSize(20);

  let goodMark = 0;
  let activeCell = 0;
  for (var i = 0; i < field.width; i++) {
    for (var j = 0; j < field.height; j++) {
      let cell = field.cells[i][j];
      if (cell.isActivated && cell.isMine) {
        //Gave Over
        field.showAllMine("rgb(255, 0, 50)");
      } else if (cell.markState == 'mine' && cell.isMine) {
        goodMark++;
      } else if (cell.isActivated && !cell.isMine) {
        activeCell++;
      }
    }
  }
  //goodMark == field.minesCount
  if (activeCell == field.width * field.height - field.minesCount) {
    //Wins!))
    field.showAllMine("rgb(0, 255, 50)");
  }
  field.render();
}

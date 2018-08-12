class Field {

  constructor() {
    this.width = 9;
    this.height = 9;
    this.minesCount = 10;
    this.cellsView = new CellView();
    this.mineMask = new Array();
    this.cells = new Array();
  }

  showAllMine(color) {
    for (var i = 0; i < field.width; i++) {
      for (var j = 0; j < field.height; j++) {
        let cell = field.cells[i][j];
        if (cell.isMine) {
          cell.renderArgs.color = color;
        }
      }
    }
  }

  click(mx, my, button) {
    const modmx = Math.floor(mx / (this.cellsView.width + this.cellsView.padding));
    const modmy = Math.floor(my / (this.cellsView.width + this.cellsView.padding));
    let args = new CellClickArgs();
    args.button = button;
    this.cells[modmx][modmy].click(args);
  }

  prepear() {
    //Общее количество клеток
    const cellsCount = this.width * this.height;
    //Заполняем мины
    for (var i = 0; i < this.minesCount; i++) {
      this.mineMask.push(1);
    }
    //Заполняем доконца
    for (var i = this.mineMask.length; i < cellsCount; i++) {
      this.mineMask.push(0);
    }
    //Перемешиваем маску
    this.mineMask.sort(function(a, b) {
      return 0.5 - Math.random()
    });
    //Создание ячеек
    for (var i = 0; i < this.width; i++) {
      this.cells.push(new Array());
      for (var j = 0; j < this.height; j++) {
        let cell = new Cell(i, j);
        cell.renderArgs.widthPx = this.cellsView.width;
        cell.renderArgs.heightPx = this.cellsView.height;
        cell.renderArgs.paddindPx= this.cellsView.padding;
        cell.renderArgs.textSize = this.cellsView.textSize;
        let activateFunc;
        //Сравниваем с маской. 1 - это мина
        if (this.mineMask[i * this.height + j] == 1) {
          cell.isMine = true;
          activateFunc = this.bombExplode;
        }
        this.cells[i][j] = cell;
      }
    }

    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        let cell = this.cells[i][j];
        cell.neighbors = this.getNeighbors(i, j)
        cell.calcWeight();
      }
    }
  }

  getNeighbors(x, y) {
    //debugger;
    let result = [];
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if ((i >= 0 && j >= 0) && (i < this.width && j < this.height) && (i != x || j != y)) {
          result.push(this.cells[i][j]);
        } else {
          result.push(null);
        }
      }
    }
    return result;
  }

  render() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        this.cells[i][j].render();
      }
    }
  }

}

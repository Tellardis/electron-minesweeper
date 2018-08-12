class Cell {
  constructor(positionX, positionY) {
    this.neighbors = new Array();
    this.activatedListeners = new Array();
    this.isActivated = false;
    this.positionX = positionX;
    this.positionY = positionY;
    this.renderListenders = new Array();
    this.clickListeners = new Array();

    this.renderArgs = new CellRenderArgs(50, 50, 5);
    this.renderArgs.positionX = positionX;
    this.renderArgs.positionY = positionY;

    this.addEventHandler('render', this.cellRender);

    this.activerArgs = new CellActiveArgs();
    this.isMine = false;
    this.weight = 0;

    this.markState = 'none';

    this.addEventHandler('click', this.onClick);

    this.addEventHandler('activate', (s, a) => {
      if (s.markState == 'none') {
        s.isActivated = true;
      }
    });

    this.addEventHandler('activate', (s, a) => {
      if (s.weight == 0) {
        for (var i = 0; i < s.neighbors.length; i++) {
          let n = s.neighbors[i];
          if (n != null && !n.isMine && !n.isActivated && n.markState == 'none') {
            s.neighbors[i].activate();
          }
        }
      }
    });
  }

  mark() {
    switch (this.markState) {
      case 'none':
        this.markState = "mine";
        break;
      case 'mine':
        this.markState = 'none';
        break;
      default:
        break;
    }
  }

  calcWeight() {
    if (this.isMine) {
      this.weight = -1;
      return;
    }
    for (var i = 0; i < this.neighbors.length; i++) {
      if (this.neighbors[i]) {
        if (this.neighbors[i].isMine) {
          this.weight++;
        }
      }
    }
  }

  addEventHandler(event, listener) {
    switch (event) {
      case "activate":
        this.activatedListeners.push(listener);
        break;
      case "render":
        this.renderListenders.push(listener);
        break;
      case "click":
        this.clickListeners.push(listener);
        break;
      default:
        console.log("Event not exist");
        break;
    }
  }

  render() {
    if (this.renderListenders.length > 0) {
      for (var i = 0; i < this.renderListenders.length; i++) {
        this.renderListenders[i](this, this.renderArgs);
      }
    }
  }

  activate() {
    if (this.activatedListeners.length > 0) {
      for (var i = 0; i < this.activatedListeners.length; i++) {
        this.activatedListeners[i](this, this.activerArgs);
      }
    }
  }

  click(args) {
    if (this.clickListeners.length > 0) {
      for (var i = 0; i < this.clickListeners.length; i++) {
        this.clickListeners[i](this, args);
      }
    }
  }

  onClick(cell, args) {
    if (!cell.isActivated && cell.markState == 'none' && args.button == 0) {
      cell.activate();
    } else if (!cell.isActivated && args.button == 2) {
      cell.mark();
    } else if (cell.isActivated && args.button == 2) {
      cell.accord();
    }
  }

  accord() {
    let markedNeighbor = 0;
    for (var i = 0; i < this.neighbors.length; i++) {
      if (this.neighbors[i] && this.neighbors[i].markState == 'mine') {
        markedNeighbor++;
      }
    }
    if (markedNeighbor == this.weight) {
      for (var i = 0; i < this.neighbors.length; i++) {
        if (this.neighbors[i] && this.neighbors[i].markState == 'none') {
          this.neighbors[i].activate();
        }
      }
    }
  }

  cellRender(cell, args) {
    fill(args.color);
    const cellwidth = args.widthPx;
    const cellPadding = args.paddindPx;
    const px = args.positionX * cellwidth + cellPadding * args.positionX + 5;
    const py = args.positionY * cellwidth + cellPadding * args.positionY + 5;
    rect(px, py, cellwidth, cellwidth);
    if (cell.isActivated === true) {
      fill(0);
      let mineText = "";
      if (cell.isMine) {
        cell.renderArgs.color = "rgb(255, 0, 127)";
        mineText = "E";
      } else {
        cell.renderArgs.color = "rgb(245,255,250)";
        switch (cell.weight) {
          case 1:
            fill('rgb(25,100,225)');
            break;
          case 2:
            fill('rgb(100,200,100)');
            break;
          case 3:
            fill('rgb(255,51,51)');
            break;
          case 4:
            fill('rgb(128,0,128)');
            break;
          case 5:
            fill('rgb(128,0,0)');
            break;
          case 6:
            fill('rgb(64,224,208)');
            break;
          case 7:
            fill('rgb(0,0,0)');
            break;
          case 8:
            fill('rgb(47,79,79)');
            break;
        }
        mineText = !cell.weight ? "" : cell.weight;
      }
      rectMode(CENTER);

      textAlign(CENTER, CENTER);
      textFont(robotoBold);
      textSize(args.textSize);
      text(mineText, px + cellwidth / 2, py + cellwidth / 2, cellwidth, cellwidth);
      rectMode(CORNER);
    } else {
      switch (cell.markState) {
        case 'mine':
          rectMode(CENTER);
          fill(0);
          textAlign(CENTER, CENTER);
          textFont(robotoRegular);
          text("#", px + cellwidth / 2, py + cellwidth / 2, cellwidth, cellwidth);
          rectMode(CORNER);
          break;
        default:
          break;
      }
    }
  }
}

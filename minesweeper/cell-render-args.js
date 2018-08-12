class CellRenderArgs {
  constructor(widthPx, heightPx, paddindPx, color = '255', strokePx = 1, textSize = 22) {
      this.widthPx = widthPx;
      this.heightPx = heightPx;
      this.paddindPx = paddindPx;
      this.color = color;
      this.strokePx = strokePx;
      this.textSize = textSize;
      this.positionX = null;
      this.positionY = null;
  }
}

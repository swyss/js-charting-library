// src/charts/lineChart.js

export default class LineChart {
  constructor(elementId, data, options = {}) {
    this.elementId = elementId;
    this.data = data;
    this.options = options;
    this.initChart();
  }

  /**
   * Initializes the chart by setting up the canvas and drawing the initial chart.
   */
  initChart() {
    // Validate the data
    if (!this.validateData()) {
      return;
    }

    // Get the container element
    const container = document.getElementById(this.elementId);
    if (!container) {
      console.error(`Element with id "${this.elementId}" not found.`);
      return;
    }

    // Set up the canvas
    this.setupCanvas(container);

    // Set chart dimensions and margins
    this.setDimensions();

    // Calculate scaling factors
    this.calculateScales();

    // Draw the initial chart
    this.drawChart();

    // Add interactivity
    this.addEventListeners();
  }

  /**
   * Validates the data provided to the chart.
   * @returns {boolean} True if data is valid, false otherwise.
   */
  validateData() {
    if (!Array.isArray(this.data) || this.data.length === 0) {
      console.error('Data must be a non-empty array.');
      return false;
    }
    if (!this.data.every((value) => typeof value === 'number')) {
      console.error('All data points must be numbers.');
      return false;
    }
    return true;
  }

  /**
   * Sets up the canvas element.
   * @param {HTMLElement} container - The container element for the canvas.
   */
  setupCanvas(container) {
    this.canvas = document.createElement('canvas');

    // Use getBoundingClientRect to get dimensions
    const rect = container.getBoundingClientRect();
    this.canvas.width = rect.width || 600;
    this.canvas.height = rect.height || 400;

    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Sets the dimensions and margins for the chart.
   */
  setDimensions() {
    this.margin = this.options.margin || 50; // Margin for axes and labels
    this.width = this.canvas.width - 2 * this.margin;
    this.height = this.canvas.height - 2 * this.margin;

    // Ensure width and height are positive
    if (this.width <= 0) this.width = 1;
    if (this.height <= 0) this.height = 1;
  }

  /**
   * Calculates scaling factors based on the data range and chart dimensions.
   */
  calculateScales() {
    // Determine the data range
    this.xMin = 0;
    this.xMax = this.data.length - 1;
    this.yMin = Math.min(...this.data);
    this.yMax = Math.max(...this.data);

    // Prevent division by zero
    if (this.yMax === this.yMin) {
      this.yMax += 1;
    }

    // Calculate scale factors
    this.xScale = this.width / (this.xMax - this.xMin);
    this.yScale = this.height / (this.yMax - this.yMin);
  }

  /**
   * Draws the entire chart, including axes, gridlines, and data.
   */
  drawChart() {
    // Clear the canvas
    this.clearCanvas();

    // Draw chart components
    this.drawAxes();
    this.drawGridlines();
    this.drawLine();
  }

  /**
   * Clears the canvas area.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the x and y axes with ticks and labels.
   */
  drawAxes() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.margin, this.margin);
    ctx.strokeStyle = this.options.axisColor || '#000';
    ctx.lineWidth = 1;

    // Draw axis lines
    this.drawAxisLines(ctx);

    // Draw ticks and labels
    this.drawXTicksAndLabels(ctx);
    this.drawYTicksAndLabels(ctx);

    ctx.restore();
  }

  /**
   * Draws the x-axis and y-axis lines.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawAxisLines(ctx) {
    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(this.width, this.height);
    ctx.stroke();

    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(0, 0);
    ctx.stroke();
  }

  /**
   * Draws x-axis ticks and labels.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawXTicksAndLabels(ctx) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = this.options.labelFont || '12px Arial';
    ctx.fillStyle = this.options.labelColor || '#000';

    const numXTicks = this.data.length;
    const xTickInterval = Math.max(1, Math.floor(numXTicks / 10)); // Limit to 10 labels

    for (let i = 0; i <= this.xMax; i += xTickInterval) {
      const x = (i - this.xMin) * this.xScale;
      ctx.beginPath();
      ctx.moveTo(x, this.height);
      ctx.lineTo(x, this.height + 5);
      ctx.stroke();
      // Label
      ctx.fillText(i, x, this.height + 8);
    }
  }

  /**
   * Draws y-axis ticks and labels.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawYTicksAndLabels(ctx) {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const numYTicks = 5;
    for (let i = 0; i <= numYTicks; i++) {
      const y = this.height - (i * this.height) / numYTicks;
      const value = this.yMin + ((this.yMax - this.yMin) * i) / numYTicks;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(-5, y);
      ctx.stroke();
      // Label
      ctx.fillText(value.toFixed(2), -10, y);
    }
  }

  /**
   * Draws the gridlines on the chart.
   */
  drawGridlines() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.margin, this.margin);
    ctx.strokeStyle = this.options.gridColor || '#e0e0e0';
    ctx.lineWidth = 0.5;

    this.drawVerticalGridlines(ctx);
    this.drawHorizontalGridlines(ctx);

    ctx.restore();
  }

  /**
   * Draws vertical gridlines.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawVerticalGridlines(ctx) {
    const numXTicks = this.data.length;
    const xTickInterval = Math.max(1, Math.floor(numXTicks / 10)); // Limit to 10 gridlines

    for (let i = 0; i <= this.xMax; i += xTickInterval) {
      const x = (i - this.xMin) * this.xScale;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws horizontal gridlines.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawHorizontalGridlines(ctx) {
    const numYTicks = 5;
    for (let i = 0; i <= numYTicks; i++) {
      const y = this.height - (i * this.height) / numYTicks;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
  }

  /**
   * Draws the line representing the data and data point markers.
   */
  drawLine() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.margin, this.margin);

    // Draw the line
    this.drawDataLine(ctx);

    // Draw data points
    this.drawDataPoints(ctx);

    ctx.restore();
  }

  /**
   * Draws the data line connecting data points.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawDataLine(ctx) {
    ctx.beginPath();
    for (let i = 0; i < this.data.length; i++) {
      const { x, y } = this.getCanvasCoordinates(i, this.data[i]);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = this.options.lineColor || '#000';
    ctx.lineWidth = this.options.lineWidth || 2;
    ctx.stroke();
  }

  /**
   * Draws markers at each data point.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawDataPoints(ctx) {
    ctx.fillStyle = this.options.pointColor || '#000';

    for (let i = 0; i < this.data.length; i++) {
      const { x, y } = this.getCanvasCoordinates(i, this.data[i]);

      ctx.beginPath();
      ctx.arc(x, y, this.options.pointRadius || 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  /**
   * Converts data coordinates to canvas coordinates.
   * @param {number} index - The index of the data point.
   * @param {number} value - The value of the data point.
   * @returns {{x: number, y: number}} The canvas coordinates.
   */
  getCanvasCoordinates(index, value) {
    const x = (index - this.xMin) * this.xScale;
    const y = this.height - (value - this.yMin) * this.yScale;
    return { x, y };
  }

  /**
   * Adds event listeners for interactivity.
   */
  addEventListeners() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseout', this.handleMouseOut.bind(this));
  }

  /**
   * Handles mouse movement over the canvas to provide interactivity.
   * @param {MouseEvent} event - The mouse event.
   */
  handleMouseMove(event) {
    const mousePos = this.getMousePos(event);

    // Adjust for canvas translation
    const x = mousePos.x - this.margin;
    const y = mousePos.y - this.margin;

    // Find the closest data point
    const closestIndex = this.findClosestDataPoint(x, y);

    if (closestIndex !== null) {
      // Avoid unnecessary redraws
      if (this.highlightedIndex !== closestIndex) {
        this.highlightedIndex = closestIndex;
        this.drawChart(); // Redraw to clear previous highlights
        this.highlightPoint(closestIndex);
        this.showTooltip(closestIndex, mousePos.x, mousePos.y);
      }
    } else {
      if (this.highlightedIndex !== null) {
        this.highlightedIndex = null;
        this.drawChart(); // Redraw to clear highlights
        this.hideTooltip();
      }
    }
  }

  /**
   * Handles mouse out event to hide tooltips and highlights.
   */
  handleMouseOut() {
    if (this.highlightedIndex !== null) {
      this.highlightedIndex = null;
      this.drawChart(); // Redraw to clear highlights
      this.hideTooltip();
    }
  }

  /**
   * Gets the mouse position relative to the canvas.
   * @param {MouseEvent} event - The mouse event.
   * @returns {{x: number, y: number}} The mouse coordinates.
   */
  getMousePos(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  /**
   * Finds the closest data point to the given coordinates.
   * @param {number} x - The x-coordinate on the canvas.
   * @param {number} y - The y-coordinate on the canvas.
   * @returns {number|null} The index of the closest data point or null if none are close.
   */
  findClosestDataPoint(x, y) {
    let closestIndex = null;
    let minDistance = Infinity;

    for (let i = 0; i < this.data.length; i++) {
      const { x: dataX, y: dataY } = this.getCanvasCoordinates(i, this.data[i]);

      const distance = Math.hypot(dataX - x, dataY - y);
      if (distance < minDistance && distance < 10) {
        // 10 pixels threshold
        minDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

  /**
   * Highlights a data point on the chart.
   * @param {number} index - The index of the data point to highlight.
   */
  highlightPoint(index) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.margin, this.margin);

    const { x, y } = this.getCanvasCoordinates(index, this.data[index]);

    ctx.beginPath();
    ctx.arc(
      x,
      y,
      (this.options.pointRadius || 3) + 2, // Slightly larger radius
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this.options.hoverColor || '#ff0';
    ctx.fill();

    ctx.restore();
  }

  /**
   * Displays a tooltip near the cursor with the data point's information.
   * @param {number} index - The index of the data point.
   * @param {number} x - The x-coordinate for tooltip placement.
   * @param {number} y - The y-coordinate for tooltip placement.
   */
  showTooltip(index, x, y) {
    // Create tooltip if it doesn't exist
    if (!this.tooltip) {
      this.tooltip = document.createElement('div');
      this.tooltip.style.position = 'absolute';
      this.tooltip.style.backgroundColor = '#fff';
      this.tooltip.style.border = '1px solid #000';
      this.tooltip.style.padding = '5px';
      this.tooltip.style.pointerEvents = 'none'; // Allows mouse events to pass through
      this.tooltip.style.transition = 'opacity 0.2s';
      this.tooltip.style.opacity = 0;
      document.body.appendChild(this.tooltip);
    }

    // Update tooltip content and position
    this.tooltip.innerHTML = `x: ${index}, y: ${this.data[index]}`;
    this.tooltip.style.left = `${x + 15}px`;
    this.tooltip.style.top = `${y + 15}px`;
    this.tooltip.style.opacity = 1;
  }

  /**
   * Hides the tooltip.
   */
  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.opacity = 0;
    }
  }

  /**
   * Updates the chart with new data.
   * @param {number[]} newData - The new data array.
   */
  updateData(newData) {
    this.data = newData;
    if (!this.validateData()) {
      return;
    }
    this.calculateScales();
    this.drawChart();
  }

  /**
   * Updates the chart options and redraws the chart.
   * @param {object} newOptions - The new options object.
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.setDimensions();
    this.calculateScales();
    this.drawChart();
  }

  /**
   * Resizes the chart based on the container's dimensions.
   */
  resize() {
    const container = document.getElementById(this.elementId);
    if (!container) {
      console.error(`Element with id "${this.elementId}" not found.`);
      return;
    }

    // Use getBoundingClientRect to get new dimensions
    const rect = container.getBoundingClientRect();
    this.canvas.width = rect.width || 600;
    this.canvas.height = rect.height || 400;

    // Redraw the chart
    this.setDimensions();
    this.calculateScales();
    this.drawChart();
  }
}

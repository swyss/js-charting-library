// src/charts/barChart.js

export default class BarChart {
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
        this.xMax = this.data.length;
        this.yMin = 0; // Start from zero for bar charts
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
        this.drawBars();
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

        // Draw x-axis ticks and labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.font = this.options.labelFont || '12px Arial';
        ctx.fillStyle = this.options.labelColor || '#000';

        for (let i = 0; i < this.data.length; i++) {
            const x = (i + 0.5) * this.xScale;
            ctx.beginPath();
            ctx.moveTo(x, this.height);
            ctx.lineTo(x, this.height + 5);
            ctx.stroke();
            // Label
            ctx.fillText(i + 1, x, this.height + 8);
        }

        // Draw y-axis ticks and labels
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

        ctx.restore();
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

        // Vertical gridlines
        for (let i = 0; i <= this.data.length; i++) {
            const x = i * this.xScale;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        // Horizontal gridlines
        const numYTicks = 5;
        for (let i = 0; i <= numYTicks; i++) {
            const y = this.height - (i * this.height) / numYTicks;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    /**
     * Draws the bars representing the data.
     */
    drawBars() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.margin, this.margin);

        const barWidth = this.xScale * 0.8; // 80% of the xScale
        const barColor = this.options.barColor || '#007bff';

        for (let i = 0; i < this.data.length; i++) {
            const x = i * this.xScale + (this.xScale - barWidth) / 2;
            const y = this.height - (this.data[i] - this.yMin) * this.yScale;
            const height = (this.data[i] - this.yMin) * this.yScale;

            ctx.fillStyle = barColor;
            ctx.fillRect(x, y, barWidth, height);
        }

        ctx.restore();
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

        // Find the bar under the cursor
        const barIndex = this.getBarIndexAtPosition(x, y);

        if (barIndex !== null) {
            // Avoid unnecessary redraws
            if (this.highlightedIndex !== barIndex) {
                this.highlightedIndex = barIndex;
                this.drawChart(); // Redraw to clear previous highlights
                this.highlightBar(barIndex);
                this.showTooltip(barIndex, mousePos.x, mousePos.y);
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
     * Finds the index of the bar at the given position.
     * @param {number} x - The x-coordinate on the canvas.
     * @param {number} y - The y-coordinate on the canvas.
     * @returns {number|null} The index of the bar or null if none.
     */
    getBarIndexAtPosition(x, y) {
        const barWidth = this.xScale * 0.8;

        for (let i = 0; i < this.data.length; i++) {
            const barX = i * this.xScale + (this.xScale - barWidth) / 2;
            const barY = this.height - (this.data[i] - this.yMin) * this.yScale;
            const barHeight = (this.data[i] - this.yMin) * this.yScale;

            if (
                x >= barX &&
                x <= barX + barWidth &&
                y >= barY &&
                y <= barY + barHeight
            ) {
                return i;
            }
        }

        return null;
    }

    /**
     * Highlights a bar on the chart.
     * @param {number} index - The index of the bar to highlight.
     */
    highlightBar(index) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.margin, this.margin);

        const barWidth = this.xScale * 0.8;
        const x = index * this.xScale + (this.xScale - barWidth) / 2;
        const y = this.height - (this.data[index] - this.yMin) * this.yScale;
        const height = (this.data[index] - this.yMin) * this.yScale;

        ctx.fillStyle = this.options.hoverColor || '#ff0';
        ctx.fillRect(x, y, barWidth, height);

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
        this.tooltip.innerHTML = `Value: ${this.data[index]}`;
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
        this.options = {...this.options, ...newOptions};
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

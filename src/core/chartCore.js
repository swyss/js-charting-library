// src/core/chartCore.js

import LineChart from '../charts/lineChart.js';
import BarChart from '../charts/barChart.js';

// Import other chart types as needed

class ChartCore {
  constructor(config) {
    this.config = config;
    this.chartInstance = null;
    this.initChart();
  }

  /**
   * Initializes the chart based on the provided configuration.
   */
  initChart() {
    const { type, elementId, data, options } = this.config;

    if (type === 'line') {
      this.chartInstance = new LineChart(elementId, data, options);
    } else if (type === 'bar') {
      this.chartInstance = new BarChart(elementId, data, options);
    } else {
      console.error(`Chart type "${type}" is not supported.`);
    }
  }

  /**
   * Updates the chart data.
   * @param {Array<number>} newData - The new data array.
   */
  updateData(newData) {
    if (
      this.chartInstance &&
      typeof this.chartInstance.updateData === 'function'
    ) {
      this.chartInstance.updateData(newData);
    }
  }

  /**
   * Updates the chart options.
   * @param {Object} newOptions - The new options object.
   */
  updateOptions(newOptions) {
    if (
      this.chartInstance &&
      typeof this.chartInstance.updateOptions === 'function'
    ) {
      this.chartInstance.updateOptions(newOptions);
    }
  }

  /**
   * Resizes the chart.
   */
  resize() {
    if (this.chartInstance && typeof this.chartInstance.resize === 'function') {
      this.chartInstance.resize();
    }
  }

  /**
   * Exposes the chart instance for advanced usage.
   * @returns {Object} The chart instance.
   */
  getChartInstance() {
    return this.chartInstance;
  }
}

export default ChartCore;

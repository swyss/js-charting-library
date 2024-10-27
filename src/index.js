// src/index.js

import LineChart from './charts/lineChart.js';

// Import other chart types as needed

class ChartLibrary {
    constructor(config) {
        this.chartInstance = null;
        this.initChart(config);
    }

    initChart(config) {
        const {type} = config;

        if (type === 'line') {
            this.chartInstance = new LineChart(config.elementId, config.data, config.options);
        } else if (type === 'bar') {
            // Initialize bar chart
        } else {
            console.error(`Chart type "${type}" is not supported.`);
        }
    }

    // Expose methods directly on the chart object
    updateData(newData) {
        if (this.chartInstance && typeof this.chartInstance.updateData === 'function') {
            this.chartInstance.updateData(newData);
        }
    }

    updateOptions(newOptions) {
        if (this.chartInstance && typeof this.chartInstance.updateOptions === 'function') {
            this.chartInstance.updateOptions(newOptions);
        }
    }

    resize() {
        if (this.chartInstance && typeof this.chartInstance.resize === 'function') {
            this.chartInstance.resize();
        }
    }

    // Optionally, expose other methods as needed
}

export default ChartLibrary;

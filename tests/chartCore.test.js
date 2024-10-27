// tests/core/chartCore.test.js

/* eslint-env jest */

import ChartCore from '../src/core/chartCore.js';
import LineChart from '../src/charts/lineChart.js';
import BarChart from '../src/charts/barChart.js';

describe('ChartCore', () => {
    let chartCore;
    let container;

    beforeEach(() => {
        // Set up DOM element for the chart
        document.body.innerHTML = '';
        container = document.createElement('div');
        container.id = 'chartContainer';
        container.style.width = '600px';
        container.style.height = '400px';

        // Mock getBoundingClientRect for the container
        jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
            width: 600,
            height: 400,
            top: 0,
            left: 0,
            bottom: 400,
            right: 600,
        });

        // Append the container to the document body
        document.body.appendChild(container);
    });

    test('should initialize LineChart when type is "line"', () => {
        const config = {
            elementId: 'chartContainer',
            data: [10, 20, 30],
            type: 'line',
        };

        chartCore = new ChartCore(config);
        expect(chartCore.chartInstance).toBeInstanceOf(LineChart);
    });

    test('should initialize BarChart when type is "bar"', () => {
        const config = {
            elementId: 'chartContainer',
            data: [5, 15, 25],
            type: 'bar',
        };

        chartCore = new ChartCore(config);
        expect(chartCore.chartInstance).toBeInstanceOf(BarChart);
    });

    test('should expose updateData method', () => {
        const config = {
            elementId: 'chartContainer',
            data: [10, 20, 30],
            type: 'line',
        };

        chartCore = new ChartCore(config);
        expect(typeof chartCore.updateData).toBe('function');
    });

    test('should expose updateOptions method', () => {
        const config = {
            elementId: 'chartContainer',
            data: [10, 20, 30],
            type: 'line',
        };

        chartCore = new ChartCore(config);
        expect(typeof chartCore.updateOptions).toBe('function');
    });

    test('should expose resize method', () => {
        const config = {
            elementId: 'chartContainer',
            data: [10, 20, 30],
            type: 'line',
        };

        chartCore = new ChartCore(config);
        expect(typeof chartCore.resize).toBe('function');
    });
});

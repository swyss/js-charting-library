// tests/charts/barChart.test.js

import BarChart from '../src/charts/barChart.js';

describe('BarChart', () => {
    let chart;
    let container;

    // Suppress console.error messages
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {
        });
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    beforeEach(() => {
        // Create a mock canvas element
        const canvas = document.createElement('canvas');
        canvas.getContext = jest.fn().mockReturnValue({
            canvas: canvas,
            save: jest.fn(),
            restore: jest.fn(),
            translate: jest.fn(),
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            stroke: jest.fn(),
            fill: jest.fn(),
            arc: jest.fn(),
            fillRect: jest.fn(),
            measureText: jest.fn().mockReturnValue({width: 50}),
        });

        // Set up DOM element for the chart
        document.body.innerHTML = '';
        container = document.createElement('div');
        container.id = 'chartContainer';
        container.style.width = '600px';
        container.style.height = '400px';

        // Mock getBoundingClientRect for initial dimensions
        jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
            width: 600,
            height: 400,
            top: 0,
            left: 0,
            bottom: 400,
            right: 600,
        });

        // Append the canvas to the container
        container.appendChild(canvas);

        // Append the container to the document body
        document.body.appendChild(container);
    });

    test('should resize chart correctly', () => {
        const data = [5, 15, 25];
        chart = new BarChart('chartContainer', data);

        // Simulate container resize
        container.style.width = '800px';
        container.style.height = '600px';

        // Mock getBoundingClientRect to return the new dimensions
        jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
            width: 800,
            height: 600,
            top: 0,
            left: 0,
            bottom: 600,
            right: 800,
        });

        chart.resize();

        expect(chart.canvas.width).toEqual(800);
        expect(chart.canvas.height).toEqual(600);
    });

    test('should handle mouse move events', () => {
        const data = [5, 15, 25];
        chart = new BarChart('chartContainer', data);

        // Mock the getMousePos method
        chart.getMousePos = jest.fn().mockReturnValue({x: 100, y: 100});

        // Simulate mousemove event
        const event = new MouseEvent('mousemove');
        chart.canvas.dispatchEvent(event);

        expect(chart.getMousePos).toHaveBeenCalled();
    });

    test('should highlight bar on hover', () => {
        const data = [5, 15, 25];
        chart = new BarChart('chartContainer', data);

        // Mock methods
        chart.getMousePos = jest.fn().mockReturnValue({x: 100, y: 100});
        chart.getBarIndexAtPosition = jest.fn().mockReturnValue(1);
        chart.highlightBar = jest.fn();
        chart.showTooltip = jest.fn();

        // Simulate mousemove event
        const event = new MouseEvent('mousemove');
        chart.canvas.dispatchEvent(event);

        expect(chart.highlightBar).toHaveBeenCalledWith(1);
        expect(chart.showTooltip).toHaveBeenCalled();
    });
});

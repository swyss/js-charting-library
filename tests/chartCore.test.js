// tests/chartCore.test.js
import ChartCore from '../src/core/chartCore.js';

test('ChartCore initializes without errors', () => {
    // Set up the DOM element
    document.body.innerHTML = '<div id="chartContainer"></div>';

    // Initialize the chart
    const chart = new ChartCore({
        elementId: 'chartContainer',
        data: [10, 20, 30],
        type: 'line',
        options: {},
    });

    // Assertions
    expect(chart).toBeDefined();
});

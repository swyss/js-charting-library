# Chart Library

A customizable JavaScript charting library for creating interactive and responsive charts.

## Features

- **Line and Bar Charts**: Implemented using HTML5 Canvas for high-performance rendering.
- **Interactive Tooltips**: Display data information on hover.
- **Responsive Design**: Charts adapt to different screen sizes and container dimensions.
- **Real-Time Data Updates**: Dynamically update charts with new data streams.
- **Customizable Options**: Adjust colors, axes, data points, and legends.
- **Modular Architecture**: Built with ES6 modules for easy integration and extensibility.
- **No External Dependencies**: Pure JavaScript implementation without additional libraries.

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/chart-lib.git
```

Navigate to the project directory:

```bash
cd chart-lib
```

Install development dependencies:

```bash
npm install
```

## Usage

Include the library in your project using ES6 modules:

```html

<div id="chartContainer"></div>
<script type="module">
    import ChartLibrary from './src/index.js';

    const data = [10, 20, 15, 30, 25];

    const chart = new ChartLibrary({
        elementId: 'chartContainer',
        data: data,
        type: 'line', // 'line' or 'bar'
        options: {
            // Chart dimensions and margins
            margin: 50,

            // Line styling
            lineColor: '#007bff',
            lineWidth: 2,

            // Data point styling
            pointColor: '#007bff',
            pointRadius: 4,
            hoverColor: '#ff0000',

            // Grid and axis styling
            gridColor: '#e0e0e0',
            axisColor: '#333',

            // Label styling
            labelFont: '12px Arial',
            labelColor: '#333',
        },
    });
</script>
```

### Updating Data Dynamically

You can update the chart with new data at any time:

```javascript
// New data array
const newData = [5, 15, 10, 20, 30];

// Update the chart
chart.updateData(newData);
```

## Documentation

- [API Reference](#api-reference)
- [Examples](examples/)

## Development

Run a local development server:

```bash
npx http-server .
```

Access the example page at `http://localhost:8080/examples/index.html`.

## Testing

Run unit tests with Jest:

```bash
npm test
```

## Linting

Ensure code quality with ESLint:

```bash
npm run lint
```

## Build

Transpile and bundle the code (if using Babel or a bundler):

```bash
npm run build
```

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## API Reference

### **ChartLibrary Initialization**

Create a new chart by instantiating the `ChartLibrary` class with the desired configuration.

```javascript
const chart = new ChartLibrary(config);
```

### **Configuration Object (`config`)**

The configuration object includes the following properties:

- **`elementId`** `(string)` (required): The ID of the HTML container element where the chart will be rendered.

- **`data`** `(number[])` (required): An array of numerical data points to be plotted on the chart.

- **`type`** `(string)` (required): The type of chart to render. Supported values:
    - `'line'`
    - `'bar'`

- **`options`** `(object)` (optional): An object containing customization options for the chart.

---

### **Options Object (`options`)**

Customize the appearance and behavior of the chart using the `options` object.

#### **Chart Dimensions and Margins**

- **`margin`** `(number)`: The margin around the chart for axes and labels. Default is `50`.

#### **Line Styling**

- **`lineColor`** `(string)`: The color of the line in a line chart. Accepts any valid CSS color value. Default is
  `'#000'`.

- **`lineWidth`** `(number)`: The width of the line in pixels. Default is `2`.

#### **Data Point Styling**

- **`pointColor`** `(string)`: The color of the data point markers. Default is `'#000'`.

- **`pointRadius`** `(number)`: The radius of the data point markers in pixels. Default is `3`.

- **`hoverColor`** `(string)`: The color of the data point marker when hovered over. Default is `'#ff0'`.

#### **Grid and Axis Styling**

- **`gridColor`** `(string)`: The color of the gridlines. Default is `'#e0e0e0'`.

- **`axisColor`** `(string)`: The color of the axes. Default is `'#000'`.

#### **Label Styling**

- **`labelFont`** `(string)`: The font style for the axis labels. Default is `'12px Arial'`.

- **`labelColor`** `(string)`: The color of the axis labels. Default is `'#000'`.

---

### **Methods**

#### **`updateData(newData)`**

Updates the chart with new data.

- **Parameters:**
    - **`newData`** `(number[])` (required): An array of numerical data points.

- **Usage:**

  ```javascript
  chart.updateData([5, 15, 10, 20, 30]);
  ```

#### **`destroy()`**

Cleans up the chart instance by removing event listeners and the canvas element.

- **Usage:**

  ```javascript
  chart.destroy();
  ```

---

### **Events**

Event handling can be added by extending the library to include callbacks. *(Note: Event handling methods like `onHover`
and `onClick` are planned for future releases.)*

---

## Examples

Explore the `examples/` directory for sample projects demonstrating how to use the library.

### **Example 1: Basic Line Chart**

```html

<div id="basicLineChart"></div>
<script type="module">
    import ChartLibrary from './src/index.js';

    const data = [12, 19, 3, 5, 2, 3];

    const chart = new ChartLibrary({
        elementId: 'basicLineChart',
        data: data,
        type: 'line',
        options: {
            lineColor: '#28a745',
            pointColor: '#28a745',
            hoverColor: '#dc3545',
        },
    });
</script>
```

### **Example 2: Customized Line Chart**

```html

<div id="customLineChart"></div>
<script type="module">
    import ChartLibrary from './src/index.js';

    const data = [5, 15, 10, 20, 25, 18];

    const chart = new ChartLibrary({
        elementId: 'customLineChart',
        data: data,
        type: 'line',
        options: {
            margin: 60,
            lineColor: '#6f42c1',
            lineWidth: 3,
            pointColor: '#6f42c1',
            pointRadius: 5,
            hoverColor: '#fd7e14',
            gridColor: '#f8f9fa',
            axisColor: '#343a40',
            labelFont: '14px Verdana',
            labelColor: '#343a40',
        },
    });
</script>
```
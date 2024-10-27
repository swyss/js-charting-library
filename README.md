# Chart Library

[![Build Status](https://github.com/swyss/js-charting-library/workflows/CI/badge.svg)](https://github.com/swyss/js-charting-library/actions)
[![Coverage Status](https://coveralls.io/repos/github/swyss/js-charting-library/badge.svg?branch=main)](https://coveralls.io/github/swyss/js-charting-library?branch=main)
[![npm version](https://badge.fury.io/js/chart-lib.svg)](https://badge.fury.io/js/chart-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)


A customizable JavaScript charting library for creating interactive and responsive charts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [LineChart](#linechart)
  - [BarChart](#barchart)
  - [Dynamic Data Updates](#dynamic-data-updates)
- [API Reference](#api-reference)
- [Examples](#examples)
  - [Basic Line Chart](#basic-line-chart)
  - [Customized Line Chart](#customized-line-chart)
  - [Basic Bar Chart](#basic-bar-chart)
  - [Customized Bar Chart](#customized-bar-chart)
- [Development](#development)
- [Testing](#testing)
- [Linting](#linting)
- [Build](#build)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chart Library Usage</title>
  <style>
    #chartContainer {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
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
</body>
</html>
```

### Dynamic Data Updates

You can update the chart with new data at any time:

```javascript
// New data array
const newData = [5, 15, 10, 20, 30];

// Update the chart
chart.updateData(newData);
```

## API Reference

### **ChartLibrary Initialization**

Create a new chart by instantiating the `ChartLibrary` class with the desired configuration.

```javascript
const chart = new ChartLibrary(config);
```

### **Configuration Object (`config`)**

The configuration object includes the following properties:

- **`elementId`** `(string)` **(required)**: The ID of the HTML container element where the chart will be rendered.

- **`data`** `(number[])` **(required)**: An array of numerical data points to be plotted on the chart.

- **`type`** `(string)` **(required)**: The type of chart to render. Supported values:
  - `'line'`
  - `'bar'`

- **`options`** `(object)` **(optional)**: An object containing customization options for the chart.

---

### **Options Object (`options`)**

Customize the appearance and behavior of the chart using the `options` object.

#### **Chart Dimensions and Margins**

- **`margin`** `(number)`: The margin around the chart for axes and labels. Default is `50`.

#### **Line Styling**

- **`lineColor`** `(string)`: The color of the line in a line chart. Accepts any valid CSS color value. Default is `'#000'`.

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
  - **`newData`** `(number[])` **(required)**: An array of numerical data points.

- **Usage:**

  ```javascript
  chart.updateData([5, 15, 10, 20, 30]);
  ```

#### **`updateOptions(newOptions)`**

Updates the chart's customization options.

- **Parameters:**
  - **`newOptions`** `(object)` **(required)**: An object containing the new customization options.

- **Usage:**

  ```javascript
  chart.updateOptions({
    lineColor: '#28a745',
    lineWidth: 3,
  });
  ```

#### **`resize()`**

Resizes the chart based on the container's current dimensions. This is useful when the container size changes dynamically.

- **Usage:**

  ```javascript
  chart.resize();
  ```

#### **`destroy()`**

Cleans up the chart instance by removing event listeners and the canvas element from the DOM.

- **Usage:**

  ```javascript
  chart.destroy();
  ```

---

## Examples

Explore the `examples/` directory for sample projects demonstrating how to use the library.

### Basic Line Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Line Chart</title>
  <style>
    #basicLineChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="basicLineChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

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
</body>
</html>
```

### Customized Line Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Customized Line Chart</title>
  <style>
    #customLineChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="customLineChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

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
</body>
</html>
```

### Basic Bar Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Bar Chart</title>
  <style>
    #basicBarChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="basicBarChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

    const data = [5, 15, 25, 35, 45];

    const chart = new ChartLibrary({
      elementId: 'basicBarChart',
      data: data,
      type: 'bar',
      options: {
        barColor: '#17a2b8',
        barWidth: 30,
        hoverColor: '#ffc107',
        gridColor: '#e9ecef',
        axisColor: '#495057',
        labelFont: '12px Arial',
        labelColor: '#495057',
      },
    });
  </script>
</body>
</html>
```

### Customized Bar Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Customized Bar Chart</title>
  <style>
    #customBarChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="customBarChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

    const data = [8, 12, 20, 15, 30];

    const chart = new ChartLibrary({
      elementId: 'customBarChart',
      data: data,
      type: 'bar',
      options: {
        margin: 70,
        barColor: '#dc3545',
        barWidth: 40,
        hoverColor: '#28a745',
        gridColor: '#dee2e6',
        axisColor: '#212529',
        labelFont: '14px Helvetica',
        labelColor: '#212529',
      },
    });
  </script>
</body>
</html>
```

## Development

Run a local development server to view examples and work on the library:

```bash
npx http-server .
```

Access the example page at `http://localhost:8080/examples/index.html`.

## Testing

Run unit tests with Jest to ensure your library functions as expected:

```bash
npm test
```

## Linting

Ensure code quality and consistency with ESLint:

```bash
npm run lint
```

## Build

Transpile and bundle the code (if using Babel or a bundler):

```bash
npm run build
```

**Note:** Ensure you have a build script defined in your `package.json` that handles transpilation and bundling as needed.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the Repository**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

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

- **`elementId`** `(string)` **(required)**: The ID of the HTML container element where the chart will be rendered.

- **`data`** `(number[])` **(required)**: An array of numerical data points to be plotted on the chart.

- **`type`** `(string)` **(required)**: The type of chart to render. Supported values:
  - `'line'`
  - `'bar'`

- **`options`** `(object)` **(optional)**: An object containing customization options for the chart.

---

### **Options Object (`options`)**

Customize the appearance and behavior of the chart using the `options` object.

#### **Chart Dimensions and Margins**

- **`margin`** `(number)`: The margin around the chart for axes and labels. Default is `50`.

#### **Line Styling**

- **`lineColor`** `(string)`: The color of the line in a line chart. Accepts any valid CSS color value. Default is `'#000'`.

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
  - **`newData`** `(number[])` **(required)**: An array of numerical data points.

- **Usage:**

  ```javascript
  chart.updateData([5, 15, 10, 20, 30]);
  ```

#### **`updateOptions(newOptions)`**

Updates the chart's customization options.

- **Parameters:**
  - **`newOptions`** `(object)` **(required)**: An object containing the new customization options.

- **Usage:**

  ```javascript
  chart.updateOptions({
    lineColor: '#28a745',
    lineWidth: 3,
  });
  ```

#### **`resize()`**

Resizes the chart based on the container's current dimensions. This is useful when the container size changes dynamically.

- **Usage:**

  ```javascript
  chart.resize();
  ```

#### **`destroy()`**

Cleans up the chart instance by removing event listeners and the canvas element from the DOM.

- **Usage:**

  ```javascript
  chart.destroy();
  ```

---

### **Events**

*Event handling can be added by extending the library to include callbacks. Methods like `onHover` and `onClick` are planned for future releases.*

---

## Examples

Explore the `examples/` directory for sample projects demonstrating how to use the library.

### Basic Line Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Line Chart</title>
  <style>
    #basicLineChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="basicLineChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

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
</body>
</html>
```

### Customized Line Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Customized Line Chart</title>
  <style>
    #customLineChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="customLineChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

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
</body>
</html>
```

### Basic Bar Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Bar Chart</title>
  <style>
    #basicBarChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="basicBarChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

    const data = [5, 15, 25, 35, 45];

    const chart = new ChartLibrary({
      elementId: 'basicBarChart',
      data: data,
      type: 'bar',
      options: {
        barColor: '#17a2b8',
        barWidth: 30,
        hoverColor: '#ffc107',
        gridColor: '#e9ecef',
        axisColor: '#495057',
        labelFont: '12px Arial',
        labelColor: '#495057',
      },
    });
  </script>
</body>
</html>
```

### Customized Bar Chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Customized Bar Chart</title>
  <style>
    #customBarChart {
      width: 600px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="customBarChart"></div>
  <script type="module">
    import ChartLibrary from '../src/index.js';

    const data = [8, 12, 20, 15, 30];

    const chart = new ChartLibrary({
      elementId: 'customBarChart',
      data: data,
      type: 'bar',
      options: {
        margin: 70,
        barColor: '#dc3545',
        barWidth: 40,
        hoverColor: '#28a745',
        gridColor: '#dee2e6',
        axisColor: '#212529',
        labelFont: '14px Helvetica',
        labelColor: '#212529',
      },
    });
  </script>
</body>
</html>
```

---

## Development

Set up a local development environment to work on the library and view examples.

### Run a Local Development Server

Use a simple HTTP server to serve your project locally.

```bash
npx http-server .
```

Access the example page at `http://localhost:8080/examples/index.html`.

---

## Testing

Ensure your library functions correctly by running unit tests with Jest.

### Run Unit Tests

Execute the following command to run all tests:

```bash
npm test
```

### Test Coverage

To check test coverage, you can run:

```bash
npx jest --coverage
```

This will generate a coverage report indicating how much of your code is tested.

---

## Linting

Maintain code quality and consistency using ESLint.

### Run ESLint

Ensure your code adheres to the defined linting rules by running:

```bash
npm run lint
```

**Note:** Make sure ESLint is properly configured in your project (`eslint.config.mjs`).

---

## Build

Prepare your library for production by transpiling and bundling the code.

### Transpile and Bundle

If you're using Babel or a bundler like Webpack, run the build script:

```bash
npm run build
```

**Note:** Ensure you have the necessary build tools and configurations set up in your project.

---

## Contributing

Contributions are welcome! Please follow these guidelines to help us improve the Chart Library.

### How to Contribute

1. **Fork the Repository**

   Click the "Fork" button at the top-right corner of the repository page to create your own copy.

2. **Clone the Forked Repository**

   ```bash
   git clone https://github.com/yourusername/chart-lib.git
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

4. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature"
   ```

5. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

6. **Open a Pull Request**

   Navigate to the original repository and open a pull request to merge your changes.

### Guidelines

- **Code Style:** Follow the existing code style and linting rules.
- **Documentation:** Update documentation and examples as needed.
- **Testing:** Add or update tests to cover new features or changes.
- **Commit Messages:** Write clear and descriptive commit messages.

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by various open-source charting libraries.
- Thanks to contributors and the developer community for their support and feedback.

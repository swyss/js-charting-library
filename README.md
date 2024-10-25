# JavaScript Charting Library

A customizable JavaScript charting library for creating interactive charts.

## Features
- Line, bar, and pie charts (coming soon)
- Interactive tooltips
- Responsive design

## Installation
Clone the repository and open `index.html` in a browser to get started.

## Usage
```html
<div id="chartContainer"></div>
<script type="module">
  import ChartLibrary from './src/index.js';
  const chart = new ChartLibrary({
    elementId: 'chartContainer',
    data: [...],
    type: 'line',
    options: {...}
  });
</script>

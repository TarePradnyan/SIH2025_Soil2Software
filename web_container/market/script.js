document.addEventListener('DOMContentLoaded', () => {
    console.log('Market prices page loaded.');
});

// New createLineChart function with rise/fall coloring
function createLineChart(canvasId, label, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: `${label} Price (₹/quintal)`,
        data: data,
        borderWidth: 2,
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: 'white',
        segment: {
          borderColor: ctx => {
            const { p0, p1 } = ctx;
            if (p1.parsed.y > p0.parsed.y) return 'green';
            else if (p1.parsed.y < p0.parsed.y) return 'red';
            else return 'gray';
          }
        }
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: 'Price (₹/quintal)' }
        },
        x: {
          title: { display: true, text: 'Month' }
        }
      }
    }
  });
}

// Calls for each crop chart
createLineChart('wheatChart', 'Wheat', [2000, 2100, 2200, 2300, 2250, 2400]);
createLineChart('riceChart', 'Rice', [3000, 3100, 3200, 3300, 3250, 3400]);
createLineChart('sugarcaneChart', 'Sugarcane', [1500, 1600, 1550, 1650, 1700, 1750]);
createLineChart('barleyChart', 'Barley', [1800, 1850, 1900, 1950, 2000, 2100]);
createLineChart('bajreeChart', 'Bajra', [2200, 2250, 2300, 2300, 2300, 2400]);
createLineChart('cottonChart', 'Cotton', [2500, 2600, 2700, 2800, 2750, 2900]);
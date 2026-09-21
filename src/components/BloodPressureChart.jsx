import { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, Tooltip } from 'chart.js';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function formatLabel(entry) {
  if (!entry?.month || !entry?.year) return 'Unknown';
  return `${entry.month.slice(0, 3)}, ${entry.year}`;
}

function BloodPressureChart({ history }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const registeredChart = Chart.getChart(canvas);
    if (registeredChart) registeredChart.destroy();

    if (chartRef.current && chartRef.current !== registeredChart) {
      chartRef.current.destroy();
    }
    chartRef.current = null;

    chartRef.current = new Chart(canvas, {
      type: 'line',
      data: {
        labels: history.map(formatLabel),
        datasets: [
          {
            label: 'Systolic',
            data: history.map((entry) => entry?.blood_pressure?.systolic?.value ?? null),
            borderColor: '#c94f91',
            backgroundColor: '#c94f91',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 5,
            tension: 0.38,
          },
          {
            label: 'Diastolic',
            data: history.map((entry) => entry?.blood_pressure?.diastolic?.value ?? null),
            borderColor: '#7959c8',
            backgroundColor: '#7959c8',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 5,
            tension: 0.38,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#12202d',
            padding: 10,
            displayColors: true,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#687681', font: { size: 11, family: 'DM Sans' }, maxRotation: 0 },
          },
          y: {
            min: 60,
            max: 180,
            ticks: { stepSize: 20, color: '#687681', font: { size: 11, family: 'DM Sans' } },
            grid: { color: '#d9e2e6', drawTicks: false },
            border: { display: false, dash: [4, 4] },
          },
        },
      },
    });

    return () => {
      const activeChart = chartRef.current ?? Chart.getChart(canvas);
      if (activeChart) activeChart.destroy();
      chartRef.current = null;
    };
  }, [history]);

  return (
    <article className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Blood Pressure</h3>
          <span>Last 6 months <span className="chevron">⌄</span></span>
        </div>
        <div className="chart-legend" aria-label="Chart legend">
          <span><i className="legend-dot legend-dot--systolic" />Systolic</span>
          <span><i className="legend-dot legend-dot--diastolic" />Diastolic</span>
        </div>
      </div>
      <div className="chart-wrap"><canvas ref={canvasRef} /></div>
    </article>
  );
}

export default BloodPressureChart;

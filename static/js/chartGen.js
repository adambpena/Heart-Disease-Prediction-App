document.addEventListener('DOMContentLoaded', function() {
    const age = parseFloat(document.getElementById('age').value);

    const rbpValue = parseFloat(document.getElementById('trestbps').value);
    const cholValue = parseFloat(document.getElementById('chol').value);
    const mhrValue = parseFloat(document.getElementById('thalach').value);

    const rbpCtx = document.getElementById('rbpChart').getContext('2d');
    const cholCtx = document.getElementById('cholChart').getContext('2d');
    const mhrCtx = document.getElementById('mhrChart').getContext('2d');

    function createChart(ctx, value, min, max, annoMin, annoMax) {
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: isNaN(value) || value < min || value > max ? [{x: ((max-min)/2)+min, y: 0}] : [{ x: value, y: 0 }],
                    backgroundColor: 'skyblue'
                }]
            },
            options: {
                elements: {
                    point: {
                        radius: 10,
                        hoverRadius: 15
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: min,
                        max: max,
                    },
                    y: {
                        display: false
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    annotation: {
                        annotations: {
                            box1: {
                                type: 'box',
                                xMin: annoMin,
                                xMax: annoMax,
                                backgroundColor: 'rgba(150, 100, 255, 0.1)',
                                borderColor: 'rgba(150, 100, 255, 0.5)',
                                borderWidth: 1
                            }
                        }
                    }
                }
            }
        });
    }

    createChart(rbpCtx, rbpValue, 50, 250, 50, 120);
    createChart(cholCtx, cholValue, 100, 600, 100, 200);
    if (isNaN(age) || age < 0 || age > 120) {
        createChart(mhrCtx, mhrValue, 50, 250, (250/2)+25, (250/2)+25);
    }
    else{
        createChart(mhrCtx, mhrValue, 50, 250, 220-age-25, 200-age+25);
    }
});
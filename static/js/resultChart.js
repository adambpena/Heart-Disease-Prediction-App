document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resultChart')) {
        var ctx = document.getElementById('resultChart').getContext('2d');
        
        var data = {
            labels: ['Resting Blood Pressure', 'Serum Cholesterol', 'Max Heart Rate'],
            datasets: [
                {
                    label: 'Patient Value',
                    data: [parseFloat(document.getElementById('trestbps').value), parseFloat(document.getElementById('chol').value), parseFloat(document.getElementById('thalach').value)],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Normal Range (Lower)',
                    data: [90, 150, 60], // Example lower normal values
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: 'Normal Range (Upper)',
                    data: [140, 240, 200], // Example upper normal values
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        };

        var options = {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        };

        var resultChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }
});
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillRandomValues() {
    const fields = [
        { id: 'age', min: 1, max: 120 },
        { id: 'sex', min: 0, max: 1 },
        { id: 'cp', min: 0, max: 3 },
        { id: 'trestbps', min: 50, max: 200 },
        { id: 'chol', min: 100, max: 600 },
        { id: 'fbs', min: 0, max: 1 },
        { id: 'restecg', min: 0, max: 2 },
        { id: 'thalach', min: 50, max: 250 },
        { id: 'exang', min: 0, max: 1 },
        { id: 'oldpeak', min: 0, max: 6 },
        { id: 'slope', min: 0, max: 2 },
        { id: 'ca', min: 0, max: 3 },
        { id: 'thal', min: 1, max: 3 }
    ];

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        element.value = getRandomValue(field.min, field.max);
        element.dispatchEvent(new Event('change')); // Manually trigger onchange to refresh error messages
    });

   
}

function validate(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    // Age (float, 0 to 120)
    if (fieldId === 'age') {
        const age = parseFloat(value);
        if (isNaN(age) || age < 0 || age > 120 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Sex (int, 0 or 1)
    if (fieldId === 'sex') {
        const sex = parseInt(value);
        if (sex !== 0 && sex !== 1) {
            return false;
        }
    }
    
    // Chest Pain Type (int, 0 to 3)
    if (fieldId === 'cp') {
        const cp = parseInt(value);
        if (isNaN(cp) || cp < 0 || cp > 3 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Resting Blood Pressure (float, 50 to 200)
    if (fieldId === 'trestbps') {
        const trestbps = parseFloat(value);
        if (isNaN(trestbps) || trestbps < 50 || trestbps > 200 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Serum Cholesterol (float, 100 to 600)
    if (fieldId === 'chol') {
        const chol = parseFloat(value);
        if (isNaN(chol) || chol < 100 || chol > 600 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Fasting Blood Sugar (int, 0 or 1)
    if (fieldId === 'fbs') {
        const fbs = parseInt(value);
        if (fbs !== 0 && fbs !== 1) {
            return false;
        }
    }
    
    // Resting ECG Results (int, 0 to 2)
    if (fieldId === 'restecg') {
        const restecg = parseInt(value);
        if (isNaN(restecg) || restecg < 0 || restecg > 2 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Max Heart Rate Achieved (float, 50 to 250)
    if (fieldId === 'thalach') {
        const thalach = parseFloat(value);
        if (isNaN(thalach) || thalach < 50 || thalach > 250 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Exercise Induced Angina (int, 0 or 1)
    if (fieldId === 'exang') {
        const exang = parseInt(value);
        if (exang !== 0 && exang !== 1) {
            return false;
        }
    }
    
    // ST Depression (Oldpeak, float, 0 to 6)
    if (fieldId === 'oldpeak') {
        const oldpeak = parseFloat(value);
        if (isNaN(oldpeak) || oldpeak < 0 || oldpeak > 6 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Slope of Peak Exercise ST Segment (int, 0 to 2)
    if (fieldId === 'slope') {
        const slope = parseInt(value);
        if (isNaN(slope) || slope < 0 || slope > 2 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Major Vessels Colored by Flourosopy (int, 0 to 3)
    if (fieldId === 'ca') {
        const ca = parseInt(value);
        if (isNaN(ca) || ca < 0 || ca > 3 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    // Thal (int, 1 to 3)
    if (fieldId === 'thal') {
        const thal = parseInt(value);
        if (isNaN(thal) || thal < 1 || thal > 3 || !/^\d+(\.\d+)?$/.test(value)) {
            return false;
        }
    }
    
    return true;
}

function validateField(fieldId, errorMsgId) {
    const errorMsg = document.getElementById(errorMsgId);
    if (!validate(fieldId)) {
        errorMsg.textContent = getErrorMessage(fieldId);
        errorMsg.style.color = "red";
        errorMsg.style.display = "block";
        return false;
    } else {
        errorMsg.textContent = "";
        errorMsg.style.display = "none";
        return true;
    }
}

function validateForm() {
    const fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    invalidFields = [];
    for (const field of fields) {
        if (!validate(field)) {
            console.log("Validation failed for field: " + field);
            alert("Please fill empty fields and fix any errors in values entered before submitting the form.");
            return;
        }  
    }
    document.getElementById('prediction-form').submit();
}

function getErrorMessage(fieldId) {
    switch (fieldId) {
        case 'age':
            return "Age must be a number between 0 and 120.";
        case 'sex':
            return "Sex must be 0 (Female) or 1 (Male).";
        case 'cp':
            return "Chest Pain Type must be between 0 and 3.";
        case 'trestbps':
            return "Resting Blood Pressure must be a number between 50 and 200.";
        case 'chol':
            return "Cholesterol must be a number between 100 and 600.";
        case 'fbs':
            return "Fasting Blood Sugar must be 0 (<= 120 mg/dl) or 1 (> 120 mg/dl).";
        case 'restecg':
            return "Resting ECG Results must be between 0 and 2.";
        case 'thalach':
            return "Max Heart Rate must be a number between 50 and 250.";
        case 'exang':
            return "Exercise Induced Angina must be 0 (No) or 1 (Yes).";
        case 'oldpeak':
            return "ST Depression (Oldpeak) must be a number between 0 and 6.";
        case 'slope':
            return "Slope must be between 0 and 2.";
        case 'ca':
            return "Major Vessels must be between 0 and 3.";
        case 'thal':
            return "Thal must be 1 (Normal), 2 (Fixed Defect), or 3 (Reversible Defect).";
        default:
            return "";
    }
}

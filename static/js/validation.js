function validateField(fieldId, errorMsgId) {
    const field = document.getElementById(fieldId);
    const errorMsg = document.getElementById(errorMsgId);
    const value = field.value.trim();
    
    // Age (float, 0 to 120)
    if (fieldId === 'age') {
        const age = parseFloat(value);
        if (isNaN(age) || age < 0 || age > 120) {
            errorMsg.textContent = "Age must be a number between 0 and 120.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Sex (int, 0 or 1)
    if (fieldId === 'sex') {
        const sex = parseInt(value);
        if (sex !== 0 && sex !== 1) {
            errorMsg.textContent = "Sex must be 0 (Female) or 1 (Male).";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Chest Pain Type (int, 0 to 3)
    if (fieldId === 'cp') {
        const cp = parseInt(value);
        if (cp < 0 || cp > 3) {
            errorMsg.textContent = "Chest Pain Type must be between 0 and 3.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Resting Blood Pressure (float, 50 to 300)
    if (fieldId === 'trestbps') {
        const trestbps = parseFloat(value);
        if (isNaN(trestbps) || trestbps < 50 || trestbps > 300) {
            errorMsg.textContent = "Resting Blood Pressure must be a number between 50 and 300.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Serum Cholesterol (float, 100 to 600)
    if (fieldId === 'chol') {
        const chol = parseFloat(value);
        if (isNaN(chol) || chol < 100 || chol > 600) {
            errorMsg.textContent = "Cholesterol must be a number between 100 and 600.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Fasting Blood Sugar (int, 0 or 1)
    if (fieldId === 'fbs') {
        const fbs = parseInt(value);
        if (fbs !== 0 && fbs !== 1) {
            errorMsg.textContent = "Fasting Blood Sugar must be 0 (<= 120 mg/dl) or 1 (> 120 mg/dl).";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Resting ECG Results (int, 0 to 2)
    if (fieldId === 'restecg') {
        const restecg = parseInt(value);
        if (restecg < 0 || restecg > 2) {
            errorMsg.textContent = "Resting ECG Results must be between 0 and 2.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Max Heart Rate Achieved (float, 50 to 250)
    if (fieldId === 'thalach') {
        const thalach = parseFloat(value);
        if (isNaN(thalach) || thalach < 50 || thalach > 250) {
            errorMsg.textContent = "Max Heart Rate must be a number between 50 and 250.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Exercise Induced Angina (int, 0 or 1)
    if (fieldId === 'exang') {
        const exang = parseInt(value);
        if (exang !== 0 && exang !== 1) {
            errorMsg.textContent = "Exercise Induced Angina must be 0 (No) or 1 (Yes).";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // ST Depression (Oldpeak, float, 0 to 6)
    if (fieldId === 'oldpeak') {
        const oldpeak = parseFloat(value);
        if (isNaN(oldpeak) || oldpeak < 0 || oldpeak > 6) {
            errorMsg.textContent = "ST Depression (Oldpeak) must be a number between 0 and 6.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Slope of Peak Exercise ST Segment (int, 0 to 2)
    if (fieldId === 'slope') {
        const slope = parseInt(value);
        if (slope < 0 || slope > 2) {
            errorMsg.textContent = "Slope must be between 0 and 2.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Major Vessels Colored by Flourosopy (int, 0 to 3)
    if (fieldId === 'ca') {
        const ca = parseInt(value);
        if (ca < 0 || ca > 3) {
            errorMsg.textContent = "Major Vessels must be between 0 and 3.";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
    
    // Thal (int, 1 to 3)
    if (fieldId === 'thal') {
        const thal = parseInt(value);
        if (thal < 1 || thal > 3) {
            errorMsg.textContent = "Thal must be 1 (Normal), 2 (Fixed Defect), or 3 (Reversible Defect).";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
        } else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }
}

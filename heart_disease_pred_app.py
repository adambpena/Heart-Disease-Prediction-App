from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
model = joblib.load("heartdisease_xgb.pkl")

# Helper function to validate inputs
def is_valid_input(value, expected_type, min_value=None, max_value=None):
    try:
        value = expected_type(value)
        
        if min_value is not None and value < min_value:
            return False
        if max_value is not None and value > max_value:
            return False
        
        return True
    except ValueError:
        return False

# Prediction function
def predict_heart_disease(inputs):
    input_array = np.array([inputs])
    probability = model.predict_proba(input_array)[0][1]
    
    if 0 <= probability <= 0.2:
        message = "Very Low Risk"
        color = "green"
    elif 0.2 < probability <= 0.4:
        message = "Moderately Low Risk"
        color = "#9ACD32"
    elif 0.4 < probability <= 0.6:
        message = "Moderate Risk"
        color = "yellow"
    elif 0.6 < probability <= 0.8:
        message = "High Risk"
        color = "orange"
    elif 0.8 < probability <= 1:
        message = "Very High Risk"
        color = "red"
    else:
        message = "Error in prediction"
        color = "black"
        
    return probability, message, color

@app.route("/", methods=["GET", "POST"])
def home():
    errors = {}
    if request.method == "POST":
        # Collect inputs from the form
        inputs = []
        
        # Validate each input
        fields = [
            ("age", float, 0, 120),
            ("sex", int, 0, 1),
            ("cp", int, 0, 3),
            ("trestbps", float, 50, 300),
            ("chol", float, 100, 600),
            ("fbs", int, 0, 1),
            ("restecg", int, 0, 2),
            ("thalach", float, 50, 250),
            ("exang", int, 0, 1),
            ("oldpeak", float, 0, 6),
            ("slope", int, 0, 2),
            ("ca", int, 0, 3),
            ("thal", int, 1, 3)
        ]
        
        for field, field_type, min_val, max_val in fields:
            value = request.form.get(field)
            if not is_valid_input(value, field_type, min_val, max_val):
                errors[field] = f"Invalid input for {field}. Please check your values."
            else:
                inputs.append(field_type(value))
        
        # If no errors, make prediction
        if not errors:
            probability, message, color = predict_heart_disease(inputs)
            return render_template("index.html", probability=probability, message=message, color=color, errors=errors)
    
    return render_template("index.html", errors=errors)

if __name__ == "__main__":
    app.run(debug=True)

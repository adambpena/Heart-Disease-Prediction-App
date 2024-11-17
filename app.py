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
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        age = int(request.form['age'])
        sex = int(request.form['sex'])
        cp = int(request.form['cp'])
        trestbps = int(request.form['trestbps'])
        chol = int(request.form['chol'])
        fbs = int(request.form['fbs'])
        restecg = int(request.form['restecg'])
        thalach = int(request.form['thalach'])
        exang = int(request.form['exang'])
        oldpeak = float(request.form['oldpeak'])
        slope = int(request.form['slope'])
        ca = int(request.form['ca'])
        thal = int(request.form['thal'])

        # Call the predict_heart_disease function
        inputs = [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]
        probability, message, color = predict_heart_disease(inputs)

        # Return the result to be displayed
        return render_template('index.html', probability=probability, message=message, color=color)
    
    except ValueError as e:
        # Handle the case where conversion to int or float fails
        error_message = "Invalid input: " + str(e)
        return render_template('index.html', error_message=error_message)

if __name__ == "__main__":
    app.run(debug=True)

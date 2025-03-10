import tkinter as tk
from tkinter import messagebox
import joblib
import numpy as np

# Load the pre-trained model
model = joblib.load("heartdisease_xgb.pkl")

# Helper function to validate inputs
def is_valid_input(value, expected_type, min_value=None, max_value=None):
    try:
        # Convert the value to the expected type (float or int)
        value = expected_type(value)
        
        # Check for range validity
        if min_value is not None and value < min_value:
            return False
        if max_value is not None and value > max_value:
            return False
        
        return True
    except ValueError:
        return False

# Prediction function (receives values from the user and supplies those to the model for prediction)
def predict_heart_disease():
    try:
        # Collect inputs from user entries and validate them
        inputs = []
        
        # Age (float)
        if not is_valid_input(entry_age.get(), float, 0, 120):
            raise ValueError("Age must be a number between 0 and 120.")
        inputs.append(float(entry_age.get()))
        
        # Sex (int, 0 or 1)
        if not is_valid_input(entry_sex.get(), int, 0, 1):
            raise ValueError("Sex must be 0 (Female) or 1 (Male).")
        inputs.append(int(entry_sex.get()))
        
        # Chest Pain Type (int, 0 to 3)
        if not is_valid_input(entry_cp.get(), int, 0, 3):
            raise ValueError("Chest Pain Type must be between 0 and 3.")
        inputs.append(int(entry_cp.get()))
        
        # Resting Blood Pressure (float)
        if not is_valid_input(entry_trestbps.get(), float, 50, 300):
            raise ValueError("Resting Blood Pressure must be a number between 50 and 300.")
        inputs.append(float(entry_trestbps.get()))
        
        # Serum Cholesterol (float)
        if not is_valid_input(entry_chol.get(), float, 100, 600):
            raise ValueError("Cholesterol must be a number between 100 and 600.")
        inputs.append(float(entry_chol.get()))
        
        # Fasting Blood Sugar (int, 0 or 1)
        if not is_valid_input(entry_fbs.get(), int, 0, 1):
            raise ValueError("Fasting Blood Sugar must be 0 (<= 120 mg/dl) or 1 (> 120 mg/dl).")
        inputs.append(int(entry_fbs.get()))
        
        # Resting ECG Results (int, 0 to 2)
        if not is_valid_input(entry_restecg.get(), int, 0, 2):
            raise ValueError("Resting ECG Results must be between 0 and 2.")
        inputs.append(int(entry_restecg.get()))
        
        # Max Heart Rate Achieved (float)
        if not is_valid_input(entry_thalach.get(), float, 50, 250):
            raise ValueError("Max Heart Rate must be a number between 50 and 250.")
        inputs.append(float(entry_thalach.get()))
        
        # Exercise Induced Angina (int, 0 or 1)
        if not is_valid_input(entry_exang.get(), int, 0, 1):
            raise ValueError("Exercise Induced Angina must be 0 (No) or 1 (Yes).")
        inputs.append(int(entry_exang.get()))
        
        # ST Depression (Oldpeak, float)
        if not is_valid_input(entry_oldpeak.get(), float, 0, 6):
            raise ValueError("ST Depression (Oldpeak) must be a number between 0 and 6.")
        inputs.append(float(entry_oldpeak.get()))
        
        # Slope of Peak Exercise ST Segment (int, 0 to 2)
        if not is_valid_input(entry_slope.get(), int, 0, 2):
            raise ValueError("Slope must be between 0 and 2.")
        inputs.append(int(entry_slope.get()))
        
        # Major Vessels Colored by Flourosopy (int, 0 to 3)
        if not is_valid_input(entry_ca.get(), int, 0, 3):
            raise ValueError("Major Vessels must be between 0 and 3.")
        inputs.append(int(entry_ca.get()))
        
        # Thal (int, 0 to 2)
        if not is_valid_input(entry_thal.get(), int, 0, 2):
            raise ValueError("Thal must be 0 (Normal), 1 (Fixed Defect), or 2 (Reversible Defect).")
        inputs.append(int(entry_thal.get()))
        
        # Reshape input for a single prediction
        input_array = np.array([inputs])

        # Get probability of heart disease
        probability = model.predict_proba(input_array)[0][1]

        # Display result to 3 decimal places
        messagebox.showinfo("Prediction Result", f"Heart Disease Probability (0-1): {probability:.3f}")
    
    except ValueError as e:
        # Display the error message
        messagebox.showerror("Invalid input", str(e))

# Set up Tkinter GUI
app = tk.Tk()
app.title("Heart Disease Prediction")

# Feature input fields with labels
labels = [
    "Age", "Sex (0=Female, 1=Male)", "Chest Pain Type (0-3)", 
    "Resting Blood Pressure (50-300mmHg)", "Serum Cholesterol (100-600mg/dl)", "Fasting Blood Sugar (>120 mg/dl: 1, otherwise: 0)",
    "Resting ECG Results (0-2)", "Max Heart Rate Achieved", "Exercise Induced Angina (0=No, 1=Yes)",
    "ST Depression (Oldpeak) (0-6)", "Slope of Peak Exercise ST Segment (0-2)",
    "Major Vessels Colored by Flourosopy (0-3)", "Thal (0=Normal, 1=Fixed Defect, 2=Reversible Defect)"
]

# Create entry fields dynamically
entries = []
for i, label in enumerate(labels):
    tk.Label(app, text=label).grid(row=i, column=0, padx=10, pady=5, sticky="w")
    entry = tk.Entry(app)
    entry.grid(row=i, column=1, padx=10, pady=5)
    entries.append(entry)

# Assign entry fields to variables
(entry_age, entry_sex, entry_cp, entry_trestbps, entry_chol, entry_fbs, 
 entry_restecg, entry_thalach, entry_exang, entry_oldpeak, entry_slope, 
 entry_ca, entry_thal) = entries

# Submit button
submit_button = tk.Button(app, text="Submit", command=predict_heart_disease)
submit_button.grid(row=len(labels), column=0, columnspan=2, pady=20)

# Run the Tkinter event loop
app.mainloop()

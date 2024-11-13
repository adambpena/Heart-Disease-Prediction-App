import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_curve, auc
import xgboost as xgb
import matplotlib.pyplot as plt
import seaborn as sns
import joblib  # for saving the model

# Load the dataset
data = pd.read_csv('heart.csv')

# Split features and target variable
X = data.drop('target', axis=1)  # Features
y = data['target']               # Target variable (Binary, 1 = heart disease, 0 = no heart disease)

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create the XGBoost model (Gradient Boosting algorithm implementation defining the model)
model = xgb.XGBClassifier(
    objective='binary:logistic',  # For binary classification
    eval_metric='logloss',        # Loss function to optimize
    use_label_encoder=False       # Avoids warning with newer versions
)

# Train the model
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

def predict_heart_disease_probability(input_features):
    # Ensure input is 2D as required by scikit-learn
    input_features = [input_features]  # Wrap in list to make it 2D
    probability = model.predict_proba(input_features)[0][1]  # [0][1] selects the probability of class 1
    probability = round(probability, 3)
    return probability

example_input = [58,0,0,100,248,0,0,122,0,1,1,0,2] 
probability = predict_heart_disease_probability(example_input)
print(f"Predicted probability of heart disease: {probability}")

joblib.dump(model, 'heartdisease_xgb.pkl')

### Feature Importance Chart ###
# Extract feature importance values
importance_values = model.feature_importances_
feature_names = X.columns

# Sort features by importance
sorted_indices = importance_values.argsort()
sorted_features = feature_names[sorted_indices]
sorted_importance = importance_values[sorted_indices]

# Plot as a horizontal bar graph
plt.figure(figsize=(10, 6))
plt.barh(sorted_features, sorted_importance, color='skyblue')
plt.xlabel("Importance Score")
plt.title("Feature Importance in Gradient Boosting Model")
plt.show()

#Correlation Heatmap
plt.figure(figsize=(10, 8))
correlation = data.corr()
sns.heatmap(correlation, annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Feature Correlation Heatmap')
plt.show()

### ROC and AUC Curve ###
y_pred_proba = model.predict_proba(X_test)[:, 1]
fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, label=f'ROC curve (area = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC)')
plt.legend(loc="lower right")
plt.show()

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("Classification Report:")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

report = classification_report(y_test, y_pred, output_dict=True)
report_df = pd.DataFrame(report).transpose()
plt.figure(figsize=(8, 6))
sns.heatmap(report_df.iloc[:-1, :-1], annot=True, cmap="YlGnBu", fmt=".2f")
plt.title("Classification Report")
plt.show()
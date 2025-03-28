from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS

# Predefined user credentials
users = {
    "alice": "password123",
    "bob": "secure456",
    # Add all other users as per lab instructions
}

@app.route('/validate_login', methods=['POST'])
def validate_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users and users[username] == password:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})

@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    data = request.json
    try:
        model = joblib.load("./src/random_forest_model.pkl")  # Ensure model file exists
        
        # Prepare sample data (fix missing commas in original code)
        sample_data = [
            data['city'],
            data['province'],
            float(data['latitude']),
            float(data['longitude']),
            data['lease_term'],
            data['type'],
            float(data['beds']),
            float(data['baths']),
            float(data['sq_feet']),
            data['furnishing'],
            data['smoking'],
            data['pets'],  # Assuming pets maps to cats/dogs in the model
            data['pets']
        ]
        
        sample_df = pd.DataFrame([sample_data], columns=[
            'city', 'province', 'latitude', 'longitude', 'lease_term',
            'type', 'beds', 'baths', 'sq_feet', 'furnishing',
            'smoking', 'cats', 'dogs'
        ])
        
        predicted_price = model.predict(sample_df)
        return jsonify({"predicted_price": float(predicted_price[0])})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
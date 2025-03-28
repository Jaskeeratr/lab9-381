import React, { useState } from 'react';
import axios from 'axios';

function HousePricePredictor() {
  const [formData, setFormData] = useState({
    city: 'Calgary',
    province: 'Alberta',
    latitude: '51.0447',
    longitude: '-114.0719',
    lease_term: 'Long Term',
    type: 'Townhouse',
    beds: '3',
    baths: '2.5',
    sq_feet: '1403',
    furnishing: 'Unfurnished',
    smoking: 'Non-Smoking',
    pets: true
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict_house_price', formData);
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '40px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>House Price Predictor</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Column */}
        <div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>City:</div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Province:</div>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Latitude:</div>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              step="0.0000001"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Longitude:</div>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              step="0.0000001"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Lease Term:</div>
            <select 
              name="lease_term" 
              value={formData.lease_term} 
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            >
              <option>Long Term</option>
              <option>Short Term</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Type:</div>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            >
              <option>Townhouse</option>
              <option>Apartment</option>
              <option>House</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Beds:</div>
            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              min="1"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Baths:</div>
            <input
              type="number"
              name="baths"
              value={formData.baths}
              onChange={handleChange}
              min="1"
              step="0.5"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Square Feet:</div>
            <input
              type="number"
              name="sq_feet"
              value={formData.sq_feet}
              onChange={handleChange}
              min="100"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Furnishing:</div>
            <select 
              name="furnishing" 
              value={formData.furnishing} 
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            >
              <option>Unfurnished</option>
              <option>Partially Furnished</option>
              <option>Fully Furnished</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Smoking:</div>
            <select 
              name="smoking" 
              value={formData.smoking} 
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
            >
              <option>Non-Smoking</option>
              <option>Smoking Allowed</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="pets"
                checked={formData.pets}
                onChange={handleChange}
                style={{ marginRight: '8px' }}
              />
              <span style={{ fontWeight: 'bold' }}>I have a pet</span>
            </label>
          </div>
        </div>

        {/* Full-width Submit Button */}
        <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
          <button 
            type="submit" 
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Predict Price
          </button>
        </div>
      </form>

      {predictedPrice && (
        <div style={{
          marginTop: '30px',
          padding: '15px',
          borderTop: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '10px' }}>Predicted Rent Price:</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            ${predictedPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default HousePricePredictor;
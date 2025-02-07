import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 60px;
  padding-bottom: 1.5rem;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const FormHeader = styled.div`
  margin-bottom: 1rem;
  text-align: center;

  h1 {
    font-size: 1.6rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const FormSection = styled.div`
  margin-bottom: 1rem;
  
  h2 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
    padding-bottom: 0.3rem;
    border-bottom: 2px solid #0B79BF;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0.75rem;

  label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: 500;
    color: #333;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #0B79BF;
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.3rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: normal;
    cursor: pointer;
  }

  input[type="radio"] {
    width: auto;
    cursor: pointer;
  }
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed #ddd;
  padding: 1.5rem;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0B79BF;
  }

  input {
    display: none;
  }

  p {
    color: #666;
    margin-top: 0.75rem;
  }
`;

const SubmitButton = styled.button`
  background: #0B79BF;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;

  &:hover {
    background: #096397;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ListProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: 'new',
    price: '',
    description: '',
    location: '',
    images: [],
    brand: '',
    model: '',
    quantity: '',
    shippingMethod: 'seller',
    warranty: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Redirect to success page or dashboard
    navigate('/seller/dashboard');
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormHeader>
          <h1>List Your Product on The Extraordinary</h1>
          <p>Reach millions of customers and grow your business</p>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormSection>
            <h2>Basic Information</h2>
            <FormGroup>
              <label>Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Living</option>
                <option value="solar">Solar Solutions</option>
                <option value="phones">Phones & Tablets</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Condition</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="condition"
                    value="new"
                    checked={formData.condition === 'new'}
                    onChange={handleInputChange}
                  />
                  New
                </label>
                <label>
                  <input
                    type="radio"
                    name="condition"
                    value="used"
                    checked={formData.condition === 'used'}
                    onChange={handleInputChange}
                  />
                  Used
                </label>
              </RadioGroup>
            </FormGroup>
          </FormSection>

          <FormSection>
            <h2>Product Details</h2>
            <FormGroup>
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Enter brand name"
              />
            </FormGroup>

            <FormGroup>
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Enter model number/name"
              />
            </FormGroup>

            <FormGroup>
              <label>Price (R)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Quantity Available</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product in detail"
                required
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <h2>Location & Shipping</h2>
            <FormGroup>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter your location"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Shipping Method</label>
              <select
                name="shippingMethod"
                value={formData.shippingMethod}
                onChange={handleInputChange}
                required
              >
                <option value="seller">Seller Shipping</option>
                <option value="takealot">The Extraordinary Shipping</option>
              </select>
            </FormGroup>
          </FormSection>

          <FormSection>
            <h2>Images</h2>
            <ImageUploadContainer onClick={() => document.getElementById('imageUpload').click()}>
              <input
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p>Click to upload images (up to 8 images)</p>
              {formData.images.length > 0 && (
                <p>{formData.images.length} images selected</p>
              )}
            </ImageUploadContainer>
          </FormSection>

          <SubmitButton type="submit">
            List Product
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default ListProduct; 
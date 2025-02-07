import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Form = styled.form`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: #333;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #555;
  }

  input, select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #0B79BF;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderSummary = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;

  .total {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #ddd;
  }
`;

const SubmitButton = styled.button`
  background-color: #0B79BF;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0960a0;
  }
`;

const CheckoutForm = ({ items }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'South Africa',
    paymentMethod: 'credit_card'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order here
    navigate('/order-confirmation', { 
      state: { 
        orderDetails: {
          items,
          customerInfo: formData,
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase()
        }
      }
    });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <OrderSummary>
          <h2>Order Summary</h2>
          {items.map((item, index) => (
            <div key={index}>
              <p>{item.name} x {item.quantity} - R {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="total">
            Total: R {calculateTotal().toFixed(2)}
          </div>
        </OrderSummary>

        <FormSection>
          <h2>Personal Information</h2>
          <Grid>
            <InputGroup>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Grid>
          <Grid>
            <InputGroup>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Grid>
        </FormSection>

        <FormSection>
          <h2>Shipping Information</h2>
          <InputGroup>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Grid>
            <InputGroup>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Grid>
        </FormSection>

        <FormSection>
          <h2>Payment Method</h2>
          <InputGroup>
            <label>Select Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="eft">EFT</option>
            </select>
          </InputGroup>
        </FormSection>

        <SubmitButton type="submit">
          Place Order
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default CheckoutForm; 
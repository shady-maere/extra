import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { clearCart } from '../redux/cartSlice';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const PlaceOrderButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 4px;
  width: 100%;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 5px;
`;

function Checkout() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
  });

  const [errors, setErrors] = useState({});

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.province) newErrors.province = 'Province is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R ', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
    const shipping = 150;
    return subtotal + shipping;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the order to your backend
      // For now, we'll just simulate a successful order
      alert('Order placed successfully!');
      dispatch(clearCart());
      navigate('/');
    }
  };

  return (
    <CheckoutContainer>
      <form onSubmit={handleSubmit}>
        <CheckoutLayout>
          <div>
            <FormSection>
              <h2>Contact Information</h2>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
            </FormSection>

            <FormSection style={{ marginTop: '20px' }}>
              <h2>Shipping Address</h2>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Province</Label>
                <Select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                >
                  <option value="">Select Province</option>
                  {provinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </Select>
                {errors.province && <ErrorMessage>{errors.province}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Postal Code</Label>
                <Input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
                {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
              </FormGroup>
            </FormSection>
          </div>

          <OrderSummary>
            <h2>Order Summary</h2>
            {cartItems.map(item => (
              <SummaryItem key={item.id}>
                <div>
                  <div>{item.name}</div>
                  <div style={{ color: '#666' }}>Quantity: {item.quantity}</div>
                </div>
                <div>{item.price}</div>
              </SummaryItem>
            ))}
            <SummaryItem>
              <span>Shipping</span>
              <span>R 150.00</span>
            </SummaryItem>
            <SummaryItem style={{ fontWeight: 'bold' }}>
              <span>Total</span>
              <span>R {calculateTotal().toFixed(2)}</span>
            </SummaryItem>
            <PlaceOrderButton type="submit">
              Place Order
            </PlaceOrderButton>
          </OrderSummary>
        </CheckoutLayout>
      </form>
    </CheckoutContainer>
  );
}

export default Checkout;

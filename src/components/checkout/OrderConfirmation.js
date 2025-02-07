import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle, FaHome, FaFileAlt } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  color: #4CAF50;
  font-size: 4rem;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

const OrderDetails = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: left;
`;

const Section = styled.div`
  margin-bottom: 25px;

  h2 {
    color: #333;
    font-size: 1.2rem;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &.primary {
    background-color: #0B79BF;
    color: white;

    &:hover {
      background-color: #0960a0;
    }
  }

  &.secondary {
    background-color: white;
    color: #0B79BF;
    border: 1px solid #0B79BF;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <Container>
        <Title>Order Not Found</Title>
        <Button to="/" className="primary">
          <FaHome /> Return to Home
        </Button>
      </Container>
    );
  }

  const { items, customerInfo, orderNumber } = orderDetails;

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Container>
      <SuccessIcon>
        <FaCheckCircle />
      </SuccessIcon>
      <Title>Order Confirmed!</Title>
      <Subtitle>Thank you for shopping with The Extraordinary</Subtitle>

      <OrderDetails>
        <Section>
          <h2>Order Number: {orderNumber}</h2>
          <p>A confirmation email has been sent to {customerInfo.email}</p>
        </Section>

        <Section>
          <h2>Order Summary</h2>
          {items.map((item, index) => (
            <p key={index}>
              {item.name} x {item.quantity} - R {(item.price * item.quantity).toFixed(2)}
            </p>
          ))}
          <p style={{ fontWeight: 'bold', marginTop: '15px' }}>
            Total: R {calculateTotal().toFixed(2)}
          </p>
        </Section>

        <Section>
          <h2>Shipping Details</h2>
          <p>{customerInfo.firstName} {customerInfo.lastName}</p>
          <p>{customerInfo.address}</p>
          <p>{customerInfo.city}, {customerInfo.postalCode}</p>
          <p>{customerInfo.country}</p>
        </Section>
      </OrderDetails>

      <ButtonGroup>
        <Button to="/" className="primary">
          <FaHome /> Continue Shopping
        </Button>
        <Button to="/orders" className="secondary">
          <FaFileAlt /> View Orders
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default OrderConfirmation; 
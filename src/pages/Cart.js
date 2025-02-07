import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 576px) {
    grid-template-columns: 80px 1fr;
    gap: 10px;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ItemPrice = styled.p`
  color: #007bff;
  font-weight: bold;
  margin: 0;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: start;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const QuantityButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const CartSummary = styled.div`
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
`;

const CheckoutButton = styled.button`
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
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px;
`;

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R ', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const shipping = 150; // Fixed shipping cost
  const subtotal = calculateSubtotal();
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Browse our products and add some items to your cart</p>
          <Link to="/">
            <CheckoutButton>Continue Shopping</CheckoutButton>
          </Link>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartLayout>
        <CartItems>
          <h2>Shopping Cart ({cartItems.length} items)</h2>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemPrice>{item.price}</ItemPrice>
              </ItemInfo>
              <ItemActions>
                <QuantitySelector>
                  <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                    -
                  </QuantityButton>
                  <span>{item.quantity}</span>
                  <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    +
                  </QuantityButton>
                </QuantitySelector>
                <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </RemoveButton>
              </ItemActions>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <h3>Order Summary</h3>
          <SummaryItem>
            <span>Subtotal</span>
            <span>R {subtotal.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping</span>
            <span>R {shipping.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem style={{ fontWeight: 'bold' }}>
            <span>Total</span>
            <span>R {total.toFixed(2)}</span>
          </SummaryItem>
          <CheckoutButton onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </CheckoutButton>
        </CartSummary>
      </CartLayout>
    </CartContainer>
  );
}

export default Cart;

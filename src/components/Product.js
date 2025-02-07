import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import ProductImageGallery from './ProductImageGallery';
import { useNavigate } from 'react-router-dom';

const ProductCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  
  svg {
    color: #666;
    font-size: 1rem;
  }
  
  &:hover svg {
    color: #ff4d4d;
  }
`;

const ProductInfo = styled.div`
  padding: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductBrand = styled.div`
  color: #0B79BF;
  font-size: 0.8rem;
  margin-bottom: 4px;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  
  &:hover {
    color: #0B79BF;
  }
`;

const PriceContainer = styled.div`
  margin-top: auto;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const OriginalPrice = styled.div`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 4px;
`;

const Discount = styled.span`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-left: 8px;
`;

const DeliveryInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 12px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  
  svg {
    color: #ffc107;
    font-size: 0.9rem;
  }
  
  span {
    color: #666;
    font-size: 0.8rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: #0B79BF;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #0a6ca8;
  }
  
  svg {
    font-size: 0.9rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.primary {
    background: var(--primary-color);
    color: white;
    &:hover {
      background: #0077cc;
    }
  }

  &.secondary {
    background: var(--light-gray);
    color: var(--text-color);
    &:hover {
      background: #e0e0e0;
    }
  }

  &.view {
    background: #4CAF50;
    color: white;
    &:hover {
      background: #3d8b40;
    }
  }
`;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch({ type: 'cart/addItem', payload: product });
  };

  const handleAddToWishlist = () => {
    dispatch({ type: 'wishlist/addItem', payload: product });
  };

  const handleView = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <ProductCard>
      <WishlistButton onClick={handleAddToWishlist}>
        <FaHeart />
      </WishlistButton>
      
      <ProductImageGallery 
        images={product.images}
        style={{ aspectRatio: '1/1', objectFit: 'contain' }}
      />
      
      <ProductInfo>
        <ProductBrand>{product.brand}</ProductBrand>
        <ProductName>{product.name}</ProductName>
        
        <Rating>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <span>(123)</span>
        </Rating>
        
        <PriceContainer>
          {product.originalPrice && (
            <OriginalPrice>R {product.originalPrice}</OriginalPrice>
          )}
          <ProductPrice>
            R {product.price}
            {product.discount && (
              <Discount>-{product.discount}%</Discount>
            )}
          </ProductPrice>
          
          <DeliveryInfo>
            Free delivery available
          </DeliveryInfo>
          
          <ActionButtons>
            <Button className="view" onClick={handleView}>
              View Product
            </Button>
            <Button className="primary" onClick={handleAddToCart}>
              <FaShoppingCart />
              Add to Cart
            </Button>
          </ActionButtons>
        </PriceContainer>
      </ProductInfo>
    </ProductCard>
  );
};

export default Product;

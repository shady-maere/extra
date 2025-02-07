import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const InfoSection = styled.div`
  h1 {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  .price {
    font-size: 2rem;
    color: #0B79BF;
    font-weight: bold;
    margin: 15px 0;
  }

  .description {
    color: #666;
    line-height: 1.6;
    margin: 20px 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  min-width: 160px;
  justify-content: center;

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

  &.view {
    background-color: #4CAF50;
    color: white;
    
    &:hover {
      background-color: #3d8b40;
    }
  }
`;

const Specifications = styled.div`
  margin-top: 30px;
  
  h3 {
    margin-bottom: 15px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    tr {
      border-bottom: 1px solid #eee;
      
      td {
        padding: 10px 0;
        
        &:first-child {
          color: #666;
          width: 200px;
        }
      }
    }
  }
`;

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showFullImage, setShowFullImage] = useState(false);

  const handleBuyNow = () => {
    navigate('/checkout', { 
      state: { 
        items: [{ ...product, quantity }],
        buyNow: true 
      } 
    });
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    navigate('/cart');
  };

  const handleView = () => {
    setShowFullImage(true);
  };

  return (
    <Container>
      <ProductWrapper>
        <ImageSection>
          <img 
            src={product.image} 
            alt={product.name} 
            onClick={handleView}
            style={{ cursor: 'pointer' }}
          />
        </ImageSection>
        
        <InfoSection>
          <h1>{product.name}</h1>
          <div className="price">R {product.price.toFixed(2)}</div>
          
          <div className="description">
            {product.description}
          </div>
          
          <Specifications>
            <h3>Specifications</h3>
            <table>
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </table>
          </Specifications>
          
          <ActionButtons>
            <Button className="view" onClick={handleView}>
              View Product
            </Button>
            <Button className="primary" onClick={handleBuyNow}>
              <FaShoppingCart /> Buy Now
            </Button>
            <Button className="secondary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </ActionButtons>
        </InfoSection>
      </ProductWrapper>

      {showFullImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={() => setShowFullImage(false)}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: '90%',
              maxHeight: '90vh',
              objectFit: 'contain'
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default ProductDetail; 
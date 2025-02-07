import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart, FaTag, FaSearch } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background-color);
`;

const HeaderTop = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
`;

const Logo = styled(Link)`
  img {
    height: 40px;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UserNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.9rem;
  }
`;

const MainNav = styled.nav`
  background: var(--primary-color);
  padding: 0.5rem 0;
  margin-bottom: 2rem;
`;

const NavLinks = styled.ul`
  max-width: 1200px;
  margin: 0 auto;
  list-style: none;
  display: flex;
  gap: 2rem;
  padding: 0 1rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    &.special {
      color: #ffeb3b;
      font-weight: bold;
    }
  }
`;

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DiscountTag = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff4081;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProductContent = styled.div`
  padding: 1rem;

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .price {
    margin: 1rem 0;
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
`;

const BluetoothSpeakers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: '5cd59cb3',
      name: 'Premium Bluetooth Speaker',
      price: 1299.99,
      originalPrice: 1599.99,
      discount: 20,
      image: '/images/bluetooth speakers/5cd59cb3e060820c6e0995ae-large.jpg'
    },
    {
      id: '5cd43755',
      name: 'Portable Wireless Speaker',
      price: 899.99,
      originalPrice: 1099.99,
      discount: 15,
      image: '/images/bluetooth speakers/5cd4375581037c072654d035-large.jpg'
    },
    {
      id: '5ef31e2d',
      name: 'Party Speaker System',
      price: 1499.99,
      originalPrice: 1799.99,
      discount: 25,
      image: '/images/bluetooth speakers/5ef31e2dac3e7d27e727ef26-large.jpg'
    },
    {
      id: '5fe43686',
      name: 'Mini Bluetooth Speaker',
      price: 699.99,
      originalPrice: 899.99,
      discount: 30,
      image: '/images/bluetooth speakers/5fe43686d9e0e2f0b4b428d0-large.jpg'
    },
    {
      id: '64ac0936',
      name: 'Bass Boost Speaker',
      price: 1099.99,
      originalPrice: 1299.99,
      discount: 18,
      image: '/images/bluetooth speakers/64ac0936ab42e8de237d41f8-large.jpg'
    },
    {
      id: '65e97467',
      name: 'Smart Bluetooth Speaker',
      price: 1599.99,
      originalPrice: 1899.99,
      discount: 22,
      image: '/images/bluetooth speakers/65e97467789c92944335bd37-large.jpg'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <PageContainer>
      <ProductsContainer>
        <h1 style={{ marginBottom: '2rem' }}>Bluetooth Speakers</h1>
        <ProductsGrid>
          {products.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                {product.discount && (
                  <DiscountTag>
                    <FaTag /> {product.discount}% OFF
                  </DiscountTag>
                )}
              </ProductImage>
              <ProductContent>
                <h3>{product.name}</h3>
                <div className="price">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      R {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: '#666', fontSize: '0.9rem' }}>
                        R {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <ActionButtons>
                  <Button className="primary">
                    <FaShoppingCart /> Add to Cart
                  </Button>
                  <Button className="secondary">
                    <FaHeart />
                  </Button>
                </ActionButtons>
              </ProductContent>
            </ProductCard>
          ))}
        </ProductsGrid>
      </ProductsContainer>
    </PageContainer>
  );
};

export default BluetoothSpeakers; 
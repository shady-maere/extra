import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart, FaTag, FaSearch, FaStar } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 120px;
`;

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.8rem;
    color: #333;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0B79BF;
  }
`;

const SearchButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #0B79BF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #096397;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-4px);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e41e31;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #f5f5f5;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }
`;

const ImageWithFallback = ({ src, alt }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img 
      src={error ? '/images/placeholder.jpg' : src} 
      alt={alt}
      onError={handleError}
    />
  );
};

const ProductContent = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  min-height: 40px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
  
  .stars {
    color: #ffc107;
    display: flex;
    gap: 2px;
  }
  
  .rating-count {
    color: #666;
    font-size: 0.9rem;
  }
`;

const PriceContainer = styled.div`
  margin: 0.5rem 0;
`;

const CurrentPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
`;

const OriginalPrice = styled.span`
  color: #999;
  text-decoration: line-through;
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.7rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &.primary {
    background: #0B79BF;
    color: white;
    
    &:hover {
      background: #096397;
    }
  }

  &.secondary {
    background: #f5f5f5;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  }
`;

const CategoryProducts = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get products from Redux store
  const { products } = useSelector(state => state.products);
  
  // Filter products only by search query
  const filteredProducts = (products || []).filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatCategoryName = (cat) => {
    switch(cat.toLowerCase()) {
      case 'solar':
        return 'Solar Panels, Inverters & Batteries';
      case 'fashion':
        return 'Fashion';
      case 'phones':
        return 'Phones';
      case 'speakers':
        return 'Speakers';
      case 'earpods':
        return 'Earpods & Accessories';
      default:
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice) return null;
    const current = parseFloat(price.replace('R ', '').replace(',', ''));
    const original = parseFloat(originalPrice.replace('R ', '').replace(',', ''));
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <PageContainer>
      <ProductsContainer>
        <CategoryHeader>
          <h1>All Products</h1>
        </CategoryHeader>
        
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchContainer>
        
        <ProductsGrid>
          {filteredProducts.map(product => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            return (
              <ProductCard key={product.id}>
                <ProductImage>
                  <ImageWithFallback src={product.image} alt={product.name} />
                  {discount && (
                    <DiscountBadge>{discount}% OFF</DiscountBadge>
                  )}
                </ProductImage>
                <ProductContent>
                  <ProductTitle>{product.name}</ProductTitle>
                  <RatingContainer>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} />
                      ))}
                    </div>
                    <span className="rating-count">(5)</span>
                  </RatingContainer>
                  <PriceContainer>
                    <CurrentPrice>{product.price}</CurrentPrice>
                    {product.originalPrice && (
                      <OriginalPrice>{product.originalPrice}</OriginalPrice>
                    )}
                  </PriceContainer>
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
            );
          })}
        </ProductsGrid>
      </ProductsContainer>
    </PageContainer>
  );
};

export default CategoryProducts;
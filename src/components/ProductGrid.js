import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Product from './Product';

const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
    padding: 15px;
  }
`;

const GridHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  
  &:hover {
    border-color: #0B79BF;
  }
`;

const ResultCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ProductGrid = () => {
  const products = useSelector(state => state.products.items);

  return (
    <GridContainer>
      <GridHeader>
        <ResultCount>{products.length} results</ResultCount>
        <SortSelect>
          <option value="featured">Featured</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="newest">Newest First</option>
          <option value="bestselling">Bestselling</option>
        </SortSelect>
      </GridHeader>
      <Grid>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default ProductGrid;

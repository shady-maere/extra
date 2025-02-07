import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../redux/cartSlice';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 160px auto 0;
  padding: 20px;
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  position: relative;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  color: #2d2d2d;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  color: #0066cc;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0052a3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const WishlistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #f8f9fa;
  color: #2d2d2d;
  border: 1px solid #dee2e6;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const product = products.find(p => p.id === parseInt(id));

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    }));
  };

  // Get default image if product image is not available
  const getProductImage = (product) => {
    if (product?.image) {
      return `/${product.image}`; // Add leading slash for absolute path
    }
    // Return a default image URL for products without images
    return `https://via.placeholder.com/400x400/f8f9fa/2d2d2d?text=${encodeURIComponent(product?.name || 'Product')}`;
  };

  if (!product) {
    return (
      <ProductContainer>
        <h2>Product not found</h2>
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>
      <ProductLayout>
        <ImageSection>
          <MainImage>
            <img src={getProductImage(product)} alt={product.name} />
          </MainImage>
        </ImageSection>

        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductPrice>{product.price}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>

          <ButtonGroup>
            <AddToCartButton onClick={handleAddToCart}>
              <FaShoppingCart />
              Add to Cart
            </AddToCartButton>
            <WishlistButton>
              <FaHeart />
              Add to Wishlist
            </WishlistButton>
          </ButtonGroup>
        </ProductInfo>
      </ProductLayout>
    </ProductContainer>
  );
}

export default ProductDetails;

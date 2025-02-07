import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
  Box,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { addToCart } from '../store/slices/cartSlice';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}));

const ProductImage = styled(CardMedia)({
  paddingTop: '75%', // 4:3 aspect ratio
  backgroundSize: 'contain'
});

const ProductContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
});

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  marginTop: 'auto'
});

const OriginalPrice = styled(Typography)({
  textDecoration: 'line-through',
  color: 'text.secondary'
});

const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2)
}));

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (product.quantity > 0) {
      dispatch(
        addToCart({
          product: product._id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          quantity: 1
        })
      );
      navigate('/cart');
    }
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <ProductImage
        image={product.images[0]}
        title={product.title}
        alt={product.title}
      />

      <ProductContent>
        <Typography gutterBottom variant="subtitle1">
          {product.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={product.averageRating}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.numReviews})
          </Typography>
        </Box>

        {product.condition === 'used' && (
          <Chip
            label="Used"
            size="small"
            color="default"
            sx={{ alignSelf: 'flex-start', mb: 1 }}
          />
        )}

        <PriceContainer>
          <Typography variant="h6" color="primary">
            R{product.price.toFixed(2)}
          </Typography>
          {product.originalPrice && (
            <>
              <OriginalPrice variant="body2">
                R{product.originalPrice.toFixed(2)}
              </OriginalPrice>
              <Chip
                label={`${calculateDiscount(
                  product.originalPrice,
                  product.price
                )}% OFF`}
                size="small"
                color="error"
              />
            </>
          )}
        </PriceContainer>

        {product.quantity === 0 && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            Out of Stock
          </Typography>
        )}
      </ProductContent>
    </StyledCard>
  );
};

export default ProductCard; 
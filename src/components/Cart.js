import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Grid,
  Divider,
  TextField,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import {
  removeFromCart,
  updateQuantity,
  clearCart
} from '../store/slices/cartSlice';

const CartItemCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  position: 'relative'
}));

const ItemContent = styled(CardContent)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
});

const ItemImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'contain'
});

const QuantityControl = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const SummaryCard = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  padding: theme.spacing(2)
}));

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=shipping');
    } else {
      navigate('/shipping');
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 4, minHeight: '60vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CartIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
          <Typography variant="h5" color="text.secondary">
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <CartItemCard key={item.product}>
              <ItemContent>
                <ItemImage src={item.image} alt={item.title} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Price: R{item.price.toFixed(2)}
                  </Typography>
                  <QuantityControl>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.product, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      size="small"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product,
                          parseInt(e.target.value) || 0
                        )
                      }
                      sx={{ width: '60px' }}
                      inputProps={{ min: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.product, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </QuantityControl>
                </Box>
                <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
                  R{(item.price * item.quantity).toFixed(2)}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(item.product)}
                >
                  <DeleteIcon />
                </IconButton>
              </ItemContent>
            </CartItemCard>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>R{itemsPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>R{shippingPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax:</Typography>
              <Typography>R{taxPrice.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
              }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">R{totalPrice}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>

            {!user && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Please log in to checkout
              </Alert>
            )}
          </SummaryCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 
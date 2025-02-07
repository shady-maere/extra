import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { createOrder } from '../../store/slices/orderSlice';
import { clearCart } from '../../store/slices/cartSlice';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1000,
  margin: '40px auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: '20px auto'
  }
}));

const OrderItem = styled(ListItem)({
  padding: '20px 0',
  '&:first-of-type': {
    paddingTop: 0
  }
});

const ItemImage = styled('img')({
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  marginRight: '16px'
});

const steps = ['Shipping', 'Payment', 'Place Order'];

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading, error, success, order } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (!cart.shippingAddress) {
      navigate('/shipping');
    }
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
    if (success && order) {
      dispatch(clearCart());
      navigate(`/order/${order._id}`);
    }
  }, [user, cart, success, order, navigate, dispatch]);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.items,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      })
    );
  };

  return (
    <Container>
      <FormContainer elevation={3}>
        <Stepper activeStep={2} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography variant="h5" gutterBottom align="center">
          Order Summary
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Typography>
                {cart.shippingAddress.street}, {cart.shippingAddress.city}
                <br />
                {cart.shippingAddress.state}, {cart.shippingAddress.postalCode}
                <br />
                {cart.shippingAddress.country}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Typography>
                {cart.paymentMethod?.type === 'stripe'
                  ? 'Credit Card'
                  : 'PayPal'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <List disablePadding>
                {cart.items.map((item) => (
                  <React.Fragment key={item.product}>
                    <OrderItem>
                      <ItemImage src={item.image} alt={item.title} />
                      <ListItemText
                        primary={item.title}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography variant="body2">
                        R{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </OrderItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Total
              </Typography>
              <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Items" />
                  <Typography>R{cart.itemsPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Shipping" />
                  <Typography>R{cart.shippingPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tax" />
                  <Typography>R{cart.taxPrice.toFixed(2)}</Typography>
                </ListItem>
                <Divider />
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Total" />
                  <Typography variant="h6">
                    R{cart.totalPrice}
                  </Typography>
                </ListItem>
              </List>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handlePlaceOrder}
                disabled={loading || cart.items.length === 0}
                sx={{ mt: 3 }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Place Order'
                )}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </FormContainer>
    </Container>
  );
};

export default PlaceOrder; 
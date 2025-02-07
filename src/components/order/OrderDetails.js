import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getOrderDetails, payOrder, cancelOrder } from '../../store/slices/orderSlice';
import { loadStripe } from '@stripe/stripe-js';

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

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  const handlePayment = async () => {
    if (order.paymentMethod.type === 'stripe') {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      dispatch(payOrder({ orderId, paymentMethod: 'stripe', stripe }));
    } else {
      // Handle PayPal payment
      dispatch(payOrder({ orderId, paymentMethod: 'paypal' }));
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder(orderId));
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Order not found</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <FormContainer elevation={3}>
        <Typography variant="h5" gutterBottom align="center">
          Order Details
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order #{order._id}
          </Typography>
          <Typography color="textSecondary">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
          <Typography
            color={order.status === 'cancelled' ? 'error' : 'primary'}
            sx={{ mt: 1 }}
          >
            Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Typography>
                {order.shippingAddress.street}, {order.shippingAddress.city}
                <br />
                {order.shippingAddress.state}, {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Typography>
                {order.paymentMethod.type === 'stripe' ? 'Credit Card' : 'PayPal'}
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                Payment Status: {order.isPaid ? 'Paid' : 'Pending'}
                {order.paidAt && ` on ${new Date(order.paidAt).toLocaleDateString()}`}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <List disablePadding>
                {order.orderItems.map((item) => (
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
                Order Summary
              </Typography>
              <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Items" />
                  <Typography>R{order.itemsPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Shipping" />
                  <Typography>R{order.shippingPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tax" />
                  <Typography>R{order.taxPrice.toFixed(2)}</Typography>
                </ListItem>
                <Divider />
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Total" />
                  <Typography variant="h6">
                    R{order.totalPrice.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>

              {!order.isPaid && order.status !== 'cancelled' && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handlePayment}
                  sx={{ mt: 2 }}
                >
                  Pay Now
                </Button>
              )}

              {order.status !== 'cancelled' &&
                order.user === user?._id &&
                !order.isPaid && (
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    size="large"
                    onClick={handleCancel}
                    sx={{ mt: 2 }}
                  >
                    Cancel Order
                  </Button>
                )}
            </Paper>
          </Grid>
        </Grid>
      </FormContainer>
    </Container>
  );
};

export default OrderDetails; 
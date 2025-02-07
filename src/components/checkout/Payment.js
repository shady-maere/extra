import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { savePaymentMethod } from '../../store/slices/cartSlice';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '40px auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: '20px auto'
  }
}));

const CardContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.background.default
}));

const steps = ['Shipping', 'Payment', 'Place Order'];

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const { shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=payment');
    }
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [user, shippingAddress, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (paymentMethod === 'stripe') {
      if (!stripe || !elements) {
        setProcessing(false);
        return;
      }

      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      dispatch(
        savePaymentMethod({
          type: 'stripe',
          id: stripePaymentMethod.id
        })
      );
    } else {
      dispatch(
        savePaymentMethod({
          type: 'paypal'
        })
      );
    }

    setProcessing(false);
    navigate('/placeorder');
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };

  return (
    <Container>
      <FormContainer elevation={3}>
        <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography variant="h5" gutterBottom align="center">
          Payment Method
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
            <FormLabel component="legend">Select Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="stripe"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
            </RadioGroup>
          </FormControl>

          {paymentMethod === 'stripe' && (
            <CardContainer>
              <CardElement options={cardElementOptions} />
            </CardContainer>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/shipping')}
              size="large"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!stripe || processing}
            >
              {processing ? (
                <CircularProgress size={24} />
              ) : (
                'Continue to Review Order'
              )}
            </Button>
          </Box>
        </form>
      </FormContainer>
    </Container>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment; 
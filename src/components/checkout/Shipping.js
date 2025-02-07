import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { saveShippingAddress } from '../../store/slices/cartSlice';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '40px auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: '20px auto'
  }
}));

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

const steps = ['Shipping', 'Payment', 'Place Order'];

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=shipping');
    }

    if (shippingAddress) {
      setFormData(shippingAddress);
    } else if (user?.address) {
      setFormData(user.address);
    }
  }, [user, shippingAddress, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate('/payment');
  };

  return (
    <Container>
      <FormContainer elevation={3}>
        <Stepper activeStep={0} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography variant="h5" gutterBottom align="center">
          Shipping Information
        </Typography>

        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Street Address"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="State/Province"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/cart')}
              size="large"
            >
              Back to Cart
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Continue to Payment
            </Button>
          </Box>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Shipping; 
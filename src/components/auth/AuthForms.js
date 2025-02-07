import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Divider,
} from '@mui/material';
import { FaGoogle, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const FormContainer = styled(Paper)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  padding: 20px;
  z-index: 1100;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const AuthForms = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      // Handle login
      dispatch(login(formData));
    } else {
      // Handle register
      // Add registration logic here
    }
    onClose();
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Google login clicked');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <FormContainer elevation={3}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography variant="h5" align="center" gutterBottom>
            {mode === 'login' ? 'Login' : 'Register'}
          </Typography>

          {mode === 'register' && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#0B79BF' }}
          >
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FaGoogle />}
            onClick={handleGoogleLogin}
            sx={{ mb: 2 }}
          >
            Continue with Google
          </Button>

          <Typography align="center">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <Button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              sx={{ color: '#0B79BF' }}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </Button>
          </Typography>
        </Box>
      </FormContainer>
    </>
  );
};

export default AuthForms; 
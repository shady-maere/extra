import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getMyOrders } from '../../store/slices/orderSlice';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '40px auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: '20px auto'
  }
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: 
    status === 'delivered'
      ? theme.palette.success.light
      : status === 'cancelled'
      ? theme.palette.error.light
      : status === 'paid'
      ? theme.palette.info.light
      : theme.palette.warning.light,
  color: 
    status === 'delivered'
      ? theme.palette.success.dark
      : status === 'cancelled'
      ? theme.palette.error.dark
      : status === 'paid'
      ? theme.palette.info.dark
      : theme.palette.warning.dark,
}));

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getMyOrders());
    }
  }, [dispatch, user, navigate]);

  const getStatusChip = (order) => {
    let status = order.status;
    if (order.isDelivered) status = 'delivered';
    else if (order.isPaid) status = 'paid';

    return (
      <StatusChip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        size="small"
        status={status}
      />
    );
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

  return (
    <Container>
      <FormContainer elevation={3}>
        <Typography variant="h5" gutterBottom align="center">
          Order History
        </Typography>

        {orders?.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            You haven't placed any orders yet.
          </Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>R{order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>{getStatusChip(order)}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/order/${order._id}`)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </FormContainer>
    </Container>
  );
};

export default OrderHistory; 
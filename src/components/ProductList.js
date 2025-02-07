import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductCard from './ProductCard';
import { fetchProducts } from '../store/slices/productSlice';

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap'
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, page, pages } = useSelector(
    (state) => state.products
  );

  const [filters, setFilters] = useState({
    category: '',
    sort: 'createdAt:desc',
    keyword: '',
    page: 1
  });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (event, value) => {
    setFilters((prev) => ({
      ...prev,
      page: value
    }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <FilterContainer>
        <StyledFormControl>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            label="Category"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="home">Home & Living</MenuItem>
            <MenuItem value="solar">Solar Solutions</MenuItem>
            <MenuItem value="phones">Phones & Tablets</MenuItem>
          </Select>
        </StyledFormControl>

        <StyledFormControl>
          <InputLabel>Sort By</InputLabel>
          <Select
            name="sort"
            value={filters.sort}
            label="Sort By"
            onChange={handleFilterChange}
          >
            <MenuItem value="createdAt:desc">Newest First</MenuItem>
            <MenuItem value="price:asc">Price: Low to High</MenuItem>
            <MenuItem value="price:desc">Price: High to Low</MenuItem>
            <MenuItem value="averageRating:desc">Highest Rated</MenuItem>
          </Select>
        </StyledFormControl>

        <TextField
          name="keyword"
          label="Search Products"
          variant="outlined"
          value={filters.keyword}
          onChange={handleFilterChange}
          sx={{ flexGrow: 1 }}
        />
      </FilterContainer>

      {products.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ my: 4 }}>
          No products found
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4
            }}
          >
            <Pagination
              count={pages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProductList; 
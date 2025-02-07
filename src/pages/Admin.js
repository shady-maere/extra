import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AdminContainer = styled.div`
  font-family: 'Nunito', sans-serif;
  padding: 20px;
  max-width: 1000px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  margin-top: 20px;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 10px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid var(--border-color);
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff574a;
  }
`;

const Admin = () => {
  const products = useSelector((state) => state.products.items);
  const vendors = useSelector((state) => state.vendor.vendors);

  const handleDeleteSeller = (sellerId) => {
    // TODO: Implement delete seller functionality
    console.log(`Delete seller with ID: ${sellerId}`);
  };

  const handleDeleteListing = (listingId) => {
    // TODO: Implement delete listing functionality
    console.log(`Delete listing with ID: ${listingId}`);
  };

  return (
    <AdminContainer>
      <PageTitle>Admin Dashboard</PageTitle>

      <SectionTitle>Listings</SectionTitle>
      <List>
        {products.map(product => (
          <ListItem key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <DeleteButton onClick={() => handleDeleteListing(product.id)}>Delete</DeleteButton>
          </ListItem>
        ))}
      </List>

      <SectionTitle>Sellers</SectionTitle>
      <List>
        {vendors.map(vendor => (
          <ListItem key={vendor.id}>
            <span>{vendor.name}</span>
            <DeleteButton onClick={() => handleDeleteSeller(vendor.id)}>Delete</DeleteButton>
          </ListItem>
        ))}
      </List>
    </AdminContainer>
  );
};

export default Admin;
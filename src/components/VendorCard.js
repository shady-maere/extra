import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
`;

const VendorName = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
`;

const VendorEmail = styled.p`
  color: #666;
  margin-bottom: 5px;
`;

const VendorCard = ({ vendor }) => {
  return (
    <CardContainer>
      <VendorName>{vendor.name}</VendorName>
      <VendorEmail>Email: {vendor.email}</VendorEmail>
      {/* Add more vendor details here */}
    </CardContainer>
  );
};

export default VendorCard;
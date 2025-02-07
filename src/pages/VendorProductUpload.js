import React from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;

const UploadForm = styled.div`
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 600px;
  max-width: 95%;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: var(--primary-color);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: var(--text-color);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(45, 139, 255, 0.2);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  resize: vertical;
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(45, 139, 255, 0.2);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  background-color: #fff;
  color: var(--text-color);
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(45, 139, 255, 0.2);
    outline: none;
  }
`;

const UploadButton = styled.button`
  padding: 14px 25px;
  border: none;
  border-radius: 6px;
  background-color: var(--primary-color);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const VendorProductUpload = () => {
  return (
    <UploadContainer>
      <UploadForm>
        <FormTitle>Product Upload</FormTitle>
        <form>
          <FormGroup>
            <Label htmlFor="productName">Product Name:</Label>
            <Input type="text" id="productName" name="productName" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description:</Label>
            <TextArea id="description" name="description" rows="5" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="category">Category:</Label>
            <Select id="category" name="category">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              {/* Add more categories here */}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">Price:</Label>
            <Input type="number" id="price" name="price" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Product Image:</Label>
            <Input type="file" id="image" name="image" />
          </FormGroup>
          <UploadButton type="submit">Upload Product</UploadButton>
        </form>
      </UploadForm>
    </UploadContainer>
  );
};

export default VendorProductUpload;
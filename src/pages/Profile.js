import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;

const ProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  height: fit-content;
`;

const MainContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const MenuButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px;
  margin-bottom: 5px;
  border: none;
  background: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#007bff' : '#f8f9fa'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const OrderCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const OrderItems = styled.div`
  margin-top: 10px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  });

  // Sample order history data
  const orders = [
    {
      id: '12345',
      date: '2024-02-01',
      status: 'Delivered',
      total: 'R 2,499.99',
      items: [
        { name: 'Samsung Galaxy Watch', quantity: 1, price: 'R 2,499.99' }
      ]
    },
    {
      id: '12344',
      date: '2024-01-25',
      status: 'Processing',
      total: 'R 19,999.00',
      items: [
        { name: 'Samsung 470l Frost Free', quantity: 1, price: 'R 19,999.00' }
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically update the profile in your backend
    alert('Profile updated successfully!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleSubmit}>
            <h2>Profile Information</h2>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
              />
            </FormGroup>
            <SaveButton type="submit">Save Changes</SaveButton>
          </form>
        );

      case 'orders':
        return (
          <div>
            <h2>Order History</h2>
            {orders.map(order => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <div>
                    <strong>Order #{order.id}</strong>
                    <div>Date: {order.date}</div>
                  </div>
                  <div>
                    <div>Status: {order.status}</div>
                    <div>Total: {order.total}</div>
                  </div>
                </OrderHeader>
                <OrderItems>
                  {order.items.map((item, index) => (
                    <OrderItem key={index}>
                      <span>{item.name} x{item.quantity}</span>
                      <span>{item.price}</span>
                    </OrderItem>
                  ))}
                </OrderItems>
              </OrderCard>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ProfileContainer>
      <ProfileLayout>
        <Sidebar>
          <MenuButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
          </MenuButton>
          <MenuButton
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </MenuButton>
        </Sidebar>
        <MainContent>
          {renderContent()}
        </MainContent>
      </ProfileLayout>
    </ProfileContainer>
  );
}

export default Profile;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaMobile,
  FaVolumeUp,
  FaSun,
  FaTshirt,
  FaHeadphones,
  FaTimes,
  FaUser,
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaQuestionCircle,
  FaStore,
  FaHistory,
  FaUserCircle
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AuthForms from './auth/AuthForms';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-100%'};
  width: 85%;
  height: 100%;
  background-color: white;
  z-index: 1001;
  transition: left 0.3s ease-in-out;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  background-color: #0B79BF;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
  
  svg {
    margin-right: 10px;
    color: #0B79BF;
    font-size: 1rem;
  }
`;

const MenuSection = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const MenuSectionTitle = styled.div`
  padding: 8px 15px;
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AuthSection = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &.login {
    background-color: #0B79BF;
    color: white;
  }
  
  &.register {
    background-color: white;
    color: #0B79BF;
    border: 1px solid #0B79BF;
  }
`;

const MobileMenu = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState(null);
  const auth = useSelector((state) => state.auth || {});
  const isAuthenticated = auth?.isAuthenticated || false;

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
  };

  const handleAuthClose = () => {
    setAuthMode(null);
  };

  return (
    <>
      <MenuOverlay isOpen={isOpen} onClick={onClose} />
      <MenuContainer isOpen={isOpen}>
        <MenuHeader>
          <h2>Menu</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </MenuHeader>

        <MenuItem to="/">
          <FaHome /> Home
        </MenuItem>

        {!isAuthenticated && (
          <AuthSection>
            <AuthButton className="login" onClick={() => handleAuthClick('login')}>
              <FaUser /> Login
            </AuthButton>
            <AuthButton className="register" onClick={() => handleAuthClick('register')}>
              Register
            </AuthButton>
          </AuthSection>
        )}

        <MenuSection>
          <MenuSectionTitle>Shop By Category</MenuSectionTitle>
          <MenuItem to="/category/phones" onClick={onClose}>
            <FaMobile /> Phones
          </MenuItem>
          <MenuItem to="/category/speakers" onClick={onClose}>
            <FaVolumeUp /> Speakers
          </MenuItem>
          <MenuItem to="/category/solar" onClick={onClose}>
            <FaSun /> Solar Panels, Inverters & Batteries
          </MenuItem>
          <MenuItem to="/category/fashion" onClick={onClose}>
            <FaTshirt /> Fashion
          </MenuItem>
          <MenuItem to="/category/earpods" onClick={onClose}>
            <FaHeadphones /> Earpods & Accessories
          </MenuItem>
        </MenuSection>

        <MenuSection>
          <MenuSectionTitle>Quick Links</MenuSectionTitle>
          <MenuItem to="/cart" onClick={onClose}>
            <FaShoppingCart /> Cart
          </MenuItem>
          <MenuItem to="/wishlist" onClick={onClose}>
            <FaHeart /> Lists
          </MenuItem>
          <MenuItem to="/orders" onClick={onClose}>
            <FaHistory /> Orders
          </MenuItem>
          <MenuItem to="/account" onClick={onClose}>
            <FaUserCircle /> My Account
          </MenuItem>
          <MenuItem to="/sell" onClick={onClose}>
            <FaStore /> Sell on The Extraordinary
          </MenuItem>
          <MenuItem to="/help" onClick={onClose}>
            <FaQuestionCircle /> Help Centre
          </MenuItem>
        </MenuSection>

        <AuthForms 
          isOpen={!!authMode} 
          onClose={handleAuthClose}
          initialMode={authMode}
        />
      </MenuContainer>
    </>
  );
};

export default MobileMenu;

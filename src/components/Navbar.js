import React, { useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaMobile,
  FaBluetoothB,
  FaSun,
  FaTshirt,
  FaHeadphones,
} from 'react-icons/fa';
import { IconButton } from '@mui/material';
import MobileMenu from './MobileMenu';

const NavContainer = styled.nav`
  width: 100%;
  position: relative;
  z-index: 1000;
`;

const TopBar = styled.div`
  background-color: #fff;
  padding: 2px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  border-bottom: 1px solid #e0e0e0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  a {
    color: #4d4d4d;
    text-decoration: none;
    font-size: 0.85rem;
    flex-shrink: 0;
    
    &:hover {
      color: #0B79BF;
    }
  }

  @media (max-width: 768px) {
    padding: 2px 10px;
    gap: 15px;
    font-size: 0.8rem;
    display: none;
  }
`;

const MainNavWrapper = styled.div`
  background-color: #0B79BF;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const MainNav = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4px 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 8px 10px;
    gap: 10px;
    justify-content: space-between;
  }
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  
  input {
    width: 100%;
    padding: 10px 15px;
    border: none;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }
  
  button {
    background: #f0f0f0;
    border: none;
    padding: 10px 20px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    
    &:hover {
      background: #e0e0e0;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartCount = styled.span`
  background-color: #ff4444;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 0.75rem;
  position: absolute;
  top: -8px;
  right: -12px;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    position: relative;
    
    svg {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled(IconButton)`
  color: white;
  padding: 8px;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-right: 10px;
  }
`;

const CategoryNavBar = styled.div`
  background-color: white;
  width: 100%;
  padding: 4px 0;
  border-top: 1px solid #e0e0e0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 2px 0;
    display: none;
  }
`;

const CategoryNavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 30px;
  white-space: nowrap;
  
  a {
    color: #333;
    text-decoration: none;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    
    &:hover {
      color: #0B79BF;
    }

    &.active {
      color: #0B79BF;
      font-weight: 500;
    }

    svg {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    gap: 20px;
    
    a {
      font-size: 0.85rem;
      
      svg {
        font-size: 1rem;
      }
    }
  }
`;

const Navbar = () => {
  const { items = [] } = useSelector((state) => state.cart || {});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NavContainer>
      <TopBar>
        <Link to="/help">Help Centre</Link>
        <Link to="/sell">Sell on The Extraordinary</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/account">My Account</Link>
      </TopBar>

      <MainNavWrapper>
        <MainNav>
          <MobileMenuButton onClick={toggleMobileMenu}>
            <FaBars />
          </MobileMenuButton>

          <Logo to="/">The Extraordinary</Logo>
          
          <SearchContainer>
            <input type="text" placeholder="Search for products, brands..." />
            <button>
              <FaSearch />
            </button>
          </SearchContainer>
          
          <NavActions>
            <Link to="/wishlist">
              <FaHeart />
              Wishlist
            </Link>
            <Link to="/cart">
              <FaShoppingCart />
              Cart
              {items.length > 0 && <CartCount>{items.length}</CartCount>}
            </Link>
          </NavActions>
        </MainNav>

        <CategoryNavBar>
          <CategoryNavContent>
            <RouterNavLink to="/category/phones">
              <FaMobile /> Phones
            </RouterNavLink>
            <RouterNavLink to="/category/speakers">
              <FaBluetoothB /> Speakers
            </RouterNavLink>
            <RouterNavLink to="/category/solar">
              <FaSun /> Solar Panels, Inverters & Batteries
            </RouterNavLink>
            <RouterNavLink to="/category/fashion">
              <FaTshirt /> Fashion
            </RouterNavLink>
            <RouterNavLink to="/category/earpods">
              <FaHeadphones /> Earpods & Accessories
            </RouterNavLink>
          </CategoryNavContent>
        </CategoryNavBar>
      </MainNavWrapper>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </NavContainer>
  );
};

export default Navbar;
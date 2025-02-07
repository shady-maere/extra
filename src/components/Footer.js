import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaApple, FaGooglePlay } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #2d2d2d;
  color: #fff;
  padding: 40px 0 0;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: #fff;
    font-size: 1rem;
    margin-bottom: 20px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 12px;
  }
`;

const FooterLink = styled(Link)`
  color: #b3b3b3;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const SocialSection = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: #b3b3b3;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const AppSection = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const AppButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #2d2d2d;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.8rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const BottomBar = styled.div`
  background-color: #1a1a1a;
  padding: 20px 0;
  margin-top: 40px;
`;

const BottomContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #b3b3b3;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  img {
    height: 35px;
    object-fit: contain;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Shop</h3>
            <ul>
              <li><FooterLink to="/daily-deals">Daily Deals</FooterLink></li>
              <li><FooterLink to="/new-arrivals">New Arrivals</FooterLink></li>
              <li><FooterLink to="/trending">Trending</FooterLink></li>
              <li><FooterLink to="/gift-vouchers">Gift Vouchers</FooterLink></li>
              <li><FooterLink to="/clearance">Clearance Sale</FooterLink></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Help</h3>
            <ul>
              <li><FooterLink to="/help-center">Help Center</FooterLink></li>
              <li><FooterLink to="/track-order">Track Order</FooterLink></li>
              <li><FooterLink to="/returns">Returns</FooterLink></li>
              <li><FooterLink to="/contact">Contact Us</FooterLink></li>
              <li><FooterLink to="/faqs">FAQs</FooterLink></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Account</h3>
            <ul>
              <li><FooterLink to="/login">Login</FooterLink></li>
              <li><FooterLink to="/register">Register</FooterLink></li>
              <li><FooterLink to="/orders">Orders</FooterLink></li>
              <li><FooterLink to="/wishlist">Wishlist</FooterLink></li>
              <li><FooterLink to="/profile">Profile</FooterLink></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Company</h3>
            <ul>
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/careers">Careers</FooterLink></li>
              <li><FooterLink to="/press">Press Releases</FooterLink></li>
              <li><FooterLink to="/terms">Terms & Conditions</FooterLink></li>
              <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
            </ul>
            <SocialSection>
              <SocialIcon href="#"><FaFacebookF /></SocialIcon>
              <SocialIcon href="#"><FaTwitter /></SocialIcon>
              <SocialIcon href="#"><FaInstagram /></SocialIcon>
              <SocialIcon href="#"><FaYoutube /></SocialIcon>
            </SocialSection>
          </FooterSection>

          <FooterSection>
            <h3>Download Our App</h3>
            <p style={{ color: '#b3b3b3', marginBottom: '15px', fontSize: '0.9rem' }}>
              Shop on the go with our mobile app
            </p>
            <AppSection>
              <AppButton href="#">
                <FaApple /> App Store
              </AppButton>
              <AppButton href="#">
                <FaGooglePlay /> Play Store
              </AppButton>
            </AppSection>
          </FooterSection>
        </FooterGrid>
      </FooterContent>

      <BottomBar>
        <BottomContent>
          <div>&copy; 2025 The Extraordinary. All rights reserved.</div>
          <PaymentMethods>
            <img src="/images/payments/visa.png" alt="Visa" />
            <img src="/images/payments/matser acard.png" alt="Mastercard" />
            <img src="/images/payments/paypal.png" alt="PayPal" />
          </PaymentMethods>
        </BottomContent>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;

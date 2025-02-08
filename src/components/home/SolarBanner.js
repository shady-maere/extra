import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

const BannerImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url('/images/Banners/banner 23.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    height: 250px;
    background-position: center;
  }
`;

const SolarBanner = () => {
  return (
    <BannerContainer>
      <BannerImage />
    </BannerContainer>
  );
};

export default SolarBanner; 
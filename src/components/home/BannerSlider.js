import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SliderContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 600px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 300px;
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
    margin-left: 0;
    margin-right: 0;
  }
`;

const Slide = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 1s ease-in-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 max(10%, calc((100vw - 1400px) / 2));
  left: 0;
  right: 0;

  @media (max-width: 768px) {
    padding: 0 5%;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    left: 0;
  }
`;

const SlideContent = styled.div`
  color: white;
  max-width: 600px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 10px;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 12px 30px;
  background-color: #0B79BF;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0960a0;
  }
`;

const SliderDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? '#0B79BF' : 'rgba(255,255,255,0.5)'};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const slides = [
  {
    image: '/images/Banners/bannner 3.jpg',
    title: 'Discover Amazing Deals',
    description: 'Shop the latest trends and get exclusive offers on our featured products.',
    buttonText: 'Shop Now',
    buttonLink: '/category/featured'
  },
  // Add more slides here if needed
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds delay

    return () => clearInterval(timer);
  }, []);

  return (
    <SliderContainer>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          active={index === currentSlide}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <SlideContent>
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <Button to={slide.buttonLink}>{slide.buttonText}</Button>
          </SlideContent>
        </Slide>
      ))}
      
      <SliderDots>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </SliderDots>
    </SliderContainer>
  );
};

export default BannerSlider; 
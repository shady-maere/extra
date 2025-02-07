import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 1s ease-in-out;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 10%;
`;

const SlideContent = styled.div`
  color: white;
  max-width: 600px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      font-size: 1rem;
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
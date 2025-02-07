import React, { useState } from 'react';
import styled from 'styled-components';
import ProductImage from './ProductImage';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
`;

const MainImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ThumbnailWrapper = styled.div`
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  cursor: pointer;
  opacity: ${props => props.isActive ? 1 : 0.6};
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isActive ? '#0b79bf' : 'transparent'};
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    opacity: 1;
  }
`;

const ProductImageGallery = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [errorImages, setErrorImages] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(images.length - 1, prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <GalleryContainer>
      <MainImageContainer>
          {errorImages.has(activeIndex) ? (
            <div className="image-fallback">Image unavailable</div>
          ) : (
            <ProductImage
              src={images[activeIndex].url}
              alt={images[activeIndex].alt}
              width={800}
              height={600}
              loading="eager"
              onLoad={() => setLoadedImages(prev => new Set([...prev, activeIndex]))}
              onError={() => setErrorImages(prev => new Set([...prev, activeIndex]))}
              style={{ display: loadedImages.has(activeIndex) ? 'block' : 'none' }}
            />
          )}
          {!loadedImages.has(activeIndex) && !errorImages.has(activeIndex) && (
            <div className="image-placeholder" style={{ width: '100%', paddingBottom: '75%', backgroundColor: '#f0f0f0' }} />
          )}
        {images.length > 1 && (
          <>
            <NavigationButton
              className="prev"
              onClick={handlePrevious}
              disabled={activeIndex === 0}
            >
              <FaChevronLeft />
            </NavigationButton>
            <NavigationButton
              className="next"
              onClick={handleNext}
              disabled={activeIndex === images.length - 1}
            >
              <FaChevronRight />
            </NavigationButton>
          </>
        )}
      </MainImageContainer>

      {images.length > 1 && (
        <ThumbnailsContainer>
          {images.map((image, index) => (
            <ThumbnailWrapper
              key={index}
              isActive={index === activeIndex}
              onClick={() => handleThumbnailClick(index)}
            >
              {errorImages.has(index) ? (
                <div className="thumbnail-fallback" style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}>⚠️</div>
              ) : (
                <ProductImage
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  width={160}
                  height={160}
                  loading="lazy"
                  onLoad={() => setLoadedImages(prev => new Set([...prev, index]))}
                  onError={() => setErrorImages(prev => new Set([...prev, index]))}
                  style={{ display: loadedImages.has(index) ? 'block' : 'none' }}
                />
              )}
              {!loadedImages.has(index) && !errorImages.has(index) && (
                <div className="thumbnail-placeholder" style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f0f0f0'
                }} />
              )}
            </ThumbnailWrapper>
          ))}
        </ThumbnailsContainer>
      )}
    </GalleryContainer>
  );
};

export default ProductImageGallery;

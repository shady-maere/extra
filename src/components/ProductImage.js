import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaImage } from 'react-icons/fa';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 1:1 Aspect Ratio */
  background: ${props => props.isLoading ? '#f5f5f5' : 'transparent'};
  border-radius: 8px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isLoading ? 0 : 1};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #999;
  font-size: 2rem;
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 0, 0, 0.1);
  color: #ff0000;
  padding: 4px;
  text-align: center;
  font-size: 0.8rem;
`;

const DebugInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px;
  font-size: 0.7rem;
  word-break: break-all;
`;

const getRandomFallbackImage = (seed) => {
  const services = [
    `https://picsum.photos/400/400?random=${seed}`,
    `https://source.unsplash.com/400x400?product&sig=${seed}`,
    `https://placehold.co/400x400/f5f5f5/999999?text=Product+${seed}`
  ];
  return services[Math.floor(Math.random() * services.length)];
};

const ProductImage = ({ 
  src, 
  alt, 
  seed = 1,
  onLoad,
  onError,
  className,
  debug = false,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    console.log(`Loading image: ${src}`);
    setIsLoading(true);
    setError(null);
    setCurrentSrc(src);
    setRetryCount(0);
  }, [src]);

  const handleLoad = () => {
    console.log(`Image loaded successfully: ${currentSrc}`);
    setIsLoading(false);
    setError(null);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.error(`Image load error: ${currentSrc}`);
    if (retryCount < maxRetries) {
      console.log(`Retrying with fallback image (attempt ${retryCount + 1})`);
      setRetryCount(prev => prev + 1);
      const fallback = getRandomFallbackImage(seed);
      console.log(`Using fallback: ${fallback}`);
      setCurrentSrc(fallback);
    } else {
      console.error('Max retries reached, showing error state');
      setError('Failed to load image');
      setIsLoading(false);
      if (onError) onError();
    }
  };

  return (
    <ImageContainer isLoading={isLoading} className={className} {...props}>
      {isLoading && (
        <Placeholder>
          <FaImage />
        </Placeholder>
      )}
      <StyledImage
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        isLoading={isLoading}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {debug && (
        <DebugInfo>
          src: {currentSrc}<br />
          retries: {retryCount}/{maxRetries}<br />
          status: {isLoading ? 'loading' : error ? 'error' : 'loaded'}
        </DebugInfo>
      )}
    </ImageContainer>
  );
};

export default ProductImage;

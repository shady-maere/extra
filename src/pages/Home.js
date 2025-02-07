import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const HomePage = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 0;
  margin: 0;
  width: 100%;
  overflow-x: hidden;
`;

const BannerSection = styled.section`
  margin: 0;
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-bottom: 2rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 0.5rem;
  }

  section {
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      margin-bottom: 1rem;
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
  
  h2 {
    font-size: 1.5rem;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0 0.5rem;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    border-radius: 4px;
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #f5f5f5;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.5rem;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e41e31;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ProductContent = styled.div`
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  min-height: 40px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-height: 32px;
    margin-bottom: 0.3rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
  
  .stars {
    color: #ffc107;
    display: flex;
    gap: 2px;
  }
  
  .rating-count {
    color: #666;
    font-size: 0.8rem;
  }
`;

const PriceContainer = styled.div`
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    margin: 0.3rem 0;
  }
`;

const CurrentPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const OriginalPrice = styled.span`
  color: #999;
  text-decoration: line-through;
  margin-left: 0.5rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ViewMore = styled(Link)`
  color: #0B79BF;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BannerCarousel = styled.div`
  position: relative;
  width: 100%;
  padding-top: 40%;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding-top: 50%;
  }

  @media (max-width: 768px) {
    padding-top: 60%;
  }

  @media (max-width: 480px) {
    padding-top: 75%;
  }
`;

const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.active ? 1 : 0};
  transform: translateX(${props => props.active ? '0' : '100%'});
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  align-items: center;
  padding-left: max(10%, calc((100vw - 1200px) / 2 + 2rem));
  padding-right: 10%;

  @media (max-width: 768px) {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    align-items: flex-end;
    padding: 2rem 1.5rem;
  }
`;

const BannerContent = styled.div`
  color: white;
  max-width: 600px;
  z-index: 1;

  h2 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    max-width: 500px;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }

  button {
    padding: 1rem 2.5rem;
    background: #0B79BF;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;

    &:hover {
      background: #096397;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      padding: 0.8rem 2rem;
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      padding: 0.6rem 1.5rem;
      font-size: 0.9rem;
    }
  }
`;

const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    font-size: 20px;
    color: #333;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
    
    svg {
      font-size: 16px;
    }
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;

  @media (max-width: 768px) {
    bottom: 0.5rem;
    gap: 0.3rem;
  }
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255,255,255,0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const BrandsSection = styled.section`
  margin: 2rem 0;
  padding: 2rem 0;
  background: white;
  border-radius: 8px;
`;

const BrandsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
`;

const BrandsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 0.5rem 0;
  }
`;

const BrandLogo = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: -20px;' : 'right: -20px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const PromotionalBanner = styled.section`
  margin: 1.5rem 0;
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 1024px) {
    height: 250px;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
    margin: 0.8rem 0;
  }
`;

const PromotionalBannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
`;

const PromotionalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  width: 90%;
  max-width: 500px;
  color: white;
  padding: 0 1rem;
`;

const PromotionalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
`;

const PromotionalText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;

const PromotionalButton = styled.button`
  padding: 0.8rem 2rem;
  background: #0B79BF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #096397;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1.2rem;
    font-size: 0.8rem;
  }
`;

const Home = () => {
  const products = useSelector(state => state.products.products) || [];
  const [currentBanner, setCurrentBanner] = useState(0);

  // Get products by category
  const solarProducts = products.filter(product => product.category === 'Solar');
  const phoneProducts = products.filter(product => product.category === 'Phones');
  const speakerProducts = products.filter(product => product.category === 'Speakers');
  const fashionProducts = products.filter(product => product.category === 'Fashion');
  const earpodsProducts = products.filter(product => product.category === 'Earpods');

  const banners = [
    {
      image: "/images/Banners/bannner 3.jpg",
      alt: "Special Offer",
      title: "Exclusive Summer Deals",
      description: "Get amazing discounts on our latest collection",
      buttonText: "Shop Now"
    },
    {
      image: "/images/Banners/banners (1).jpg",
      alt: "Banner 1",
      title: "Summer Collection 2024",
      description: "Discover the latest trends and exclusive deals",
      buttonText: "Shop Now"
    },
    {
      image: "/images/Banners/banners (2).jpg",
      alt: "Banner 2",
      title: "New Arrivals",
      description: "Get up to 50% off on selected items",
      buttonText: "View Deals"
    }
  ];

  const brands = [
    { name: "Samsung", logo: "/images/brands/78eb8ca39fed0926a7a2f09736f15d7e.png" },
    { name: "Apple", logo: "/images/brands/150.png" },
    { name: "Huawei", logo: "/images/brands/cd12004768cb271c4ecfea28e305bb3a.png" },
    { name: "Sony", logo: "/images/brands/eccc7d6a1a9f10b700dc8c55e2815594.png" },
    { name: "Hisense", logo: "/images/brands/hisense.png" },
    { name: "MTN", logo: "/images/brands/mt4578mbb9-mtn-logo-mtn-vector-logo-mtn-logo-vector-free-download.png" },
    { name: "LG", logo: "/images/brands/pngaaa.com-2017482.png" },
    { name: "Dell", logo: "/images/brands/pngegg (2).png" },
    { name: "HP", logo: "/images/brands/pngegg (4).png" }
  ];

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice) return null;
    const current = parseFloat(price.replace('R ', '').replace(',', ''));
    const original = parseFloat(originalPrice.replace('R ', '').replace(',', ''));
    return Math.round(((original - current) / original) * 100);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  return (
    <HomePage>
      <MainContent>
        <BannerSection>
          <BannerCarousel>
            {banners.map((banner, index) => (
              <Banner key={index} active={currentBanner === index}>
                <img src={banner.image} alt={banner.alt} />
                <BannerOverlay>
                  <BannerContent>
                    <h2>{banner.title}</h2>
                    <p>{banner.description}</p>
                    <button>{banner.buttonText}</button>
                  </BannerContent>
                </BannerOverlay>
              </Banner>
            ))}
            <CarouselArrow direction="left" onClick={handlePrevBanner}>
              <FaChevronLeft />
            </CarouselArrow>
            <CarouselArrow direction="right" onClick={handleNextBanner}>
              <FaChevronRight />
            </CarouselArrow>
          </BannerCarousel>
          <CarouselDots>
            {banners.map((_, index) => (
              <Dot 
                key={index} 
                active={currentBanner === index}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </CarouselDots>
        </BannerSection>

        <BrandsSection>
          <BrandsContainer>
            <CarouselButton direction="left">
              <FaChevronLeft />
            </CarouselButton>
            <BrandsRow>
              {brands.map((brand, index) => (
                <BrandLogo 
                  key={index}
                  src={brand.logo}
                  alt={brand.name}
                />
              ))}
            </BrandsRow>
            <CarouselButton direction="right">
              <FaChevronRight />
            </CarouselButton>
          </BrandsContainer>
        </BrandsSection>

        <Section>
          <SectionHeader>
            <h2>Solar Panels, Inverters & Batteries</h2>
            <ViewMore to="/category/solar">View All Solar Products</ViewMore>
          </SectionHeader>
          <ProductsGrid>
            {solarProducts.map(product => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              return (
                <ProductCard key={product.id}>
                  <ProductImage>
                    <img src={product.image} alt={product.name} />
                    {discount && (
                      <DiscountBadge>{discount}% OFF</DiscountBadge>
                    )}
                  </ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.name}</ProductTitle>
                    <RatingContainer>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} />
                        ))}
                      </div>
                      <span className="rating-count">(5)</span>
                    </RatingContainer>
                    <PriceContainer>
                      <CurrentPrice>{product.price}</CurrentPrice>
                      {product.originalPrice && (
                        <OriginalPrice>{product.originalPrice}</OriginalPrice>
                      )}
                    </PriceContainer>
                  </ProductContent>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <h2>Phones</h2>
            <ViewMore to="/category/phones">View All Phones</ViewMore>
          </SectionHeader>
          <ProductsGrid>
            {phoneProducts.map(product => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              return (
                <ProductCard key={product.id}>
                  <ProductImage>
                    <img src={product.image} alt={product.name} />
                    {discount && (
                      <DiscountBadge>{discount}% OFF</DiscountBadge>
                    )}
                  </ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.name}</ProductTitle>
                    <RatingContainer>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} />
                        ))}
                      </div>
                      <span className="rating-count">(5)</span>
                    </RatingContainer>
                    <PriceContainer>
                      <CurrentPrice>{product.price}</CurrentPrice>
                      {product.originalPrice && (
                        <OriginalPrice>{product.originalPrice}</OriginalPrice>
                      )}
                    </PriceContainer>
                  </ProductContent>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <h2>Speakers</h2>
            <ViewMore to="/category/speakers">View All Speakers</ViewMore>
          </SectionHeader>
          <ProductsGrid>
            {speakerProducts.map(product => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              return (
                <ProductCard key={product.id}>
                  <ProductImage>
                    <img src={product.image} alt={product.name} />
                    {discount && (
                      <DiscountBadge>{discount}% OFF</DiscountBadge>
                    )}
                  </ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.name}</ProductTitle>
                    <RatingContainer>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} />
                        ))}
                      </div>
                      <span className="rating-count">(5)</span>
                    </RatingContainer>
                    <PriceContainer>
                      <CurrentPrice>{product.price}</CurrentPrice>
                      {product.originalPrice && (
                        <OriginalPrice>{product.originalPrice}</OriginalPrice>
                      )}
                    </PriceContainer>
                  </ProductContent>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        </Section>

        <Section>
          <SectionHeader>
            <h2>Earpods & Accessories</h2>
            <ViewMore to="/category/earpods">View All Earpods</ViewMore>
          </SectionHeader>
          <ProductsGrid>
            {earpodsProducts.map(product => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              return (
                <ProductCard key={product.id}>
                  <ProductImage>
                    <img src={product.image} alt={product.name} />
                    {discount && (
                      <DiscountBadge>{discount}% OFF</DiscountBadge>
                    )}
                  </ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.name}</ProductTitle>
                    <RatingContainer>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} />
                        ))}
                      </div>
                      <span className="rating-count">(5)</span>
                    </RatingContainer>
                    <PriceContainer>
                      <CurrentPrice>{product.price}</CurrentPrice>
                      {product.originalPrice && (
                        <OriginalPrice>{product.originalPrice}</OriginalPrice>
                      )}
                    </PriceContainer>
                  </ProductContent>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        </Section>

        <PromotionalBanner>
          <PromotionalBannerImage src="/images/Banners/bbaner.jpg" alt="Special Promotion" />
          <PromotionalContent>
            <PromotionalTitle>Special Summer Sale</PromotionalTitle>
            <PromotionalText>Get up to 50% off on selected items across all categories</PromotionalText>
            <PromotionalButton>Shop Now</PromotionalButton>
          </PromotionalContent>
        </PromotionalBanner>

        <Section>
          <SectionHeader>
            <h2>Fashion</h2>
            <ViewMore to="/category/fashion">View All Fashion</ViewMore>
          </SectionHeader>
          <ProductsGrid>
            {fashionProducts.map(product => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              return (
                <ProductCard key={product.id}>
                  <ProductImage>
                    <img src={product.image} alt={product.name} />
                    {discount && (
                      <DiscountBadge>{discount}% OFF</DiscountBadge>
                    )}
                  </ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.name}</ProductTitle>
                    <RatingContainer>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} />
                        ))}
                      </div>
                      <span className="rating-count">(5)</span>
                    </RatingContainer>
                    <PriceContainer>
                      <CurrentPrice>{product.price}</CurrentPrice>
                      {product.originalPrice && (
                        <OriginalPrice>{product.originalPrice}</OriginalPrice>
                      )}
                    </PriceContainer>
                  </ProductContent>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        </Section>
      </MainContent>
    </HomePage>
  );
};

export default Home;

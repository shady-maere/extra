import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

const CategoriesContainer = styled.div`
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 80vh;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryListItem = styled.li`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: var(--text-color);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CategoryName = styled.span`
  font-size: 18px;
`;

const ChevronIcon = styled(FaChevronRight)`
  color: var(--primary-color);
  font-size: 16px;
`;

const CategoriesPage = styled.div`
  padding-top: 60px; /* Adjust based on Navbar height */
`;

const Categories = () => {
  const products = useSelector(state => state.products.items);
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <CategoriesPage>
      <CategoriesContainer>
        <CategoryList>
          {categories.map(category => (
            <CategoryListItem key={category}>
              <CategoryLink to={`/categories/${category.toLowerCase()}`}>
                <CategoryName>{category}</CategoryName>
                <ChevronIcon />
              </CategoryLink>
            </CategoryListItem>
          ))}
        </CategoryList>
      </CategoriesContainer>
    </CategoriesPage>
  );
};

export default Categories;

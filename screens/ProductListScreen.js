import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import Header from '../components/common/Header';
import ProductCard from '../components/common/ProductCard';
import Chip from '../components/common/Chip';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const FilterBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 20px;
`;

const FilterText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
`;

const SortContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SortText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
  margin-right: 8px;
`;

const ProductsContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const ProductsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const products = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: { uri: 'https://via.placeholder.com/160x120/A0E7A0/FFFFFF?text=T-Shirt' }
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    price: 59.99,
    image: { uri: 'https://via.placeholder.com/160x120/ADD8F7/FFFFFF?text=Jeans' }
  },
  {
    id: '3',
    name: 'Summer Dress',
    price: 79.99,
    image: { uri: 'https://via.placeholder.com/160x120/A0E7A0/FFFFFF?text=Dress' }
  },
  {
    id: '4',
    name: 'Casual Sneakers',
    price: 89.99,
    image: { uri: 'https://via.placeholder.com/160x120/ADD8F7/FFFFFF?text=Shoes' }
  },
  {
    id: '5',
    name: 'Black Hoodie',
    price: 49.99,
    image: { uri: 'https://via.placeholder.com/160x120/A0E7A0/FFFFFF?text=Hoodie' }
  },
  {
    id: '6',
    name: 'Leather Jacket',
    price: 129.99,
    image: { uri: 'https://via.placeholder.com/160x120/ADD8F7/FFFFFF?text=Jacket' }
  }
];

const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Popularity', 'Newest'];

export default function ProductListScreen({ navigation, route }) {
  const [selectedSort, setSelectedSort] = useState(0);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleFilter = () => {
    // TODO: Open filter modal
    console.log('Filter pressed');
  };

  const handleSort = (index) => {
    setSelectedSort(index);
    setShowSortOptions(false);
  };

  const handleAddToCart = (productId) => {
    console.log('Add to cart:', productId);
  };

  const renderProduct = ({ item }) => (
    <ProductCard
      image={item.image}
      name={item.name}
      price={item.price}
      onAddToCart={() => handleAddToCart(item.id)}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    />
  );

  return (
    <Container>
      <Header
        cartCount={3}
        onSearch={() => console.log('Search')}
        onCart={() => console.log('Cart')}
      />
      
      <Content>
        <FilterBar>
          <FilterButton onPress={handleFilter}>
            <Feather name="filter" size={16} color="#fff" />
            <FilterText>Filter</FilterText>
          </FilterButton>
          
          <SortContainer>
            <SortText>Sort by:</SortText>
            <TouchableOpacity onPress={() => setShowSortOptions(!showSortOptions)}>
              <Chip selected={false}>
                {sortOptions[selectedSort]}
                <Feather name="chevron-down" size={14} color="#A0E7A0" style={{ marginLeft: 4 }} />
              </Chip>
            </TouchableOpacity>
          </SortContainer>
        </FilterBar>
        
        {showSortOptions && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
            {sortOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSort(index)}
                style={{ paddingVertical: 8 }}
              >
                <Chip selected={index === selectedSort}>
                  {option}
                </Chip>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        <ProductsContainer>
          <ProductsGrid>
            {products.map(renderProduct)}
          </ProductsGrid>
        </ProductsContainer>
      </Content>
    </Container>
  );
} 
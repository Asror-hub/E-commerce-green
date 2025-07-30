import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import Header from '../components/common/Header';
import SectionTitle from '../components/common/SectionTitle';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const CategoryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CategoryCard = styled.TouchableOpacity`
  width: 48%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline};
  shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

const CategoryImageContainer = styled.View`
  width: 100%;
  height: 120px;
  position: relative;
`;

const CategoryImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const CategoryOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;

const CategoryInfo = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const CategoryName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 4px;
`;

const CategoryCount = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
  font-weight: 500;
`;

const categories = [
  {
    id: '1',
    name: 'T-Shirts',
    count: 45,
    image: { uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' }
  },
  {
    id: '2',
    name: 'Jeans',
    count: 32,
    image: { uri: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop' }
  },
  {
    id: '3',
    name: 'Dresses',
    count: 28,
    image: { uri: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop' }
  },
  {
    id: '4',
    name: 'Shoes',
    count: 56,
    image: { uri: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' }
  },
  {
    id: '5',
    name: 'Accessories',
    count: 23,
    image: { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop' }
  },
  {
    id: '6',
    name: 'Jackets',
    count: 18,
    image: { uri: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop' }
  },
  {
    id: '7',
    name: 'Sweaters',
    count: 34,
    image: { uri: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop' }
  },
  {
    id: '8',
    name: 'Shorts',
    count: 27,
    image: { uri: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop' }
  },
  {
    id: '9',
    name: 'Bags',
    count: 41,
    image: { uri: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop' }
  },
  {
    id: '10',
    name: 'Watches',
    count: 19,
    image: { uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
  },
  {
    id: '11',
    name: 'Hats',
    count: 15,
    image: { uri: 'https://images.unsplash.com/photo-1556306535-0d09d0bf0b8f?w=400&h=300&fit=crop' }
  },
  {
    id: '12',
    name: 'Socks',
    count: 22,
    image: { uri: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c8a?w=400&h=300&fit=crop' }
  }
];

export default function CategoryScreen({ navigation }) {
  const handleCategoryPress = (category) => {
    navigation.navigate('ProductList', { category: category });
  };

  const handleSearch = () => {
    console.log('Search pressed');
  };

  const handleCart = () => {
    console.log('Cart pressed');
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        onSearch={handleSearch}
      />
      
      <Content showsVerticalScrollIndicator={false}>
        <SectionTitle 
          title="All Categories" 
          subtitle="Browse products by category"
        />
        
        <CategoryGrid>
          {categories.map((category) => {
            try {
              if (!category) return null;
              return (
                <CategoryCard
                  key={category.id}
                  onPress={() => handleCategoryPress(category)}
                  activeOpacity={0.9}
                >
                  <CategoryImageContainer>
                    <CategoryImage 
                      source={category.image}
                      defaultSource={require('../assets/images/mine.png')}
                      onError={() => console.log(`Failed to load image for ${category.name}`)}
                      onLoad={() => console.log(`Successfully loaded image for ${category.name}`)}
                    />
                    <CategoryOverlay />
                  </CategoryImageContainer>
                  <CategoryInfo>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryCount>{category.count} items</CategoryCount>
                  </CategoryInfo>
                </CategoryCard>
              );
            } catch (error) {
              console.log('Error rendering category:', error);
              return null;
            }
          })}
        </CategoryGrid>
      </Content>
    </Container>
  );
} 
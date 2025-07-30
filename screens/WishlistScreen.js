import React, { useState, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Animated, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import ProductCard from '../components/common/ProductCard';
import SectionTitle from '../components/common/SectionTitle';
import PrimaryButton from '../components/common/PrimaryButton';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding-bottom: 120px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  margin-top: 60px;
`;

const EmptyIcon = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #FDF2F8;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  border: 2px dashed #E94F8A;
`;

const EmptyTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  text-align: center;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  line-height: 24px;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
`;

const ProductsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const ProductCardWrapper = styled.View`
  width: 48%;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ClearAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
`;

const ClearAllText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
  margin-left: 6px;
`;

const ToastContainer = styled(Animated.View)`
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.text};
  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  z-index: 2000;
  shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 8;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ToastIcon = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.success};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  shadow-color: ${({ theme }) => theme.colors.success};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const ToastText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 18px;
`;

export default function WishlistScreen({ navigation }) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastAnimation = useRef(new Animated.Value(0)).current;

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    
    // Animate in
    Animated.spring(toastAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      Animated.spring(toastAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start(() => {
        setShowToast(false);
      });
    }, 3000);
  };

  const handleRemoveFromWishlist = (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      removeFromWishlist(productId);
      showToastMessage(`${product.name} removed from wishlist!`);
    }
  };

  const handleAddToCart = (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      addToCart({
        ...product,
        color: 'Default',
        size: 'M',
        quantity: 1
      });
      showToastMessage(`${product.name} added to cart!`);
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear Wishlist',
      'Are you sure you want to remove all items from your wishlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearWishlist();
            showToastMessage('Wishlist cleared!');
          },
        },
      ]
    );
  };

  const handleSearch = () => {
    console.log('Search pressed');
  };

  const handleCart = () => {
    console.log('Cart pressed');
  };

  if (wishlistItems.length === 0) {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Header
          onSearch={handleSearch}
        />
        <EmptyContainer>
          <EmptyIcon>
            <Feather name="heart" size={48} color="#E94F8A" />
          </EmptyIcon>
          <EmptyTitle>Your Wishlist is Empty</EmptyTitle>
          <EmptyText>
            Start adding items to your wishlist to save them for later. You can add items from any product page.
          </EmptyText>
          <PrimaryButton onPress={() => navigation.navigate('Home')}>
            Start Shopping
          </PrimaryButton>
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        onSearch={handleSearch}
      />
      
      {/* Toast Notification */}
      {showToast && (
        <ToastContainer
          style={{
            transform: [
              {
                translateY: toastAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
              {
                scale: toastAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.8, 1.1, 1],
                }),
              },
            ],
            opacity: toastAnimation,
          }}
        >
          <ToastIcon>
            <Feather name="check" size={14} color="#FFFFFF" />
          </ToastIcon>
          <ToastText>{toastMessage}</ToastText>
        </ToastContainer>
      )}
      
      <Content showsVerticalScrollIndicator={false}>
        <SectionTitle 
          title={`My Wishlist (${wishlistItems.length})`}
          subtitle="Items you've saved for later"
        />
        
        <HeaderActions>
          <View />
          <ClearAllButton onPress={handleClearAll} activeOpacity={0.8}>
            <Feather name="trash-2" size={16} color="#EF4444" />
            <ClearAllText>Clear All</ClearAllText>
          </ClearAllButton>
        </HeaderActions>
        
        <ProductsGrid>
          {wishlistItems.map((item) => (
            <ProductCardWrapper key={item.id}>
              <ProductCard
                image={item.image}
                name={item.name}
                price={item.price}
                originalPrice={item.originalPrice}
                discount={item.discount}
                rating={item.rating}
                onWishlist={() => handleRemoveFromWishlist(item.id)}
                isWishlisted={true}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
                showAddToCart={true}
                onAddToCart={() => handleAddToCart(item.id)}
              />
            </ProductCardWrapper>
          ))}
        </ProductsGrid>
      </Content>
    </Container>
  );
} 
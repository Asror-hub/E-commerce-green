import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import Header from '../components/common/Header';
import PrimaryButton from '../components/common/PrimaryButton';
import TextInput from '../components/common/TextInput';
import { useCart } from '../contexts/CartContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const CartItem = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline};
`;

const ItemImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const ItemInfo = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ItemName = styled.Text`
  ${({ theme }) => theme.typography.titleMedium};
  color: ${({ theme }) => theme.colors.onSurface};
  font-weight: 600;
`;

const ItemPrice = styled.Text`
  ${({ theme }) => theme.typography.headlineSmall};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const QuantityText = styled.Text`
  ${({ theme }) => theme.typography.titleMedium};
  font-weight: 600;
  margin: 0 ${({ theme }) => theme.spacing.md}px;
  min-width: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm}px;
  right: ${({ theme }) => theme.spacing.sm}px;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: ${({ theme }) => theme.colors.error + '20'};
  align-items: center;
  justify-content: center;
`;

const CouponContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
  margin: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline};
`;

const CouponTitle = styled.Text`
  ${({ theme }) => theme.typography.titleMedium};
  color: ${({ theme }) => theme.colors.onSurface};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  font-weight: 600;
`;

const CouponInput = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ApplyButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const ApplyText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

const SummaryContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.surface};
  margin: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline};
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SummaryText = styled.Text`
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.onSurface};
`;

const SummaryTotal = styled.Text`
  ${({ theme }) => theme.typography.headlineMedium};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

const Divider = styled.View`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline};
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
`;

const EmptyCartContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

const EmptyCartIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const EmptyCartTitle = styled.Text`
  ${({ theme }) => theme.typography.headlineMedium};
  color: ${({ theme }) => theme.colors.onSurface};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  font-weight: 600;
`;

const EmptyCartText = styled.Text`
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  text-align: center;
  line-height: 24px;
`;

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const removeItem = (cartId) => {
    removeFromCart(cartId);
  };

  const applyCoupon = () => {
    console.log('Apply coupon:', couponCode);
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
  };

  const subtotal = getCartTotal();
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        onSearch={() => console.log('Search')}
      />
      
      <Content showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <EmptyCartContainer>
            <EmptyCartIcon>
              <Feather name="shopping-cart" size={32} color="#CBD5E1" />
            </EmptyCartIcon>
            <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
            <EmptyCartText>
              Looks like you haven't added any items to your cart yet. Start shopping to see items here.
            </EmptyCartText>
            <PrimaryButton 
              onPress={() => navigation.navigate('Home')} 
              style={{ marginTop: 24 }}
              size="large"
            >
              Start Shopping
            </PrimaryButton>
          </EmptyCartContainer>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem key={item.cartId}>
                <ItemImage source={item.image} />
                <ItemInfo>
                  <View>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price}</ItemPrice>
                  </View>
                  
                  <QuantityContainer>
                    <QuantityButton onPress={() => updateQuantity(item.cartId, item.quantity - 1)} activeOpacity={0.8}>
                      <Feather name="minus" size={16} color="#fff" />
                    </QuantityButton>
                    <QuantityText>{item.quantity}</QuantityText>
                    <QuantityButton onPress={() => updateQuantity(item.cartId, item.quantity + 1)} activeOpacity={0.8}>
                      <Feather name="plus" size={16} color="#fff" />
                    </QuantityButton>
                  </QuantityContainer>
                </ItemInfo>
                
                <RemoveButton onPress={() => removeItem(item.cartId)} activeOpacity={0.8}>
                  <Feather name="x" size={16} color="#FF6B6B" />
                </RemoveButton>
              </CartItem>
            ))}
          </>
        )}
        
        {cartItems.length > 0 && (
          <>
            <CouponContainer>
              <CouponTitle>Apply Coupon</CouponTitle>
              <CouponInput>
                <TextInput
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  style={{ flex: 1, marginBottom: 0 }}
                />
                <ApplyButton onPress={applyCoupon} activeOpacity={0.8}>
                  <ApplyText>Apply</ApplyText>
                </ApplyButton>
              </CouponInput>
            </CouponContainer>
            
            <SummaryContainer>
              <SummaryRow>
                <SummaryText>Subtotal</SummaryText>
                <SummaryText>${subtotal.toFixed(2)}</SummaryText>
              </SummaryRow>
              <SummaryRow>
                <SummaryText>Shipping</SummaryText>
                <SummaryText>${shipping.toFixed(2)}</SummaryText>
              </SummaryRow>
              <Divider>
                <SummaryRow>
                  <SummaryTotal>Total</SummaryTotal>
                  <SummaryTotal>${total.toFixed(2)}</SummaryTotal>
                </SummaryRow>
              </Divider>
            </SummaryContainer>
            
            <PrimaryButton onPress={handleCheckout} style={{ margin: 16 }} size="large">
              Proceed to Checkout
            </PrimaryButton>
          </>
        )}
      </Content>
    </Container>
  );
} 
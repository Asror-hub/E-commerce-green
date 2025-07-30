import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../components/common/PrimaryButton';
import OutlinedButton from '../components/common/OutlinedButton';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const SuccessIcon = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.colors.success};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const OrderInfo = styled.View`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  elevation: 2;
`;

const OrderId = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderIdLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
`;

const ButtonContainer = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export default function OrderSuccessScreen({ navigation }) {
  const orderId = 'ORD-2024-001';

  const handleViewOrder = () => {
    console.log('View order');
    navigation.navigate('OrderTracking');
  };

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  return (
    <Container>
      <SuccessIcon>
        <Feather name="check" size={60} color="#fff" />
      </SuccessIcon>
      
      <Title>Thank You!</Title>
      <Subtitle>Your order has been placed successfully</Subtitle>
      
      <OrderInfo>
        <OrderId>{orderId}</OrderId>
        <OrderIdLabel>Order ID</OrderIdLabel>
      </OrderInfo>
      
      <ButtonContainer>
        <PrimaryButton onPress={handleViewOrder}>
          View Order
        </PrimaryButton>
        <OutlinedButton onPress={handleContinueShopping}>
          Continue Shopping
        </OutlinedButton>
      </ButtonContainer>
    </Container>
  );
} 
import React from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../components/common/PrimaryButton';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const OrderInfo = styled.View`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  elevation: 2;
`;

const OrderId = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const EstimatedDelivery = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const ProgressContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  elevation: 2;
`;

const ProgressTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const StepContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const StepIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ completed, theme }) => completed ? theme.colors.primary : theme.colors.mutedText};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const StepInfo = styled.View`
  flex: 1;
`;

const StepTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ completed, theme }) => completed ? theme.colors.text : theme.colors.mutedText};
  margin-bottom: 4px;
`;

const StepDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const StepDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const steps = [
  {
    id: '1',
    title: 'Order Placed',
    description: 'Your order has been confirmed',
    completed: true,
    date: 'Dec 15, 2024'
  },
  {
    id: '2',
    title: 'Order Packed',
    description: 'Your items are being prepared',
    completed: true,
    date: 'Dec 16, 2024'
  },
  {
    id: '3',
    title: 'Order Shipped',
    description: 'Your order is on the way',
    completed: true,
    date: 'Dec 17, 2024'
  },
  {
    id: '4',
    title: 'Order Delivered',
    description: 'Your order has been delivered',
    completed: false,
    date: 'Dec 19, 2024'
  }
];

export default function OrderTrackingScreen({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleContactSupport = () => {
    console.log('Contact support');
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}>
          <Feather name="arrow-left" size={20} color="#1F1F1F" />
        </BackButton>
        <HeaderTitle>Order Tracking</HeaderTitle>
      </Header>
      
      <Content>
        <OrderInfo>
          <OrderId>Order #ORD-2024-001</OrderId>
          <OrderDate>Placed on December 15, 2024</OrderDate>
          <EstimatedDelivery>Estimated Delivery: December 19, 2024</EstimatedDelivery>
        </OrderInfo>
        
        <ProgressContainer>
          <ProgressTitle>Order Status</ProgressTitle>
          {steps.map((step, index) => (
            <StepContainer key={step.id}>
              <StepIcon completed={step.completed}>
                <Feather 
                  name={step.completed ? "check" : "circle"} 
                  size={20} 
                  color="#fff" 
                />
              </StepIcon>
              <StepInfo>
                <StepTitle completed={step.completed}>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepInfo>
              <StepDate>{step.date}</StepDate>
            </StepContainer>
          ))}
        </ProgressContainer>
        
        <PrimaryButton onPress={handleContactSupport}>
          Contact Support
        </PrimaryButton>
      </Content>
    </Container>
  );
} 
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../components/common/PrimaryButton';
import TextInput from '../components/common/TextInput';
import Chip from '../components/common/Chip';

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

const Section = styled.View`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  elevation: 2;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const AddressItem = styled.TouchableOpacity`
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.mutedText};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const AddressText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const PaymentItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.mutedText};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PaymentIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const PaymentText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SummaryText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const SummaryTotal = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const addresses = [
  {
    id: '1',
    name: 'Home',
    address: '123 Main St, City, State 12345'
  },
  {
    id: '2',
    name: 'Office',
    address: '456 Business Ave, City, State 12345'
  }
];

const paymentMethods = [
  {
    id: '1',
    name: 'Credit Card',
    icon: 'credit-card'
  },
  {
    id: '2',
    name: 'PayPal',
    icon: 'credit-card'
  }
];

export default function CheckoutScreen({ navigation }) {
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('1');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirmOrder = () => {
    console.log('Confirm order');
    navigation.navigate('OrderSuccess');
  };

  const subtotal = 89.98;
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}>
          <Feather name="arrow-left" size={20} color="#1F1F1F" />
        </BackButton>
        <HeaderTitle>Checkout</HeaderTitle>
      </Header>
      
      <Content>
        <Section>
          <SectionTitle>Shipping Address</SectionTitle>
          {addresses.map((address) => (
            <AddressItem
              key={address.id}
              selected={selectedAddress === address.id}
              onPress={() => setSelectedAddress(address.id)}
            >
              <AddressText style={{ fontWeight: 'bold' }}>{address.name}</AddressText>
              <AddressText>{address.address}</AddressText>
            </AddressItem>
          ))}
        </Section>
        
        <Section>
          <SectionTitle>Payment Method</SectionTitle>
          {paymentMethods.map((payment) => (
            <PaymentItem
              key={payment.id}
              selected={selectedPayment === payment.id}
              onPress={() => setSelectedPayment(payment.id)}
            >
              <PaymentIcon>
                <Feather name={payment.icon} size={20} color="#fff" />
              </PaymentIcon>
              <PaymentText>{payment.name}</PaymentText>
              {selectedPayment === payment.id && (
                <Feather name="check" size={20} color="#A0E7A0" />
              )}
            </PaymentItem>
          ))}
        </Section>
        
        <Section>
          <SectionTitle>Order Summary</SectionTitle>
          <SummaryRow>
            <SummaryText>Subtotal</SummaryText>
            <SummaryText>${subtotal.toFixed(2)}</SummaryText>
          </SummaryRow>
          <SummaryRow>
            <SummaryText>Shipping</SummaryText>
            <SummaryText>${shipping.toFixed(2)}</SummaryText>
          </SummaryRow>
          <View style={{ borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 8, paddingTop: 8 }}>
            <SummaryRow>
              <SummaryTotal>Total</SummaryTotal>
              <SummaryTotal>${total.toFixed(2)}</SummaryTotal>
            </SummaryRow>
          </View>
        </Section>
        
        <PrimaryButton onPress={handleConfirmOrder} style={{ marginTop: 16 }}>
          Confirm Order
        </PrimaryButton>
      </Content>
    </Container>
  );
} 
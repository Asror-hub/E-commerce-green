import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import Header from '../components/common/Header';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const ProfileHeader = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.surface};
  margin: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline};
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const UserName = styled.Text`
  ${({ theme }) => theme.typography.headlineMedium};
  color: ${({ theme }) => theme.colors.onSurface};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  font-weight: 700;
`;

const UserEmail = styled.Text`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const MenuContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline};
`;

const MenuItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MenuIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const MenuText = styled.Text`
  ${({ theme }) => theme.typography.titleMedium};
  color: ${({ theme }) => theme.colors.onSurface};
  font-weight: 500;
`;

const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const LogoutText = styled.Text`
  ${({ theme }) => theme.typography.titleMedium};
  color: #fff;
  font-weight: 600;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const menuItems = [
  {
    id: '1',
    title: 'Edit Profile',
    icon: 'user',
    onPress: () => console.log('Edit Profile')
  },
  {
    id: '2',
    title: 'Order History',
    icon: 'package',
    onPress: () => console.log('Order History')
  },
  {
    id: '3',
    title: 'Saved Addresses',
    icon: 'map-pin',
    onPress: () => console.log('Saved Addresses')
  },
  {
    id: '4',
    title: 'Payment Methods',
    icon: 'credit-card',
    onPress: () => console.log('Payment Methods')
  },
  {
    id: '5',
    title: 'Notifications',
    icon: 'bell',
    onPress: () => console.log('Notifications')
  },
  {
    id: '6',
    title: 'Help Center',
    icon: 'help-circle',
    onPress: () => console.log('Help Center')
  }
];

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    console.log('Logout');
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
        cartCount={3}
        onSearch={handleSearch}
        onCart={handleCart}
      />
      
      <Content showsVerticalScrollIndicator={false}>
        <ProfileHeader>
          <Avatar source={{ uri: 'https://via.placeholder.com/80x80/4CB7A5/FFFFFF?text=User' }} />
          <UserName>John Doe</UserName>
          <UserEmail>john.doe@example.com</UserEmail>
        </ProfileHeader>
        
        <MenuContainer>
          {menuItems.map((item) => (
            <MenuItem key={item.id} onPress={item.onPress} activeOpacity={0.8}>
              <MenuItemLeft>
                <MenuIcon>
                  <Feather name={item.icon} size={20} color="#fff" />
                </MenuIcon>
                <MenuText>{item.title}</MenuText>
              </MenuItemLeft>
              <Feather name="chevron-right" size={20} color="#64748B" />
            </MenuItem>
          ))}
        </MenuContainer>
        
        <LogoutButton onPress={handleLogout} activeOpacity={0.8}>
          <Feather name="log-out" size={20} color="#fff" />
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </Content>
    </Container>
  );
} 
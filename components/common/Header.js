import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, TextInput } from 'react-native';

const HeaderContainer = styled(SafeAreaView)`
  width: 100%;
`;

const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.md}px;
  margin: 0px ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.md}px;
`;

const LogoRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const LogoIcon = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const LogoText = styled.Text`
  ${({ theme }) => theme.typography.headlineSmall};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const IconRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const IconButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  align-items: center;
  justify-content: center;
`;

const CartButton = styled(IconButton)`
  position: relative;
`;

const CartBadge = styled.View`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing.xs}px;
  min-width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.background};
  z-index: 10;
`;

const BadgeText = styled.Text`
  color: #fff;
  ${({ theme }) => theme.typography.labelSmall};
  font-weight: 700;
`;

const SearchContainer = styled(Animated.View)`
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin: 0px ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 8;
`;

const SearchInput = styled(TextInput)`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.onSurface};
  padding: ${({ theme }) => theme.spacing.md}px;
  flex: 1;
`;

const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing.sm}px;
`;

const SearchIconButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

const CloseIconButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

export default function Header({ onSearch }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const headerAnimation = useRef(new Animated.Value(1)).current;

  const showSearch = () => {
    setIsSearchVisible(true);
    Animated.parallel([
      Animated.timing(searchAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(headerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const hideSearch = () => {
    Animated.parallel([
      Animated.timing(searchAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsSearchVisible(false);
      setSearchText('');
    });
  };

  const handleSearch = () => {
    if (onSearch && searchText.trim()) {
      onSearch(searchText.trim());
    }
    hideSearch();
  };
  return (
    <HeaderContainer edges={['top']}>
      <Animated.View style={{ opacity: headerAnimation }}>
        <HeaderContent>
          <LogoRow>
            <LogoContainer>
              <LogoIcon>
                <Feather name="shopping-bag" size={16} color="#fff" />
              </LogoIcon>
            </LogoContainer>
            <LogoText>MintShop</LogoText>
          </LogoRow>
          
          <IconRow>
            <IconButton onPress={showSearch} accessibilityLabel="Search">
              <Feather name="search" size={20} color="#4CB7A5" />
            </IconButton>
          </IconRow>
        </HeaderContent>
      </Animated.View>

      {isSearchVisible && (
        <SearchContainer style={{ opacity: searchAnimation }}>
          <SearchRow>
            <SearchInput
              placeholder="Search products..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoFocus
            />
            <SearchIconButton onPress={handleSearch}>
              <Feather name="search" size={20} color="#4CB7A5" />
            </SearchIconButton>
            <CloseIconButton onPress={hideSearch}>
              <Feather name="x" size={20} color="#4CB7A5" />
            </CloseIconButton>
          </SearchRow>
        </SearchContainer>
      )}
    </HeaderContainer>
  );
} 
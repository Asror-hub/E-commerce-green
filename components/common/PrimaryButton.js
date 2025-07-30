import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case 'outlined':
        return 'transparent';
      case 'ghost':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `${theme.spacing.sm}px ${theme.spacing.md}px`;
      case 'lg':
        return `${theme.spacing.md}px ${theme.spacing.lg}px`;
      default:
        return `${theme.spacing.sm}px ${theme.spacing.md}px`;
    }
  }};
  border-width: ${({ variant }) => variant === 'outlined' ? '1px' : '0'};
  border-color: ${({ variant, theme }) => 
    variant === 'outlined' ? theme.colors.primary : 'transparent'
  };
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
`;

const ButtonText = styled.Text`
  color: ${({ variant, theme }) => {
    switch (variant) {
      case 'outlined':
      case 'ghost':
        return theme.colors.primary;
      default:
        return '#fff';
    }
  }};
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'font-size: 12px; font-weight: 500;';
      case 'lg':
        return 'font-size: 14px; font-weight: 600;';
      default:
        return 'font-size: 14px; font-weight: 500;';
    }
  }};
  font-weight: 600;
  text-align: center;
  margin-left: ${({ icon, theme }) => icon ? theme.spacing.xs : 0}px;
  margin-right: ${({ iconRight, theme }) => iconRight ? theme.spacing.xs : 0}px;
`;

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export default function PrimaryButton({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  style,
  ...props
}) {
  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onPress={handlePress}
      style={style}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <LoadingContainer>
          <Feather name="loader" size={16} color="#fff" />
        </LoadingContainer>
      ) : (
        <>
          {icon && !iconRight && (
            <IconContainer>
              <Feather 
                name={icon} 
                size={16} 
                color={variant === 'primary' ? '#fff' : '#4CB7A5'} 
              />
            </IconContainer>
          )}
          <ButtonText 
            variant={variant} 
            size={size}
            icon={icon && !iconRight}
            iconRight={iconRight}
          >
            {children}
          </ButtonText>
          {icon && iconRight && (
            <IconContainer>
              <Feather 
                name={icon} 
                size={16} 
                color={variant === 'primary' ? '#fff' : '#4CB7A5'} 
              />
            </IconContainer>
          )}
        </>
      )}
    </ButtonContainer>
  );
} 
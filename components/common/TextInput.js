import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput as RNTextInput, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const InputWrapper = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${({ focused, error, theme }) => {
    if (error) return theme.colors.error;
    if (focused) return theme.colors.primary;
    return theme.colors.outline;
  }};
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const StyledInput = styled(RNTextInput)`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px 0;
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.onSurface};
`;

const IconContainer = styled.View`
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const RightIconContainer = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const Label = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ErrorText = styled.Text`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const HelperText = styled.Text`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

export default function TextInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  onFocus,
  onBlur,
  style,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setShowPassword(!showPassword);
    } else {
      onRightIconPress?.();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return showPassword ? 'eye-off' : 'eye';
    }
    return rightIcon;
  };

  const getIconColor = () => {
    if (error) return '#FF6B6B';
    if (focused) return '#4CB7A5';
    return '#64748B';
  };

  return (
    <InputContainer style={style}>
      {label && <Label>{label}</Label>}
      <InputWrapper focused={focused} error={error}>
        {leftIcon && (
          <IconContainer>
            <Feather name={leftIcon} size={20} color={getIconColor()} />
          </IconContainer>
        )}
        <StyledInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {(rightIcon || secureTextEntry) && (
          <RightIconContainer onPress={handleRightIconPress}>
            <Feather name={getRightIcon()} size={20} color={getIconColor()} />
          </RightIconContainer>
        )}
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
} 
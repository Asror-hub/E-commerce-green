import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ChipContainer = styled(TouchableOpacity)`
  background-color: ${({ selected, theme }) =>
    selected 
      ? theme.colors.primary
      : theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  border: 1px solid ${({ selected, theme }) =>
    selected ? 'transparent' : theme.colors.outline};
  flex-direction: row;
  align-items: center;
`;

const ChipText = styled.Text`
  color: ${({ selected, theme }) =>
    selected ? '#fff' : theme.colors.onSurface};
  font-size: 12px;
  font-weight: ${({ selected }) => selected ? '700' : '500'};
`;

const IconContainer = styled.View`
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const Badge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
  min-width: 20px;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  color: #fff;
  ${({ theme }) => theme.typography.labelSmall};
  font-weight: 700;
`;

export default function Chip({ 
  children, 
  selected, 
  onPress, 
  icon,
  badge,
  style,
  disabled = false 
}) {
  return (
    <ChipContainer 
      selected={selected} 
      onPress={onPress} 
      style={style} 
      activeOpacity={0.8}
      disabled={disabled}
    >
      <ChipText selected={selected}>{children}</ChipText>
      {icon && (
        <IconContainer>
          <Feather 
            name={icon} 
            size={14} 
            color={selected ? '#fff' : '#64748B'} 
          />
        </IconContainer>
      )}
      {badge && (
        <Badge>
          <BadgeText>{badge}</BadgeText>
        </Badge>
      )}
    </ChipContainer>
  );
} 
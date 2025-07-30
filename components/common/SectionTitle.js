import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const TitleContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  ${({ theme }) => theme.typography.headlineMedium};
  color: ${({ theme }) => theme.colors.onSurface};
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const Subtitle = styled.Text`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  margin-top: 30px;
`;

const ActionText = styled.Text`
  ${({ theme }) => theme.typography.labelSmall};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outline};
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export default function SectionTitle({ 
  children, 
  subtitle, 
  actionText, 
  onAction,
  showDivider = false,
  style 
}) {
  return (
    <>
      <Container style={style}>
        <TitleContainer>
          <Title>{children}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleContainer>
        {actionText && onAction && (
          <ActionButton onPress={onAction}>
            <ActionText>{actionText}</ActionText>
            <Feather name="chevron-right" size={16} color="#4CB7A5" />
          </ActionButton>
        )}
      </Container>
      {showDivider && <Divider />}
    </>
  );
} 
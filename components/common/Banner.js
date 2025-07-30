import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const BannerContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
`;

const BannerImage = styled(ImageBackground)`
  height: 180px;
  justify-content: flex-end;
`;

const GradientOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const BannerContent = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  position: relative;
  z-index: 1;
`;

const BannerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Badge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

const BadgeText = styled.Text`
  color: #fff;
  ${({ theme }) => theme.typography.labelSmall};
  font-weight: 700;
`;

const BannerTitle = styled.Text`
  color: #fff;
  ${({ theme }) => theme.typography.headlineMedium};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const BannerSubtitle = styled.Text`
  color: rgba(255, 255, 255, 0.9);
  ${({ theme }) => theme.typography.bodyMedium};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const CTAButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

const CTAText = styled.Text`
  color: #fff;
  // ${({ theme }) => theme.typography.labelMedium};
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md}px;
  right: ${({ theme }) => theme.spacing.md}px;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
`;

export default function Banner({ 
  image, 
  title, 
  subtitle, 
  badge, 
  ctaText = "Shop Now",
  onPress,
  onClose,
  showCloseButton = false 
}) {
  return (
    <BannerContainer>
      <BannerImage source={image} resizeMode="cover">
        <GradientOverlay />
        
        {showCloseButton && (
          <CloseButton onPress={onClose}>
            <Feather name="x" size={16} color="#fff" />
          </CloseButton>
        )}
        
        <BannerContent>
          <BannerHeader>
            {badge && (
              <Badge>
                <BadgeText>{badge}</BadgeText>
              </Badge>
            )}
          </BannerHeader>
          
          <BannerTitle>{title}</BannerTitle>
          {subtitle && <BannerSubtitle>{subtitle}</BannerSubtitle>}
          
          <CTAButton onPress={onPress}>
            <CTAText>{ctaText}</CTAText>
            <Feather name="arrow-right" size={14} color="#fff" />
          </CTAButton>
        </BannerContent>
      </BannerImage>
    </BannerContainer>
  );
} 
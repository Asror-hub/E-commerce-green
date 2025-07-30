import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { ImageBackground, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const CarouselContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
`;

const BannerContainer = styled.View`
  height: 180px;
  width: ${screenWidth - 32}px;
  flex-direction: row;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
`;

const LeftContent = styled.View`
  flex: 0.5;
  padding: ${({ theme }) => theme.spacing.lg}px;
  justify-content: center;
`;

const RightContent = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

const BannerImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
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
  color: ${({ backgroundColor }) => backgroundColor === '#F0F8F6' ? '#2C5F5A' : '#fff'};
  ${({ theme }) => theme.typography.titleLarge};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  text-shadow: ${({ backgroundColor }) => backgroundColor === '#F0F8F6' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)'};
`;

const BannerSubtitle = styled.Text`
  color: ${({ backgroundColor }) => backgroundColor === '#F0F8F6' ? '#4A7C76' : 'rgba(255, 255, 255, 0.9)'};
  ${({ theme }) => theme.typography.bodyMedium};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  text-shadow: ${({ backgroundColor }) => backgroundColor === '#F0F8F6' ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.3)'};
`;

const CTAButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;
 
const CTAText = styled.Text`
  color: #fff;
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const PaginationContainer = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md}px;
  right: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  z-index: 2;
`;

const PaginationDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active, theme }) => 
    active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
`;

const BannerItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.9}>
    <BannerContainer backgroundColor={item.backgroundColor}>
      <LeftContent>
        <BannerHeader>
          {item.badge && (
            <Badge>
              <BadgeText>{item.badge}</BadgeText>
            </Badge>
          )}
        </BannerHeader>
        
        <BannerTitle backgroundColor={item.backgroundColor}>{item.title}</BannerTitle>
        {item.subtitle && <BannerSubtitle backgroundColor={item.backgroundColor}>{item.subtitle}</BannerSubtitle>}
        
        <CTAButton onPress={() => onPress(item)}>
          <CTAText>{item.ctaText || 'Shop Now'}</CTAText>
          <Feather name="arrow-right" size={14} color="#fff" />
        </CTAButton>
      </LeftContent>
      
      <RightContent>
        {item.image && (
          <BannerImage source={item.image} />
        )}
      </RightContent>
    </BannerContainer>
  </TouchableOpacity>
);

export default function BannerCarousel({ banners, onBannerPress }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const flatListRef = useRef(null);
  const autoScrollTimerRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth - 32));
    setActiveIndex(index);
  };

  const scrollToNext = () => {
    if (banners.length > 1) {
      const nextIndex = (activeIndex + 1) % banners.length;
      const offset = nextIndex * (screenWidth - 32);
      flatListRef.current?.scrollToOffset({
        offset: offset,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }
  };

  const startAutoScroll = () => {
    if (banners.length > 1) {
      autoScrollTimerRef.current = setInterval(() => {
        scrollToNext();
      }, 3000); // Auto-scroll every 3 seconds
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  };

  const handleTouchStart = () => {
    setIsAutoScrolling(false);
    stopAutoScroll();
  };

  const handleTouchEnd = () => {
    setIsAutoScrolling(true);
    startAutoScroll();
  };

  useEffect(() => {
    if (isAutoScrolling && banners.length > 1) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [isAutoScrolling, banners.length]);

  const renderBanner = ({ item }) => (
    <BannerItem 
      item={item} 
      onPress={onBannerPress}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );

  return (
    <CarouselContainer>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={screenWidth - 32}
        decelerationRate="fast"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
      <PaginationContainer>
        {banners.map((_, index) => (
          <PaginationDot key={index} active={index === activeIndex} />
        ))}
      </PaginationContainer>
    </CarouselContainer>
  );
} 
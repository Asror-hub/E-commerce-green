import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import PrimaryButton from '../components/common/PrimaryButton';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to MintShop',
    text: 'Discover the latest trends in fashion.',
    image: { uri: 'https://via.placeholder.com/400x400/A0E7A0/FFFFFF?text=Welcome' },
  },
  {
    key: '2',
    title: 'Shop Your Style',
    text: 'Find outfits that match your vibe.',
    image: { uri: 'https://via.placeholder.com/400x400/ADD8F7/FFFFFF?text=Shop+Style' },
  },
  {
    key: '3',
    title: 'Fast & Secure Checkout',
    text: 'Enjoy a seamless shopping experience.',
    image: { uri: 'https://via.placeholder.com/400x400/A0E7A0/FFFFFF?text=Checkout' },
  },
];

const Slide = styled.View`
  align-items: center;
  justify-content: center;
  width: ${width}px;
`;

const SlideImage = styled.Image`
  width: 260px;
  height: 260px;
  margin-bottom: 32px;
  border-radius: 20px;
`;

const SlideTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme?.colors?.primary || '#A0E7A0'};
  margin-bottom: 12px;
`;

const SlideText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme?.colors?.text || '#1F1F1F'};
  text-align: center;
  margin-bottom: 24px;
`;

const Dots = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 32px;
`;

const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ active, theme }) =>
    active ? (theme?.colors?.primary || '#A0E7A0') : (theme?.colors?.cardBackground || '#F8F8F8')};
  margin: 0 6px;
`;

const SkipButton = styled.TouchableOpacity`
  position: absolute;
  top: 48px;
  right: 24px;
  z-index: 10;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme?.colors?.secondary || '#ADD8F7'};
  border-radius: 20px;
`;

const SkipText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export default function OnboardingScreen({ navigation, setIsAuthenticated }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  const goToNext = () => {
    if (activeIndex < slides.length - 1) {
      scrollRef.current.scrollTo({ x: width * (activeIndex + 1), animated: true });
    }
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
      <SkipButton onPress={handleSkip}>
        <SkipText>Skip</SkipText>
      </SkipButton>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flexGrow: 0 }}
      >
        {slides.map((item, idx) => (
          <Slide key={item.key}>
            <SlideImage source={item.image} />
            <SlideTitle>{item.title}</SlideTitle>
            <SlideText>{item.text}</SlideText>
          </Slide>
        ))}
      </ScrollView>
      <Dots>
        {slides.map((_, i) => (
          <Dot key={i} active={i === activeIndex} />
        ))}
      </Dots>
      {activeIndex < slides.length - 1 ? (
        <PrimaryButton style={{ marginHorizontal: 32 }} onPress={goToNext}>
          Next
        </PrimaryButton>
      ) : (
        <PrimaryButton style={{ marginHorizontal: 32 }} onPress={handleGetStarted}>
          Get Started
        </PrimaryButton>
      )}
    </View>
  );
} 
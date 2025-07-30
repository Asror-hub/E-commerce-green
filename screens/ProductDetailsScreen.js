import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Text, 
  Dimensions, 
  StatusBar,
  FlatList,
  Animated
} from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../components/common/PrimaryButton';
import OutlinedButton from '../components/common/OutlinedButton';
import RatingStars from '../components/common/RatingStars';
import { theme } from '../theme';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 340;

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  padding-top: 40px;
  background-color: ${({ isScrolled }) => isScrolled ? theme.colors.background : 'transparent'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom-width: ${({ isScrolled }) => isScrolled ? '0.5px' : '0px'};
  border-bottom-color: ${theme.colors.outline};
`;

const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.text};
  text-align: left;
  margin-left: 16px;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transform: translateY(${({ isVisible }) => isVisible ? 0 : -10}px);
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ImageSection = styled.View`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  background-color: ${theme.colors.surface};
`;

const ImageContainer = styled.View`
  width: ${width}px;
  height: ${IMAGE_HEIGHT}px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const ImageIndicator = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IndicatorDot = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ active }) => active ? theme.colors.primary : 'rgba(76, 183, 165, 0.3)'};
  margin-horizontal: 3px;
`;

const ContentSection = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px -8px;
  shadow-opacity: 0.18;
  shadow-radius: 24px;
  elevation: 12;
  z-index: 10;
`;

const ProductInfo = styled.View`
  padding: 20px 20px 16px 20px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${theme.colors.outline};
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 16px;
`;

const CurrentPrice = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-right: 12px;
`;

const OriginalPrice = styled.Text`
  font-size: 18px;
  color: ${theme.colors.mutedText};
  text-decoration-line: line-through;
  font-weight: 400;
`;

const DiscountBadge = styled.View`
  background-color: ${theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 8px;
`;

const DiscountText = styled.Text`
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const ProductTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.text};
  line-height: 28px;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0.3};
  transform: translateY(${({ isVisible }) => isVisible ? 0 : -5}px);
`;

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const RatingText = styled.Text`
  margin-left: 8px;
  color: ${theme.colors.mutedText};
  font-size: 14px;
  font-weight: 500;
`;

const ReviewCount = styled.Text`
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
`;

const SoldCount = styled.Text`
  color: ${theme.colors.mutedText};
  font-size: 14px;
  margin-left: 16px;
  font-weight: 400;
`;

const VariantSection = styled.View`
  padding: 20px 20px 0 20px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 16px;
  letter-spacing: -0.2px;
`;

const ColorContainer = styled.View`
  margin-bottom: 24px;
`;

const ColorRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ColorOption = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ selected }) => selected ? theme.colors.primary : 'transparent'};
  margin-right: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ColorCheck = styled.View`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const SizeContainer = styled.View`
  margin-bottom: 24px;
`;

const SizeRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const SizeOption = styled.TouchableOpacity`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ selected }) => selected ? theme.colors.primary : theme.colors.outline};
  background-color: ${({ selected }) => selected ? theme.colors.primary : 'transparent'};
  margin-right: 10px;
  margin-bottom: 10px;
  min-width: 40px;
  align-items: center;
`;

const SizeText = styled.Text`
  color: ${({ selected }) => selected ? theme.colors.background : theme.colors.text};
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.2px;
`;

const QuantitySection = styled.View`
  padding: 20px 20px 0 20px;
`;

const QuantityRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const QuantityLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text};
`;

const QuantityControl = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.colors.outline};
  border-radius: 6px;
  overflow: hidden;
  background-color: ${theme.colors.background};
`;

const QuantityButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.surface};
`;

const QuantityText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text};
  padding-horizontal: 16px;
  min-width: 44px;
  text-align: center;
`;

const DescriptionSection = styled.View`
  padding: 20px 20px 0 20px;
`;

const DescriptionText = styled.Text`
  font-size: 15px;
  color: ${theme.colors.mutedText};
  line-height: 24px;
  font-weight: 400;
`;

const ReviewsSection = styled.View`
  padding: 20px 20px 32px 20px;
`;

const ReviewItem = styled.View`
  padding: 20px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: ${theme.colors.outline};
`;

const ReviewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const ReviewAvatar = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const ReviewInfo = styled.View`
  flex: 1;
`;

const ReviewerName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const ReviewDate = styled.Text`
  font-size: 12px;
  color: ${theme.colors.mutedText};
  margin-top: 2px;
  font-weight: 400;
`;

const ReviewText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.mutedText};
  line-height: 20px;
  font-weight: 400;
`;

const ShowMoreButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  margin-top: 16px;
  background-color: ${theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${theme.colors.outline};
  flex-direction: row;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 3px;
  elevation: 1;
`;

const ShowMoreText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.text};
  letter-spacing: 0.2px;
  margin-right: 8px;
`;

const ShowMoreIcon = styled.View`
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
`;

const BottomActionBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.background};
  border-top-width: 0.5px;
  border-top-color: ${theme.colors.outline};
  padding: 16px 20px;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  elevation: 1000;
`;

const BottomPriceContainer = styled.View`
  flex: 1;
  margin-right: 16px;
`;

const BottomPriceRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 2px;
`;

const BottomCurrentPrice = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-right: 8px;
`;

const BottomOriginalPrice = styled.Text`
  font-size: 16px;
  color: ${theme.colors.mutedText};
  text-decoration-line: line-through;
  font-weight: 400;
`;

const BottomDiscountBadge = styled.View`
  background-color: ${theme.colors.secondary};
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
`;

const BottomDiscountText = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const AddToCartButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: 12px;
  paddingHorizontal: 24px;
  paddingVertical: 14px;
  flex-direction: row;
  align-items: center;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 4;
`;

const AddToCartText = styled.Text`
  color: ${theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-right: 8px;
`;

const CartIcon = styled.View`
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
`;

const ToastContainer = styled(Animated.View)`
  position: absolute;
  bottom: 100px;
  left: 20px;
  right: 20px;
  background-color: ${theme.colors.text};
  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  z-index: 2000;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 8;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ToastIcon = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${theme.colors.success};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  shadow-color: ${theme.colors.success};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const ToastText = styled.Text`
  flex: 1;
  color: ${theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 18px;
`;

const RecommendedSection = styled.View`
  padding: 20px 20px 32px 20px;
  border-top-width: 0.5px;
  border-top-color: ${theme.colors.outline};
`;

const RecommendedTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 16px;
  letter-spacing: -0.3px;
`;

const RecommendedList = styled.ScrollView`
  flex-direction: row;
  padding-horizontal: -10px;
`;

const RecommendedCard = styled.TouchableOpacity`
  width: 160px;
  margin-right: 16px;
  background-color: ${theme.colors.background};
  border-radius: 12px;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
  overflow: hidden;
`;

const RecommendedImage = styled.Image`
  width: 100%;
  height: 120px;
  resize-mode: cover;
`;

const RecommendedInfo = styled.View`
  padding: 12px;
`;

const RecommendedProductTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text};
  margin-bottom: 4px;
  line-height: 18px;
`;

const RecommendedPrice = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

// Sample data
const productImages = [
  { uri: 'https://picsum.photos/800/800?random=1' },
  { uri: 'https://picsum.photos/800/800?random=2' },
  { uri: 'https://picsum.photos/800/800?random=3' },
  { uri: 'https://picsum.photos/800/800?random=4' },
];

const colors = ['#000000', '#FFFFFF', '#8B4513', '#4169E1', '#DC143C'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const reviews = [
  {
    id: '1',
    name: 'Alexander M.',
    rating: 5,
    date: '2 days ago',
    text: 'Exceptional quality and craftsmanship. The fit is perfect and the materials feel premium. Highly recommend for anyone looking for sophisticated footwear.'
  },
  {
    id: '2',
    name: 'Victoria S.',
    rating: 4,
    date: '1 week ago',
    text: 'Very well made shoes with excellent attention to detail. The leather is soft and the construction is solid. Shipping was prompt and packaging was elegant.'
  },
  {
    id: '3',
    name: 'Michael R.',
    rating: 5,
    date: '2 weeks ago',
    text: 'Outstanding value for the price point. The design is timeless and the comfort level is exceptional. Will definitely purchase again.'
  },
  {
    id: '4',
    name: 'Sarah J.',
    rating: 5,
    date: '3 weeks ago',
    text: 'These shoes exceeded my expectations! The comfort level is incredible and they look even better in person. Perfect for both casual and dressy occasions.'
  },
  {
    id: '5',
    name: 'David L.',
    rating: 4,
    date: '1 month ago',
    text: 'Great quality shoes with excellent build. The leather is supple and the stitching is precise. Only giving 4 stars because they run slightly large.'
  },
  {
    id: '6',
    name: 'Emma W.',
    rating: 5,
    date: '1 month ago',
    text: 'Absolutely love these shoes! They are so comfortable and stylish. The attention to detail is remarkable and they go with everything in my wardrobe.'
  },
  {
    id: '7',
    name: 'James K.',
    rating: 4,
    date: '2 months ago',
    text: 'Solid construction and good materials. The shoes feel durable and well-made. The only minor issue is the break-in period, but once broken in they are very comfortable.'
  }
];

const recommendedProducts = [
  {
    id: '1',
    name: 'Classic White Sneakers',
    price: 79.99,
    image: { uri: 'https://picsum.photos/300/300?random=10' }
  },
  {
    id: '2',
    name: 'Premium Running Shoes',
    price: 129.99,
    image: { uri: 'https://picsum.photos/300/300?random=11' }
  },
  {
    id: '3',
    name: 'Casual Slip-On Loafers',
    price: 89.99,
    image: { uri: 'https://picsum.photos/300/300?random=12' }
  },
  {
    id: '4',
    name: 'Athletic Training Shoes',
    price: 109.99,
    image: { uri: 'https://picsum.photos/300/300?random=13' }
  },
  {
    id: '5',
    name: 'Formal Oxford Shoes',
    price: 149.99,
    image: { uri: 'https://picsum.photos/300/300?random=14' }
  }
];

const FALLBACK_IMAGE = { uri: 'https://picsum.photos/800/800?random=fallback' };

function getValidImage(img) {
  if (!img) return null;
  if (typeof img === 'string' && img.trim() !== '') return { uri: img };
  if (typeof img === 'object' && typeof img.uri === 'string' && img.uri.trim() !== '') return { uri: img.uri };
  return null;
}

export default function ProductDetailsScreen({ navigation, route }) {
  const cartContext = useCart();
  const wishlistContext = useWishlist();
  
  // Destructure with fallbacks to prevent errors
  const { addToCart, cartItems, isInCart } = cartContext || {};
  const { toggleWishlist, isInWishlist } = wishlistContext || {};
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastAnimation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  // Calculate when header should change
  const headerTransitionPoint = IMAGE_HEIGHT - 100; // When panel is 100px from top
  const isHeaderScrolled = scrollY >= headerTransitionPoint;
  const isHeaderTitleVisible = scrollY >= headerTransitionPoint + 20; // Show title slightly after

  // Get product from navigation params
  const product = route?.params?.product;

  // Helper functions for wishlist and cart management
  const getCurrentProduct = () => ({
    id: product?.id || '1',
    name: product?.name || 'Premium Leather Sneakers',
    price: product?.price || 89.99,
    originalPrice: product?.originalPrice || 129.99,
    image: product?.image || productImages[0],
    color: colors[selectedColor],
    size: sizes[selectedSize],
    quantity: quantity,
  });

  const isProductInWishlist = (productId) => {
    return isInWishlist(productId);
  };

  const isProductInCart = (productId) => {
    return isInCart ? isInCart(productId) : false;
  };

  // Get product image from navigation params
  const productImage = getValidImage(product?.image);

  // Initialize wishlist state based on current product
  useEffect(() => {
    // Debug: Log context values
    console.log('CartContext:', cartContext);
    console.log('WishlistContext:', wishlistContext);
  }, [product?.id, cartContext, wishlistContext]);
  
  // Create images array - use product image if available, otherwise use sample images
  const images = productImage 
    ? [productImage, ...productImages] 
    : productImages.length > 0 
      ? productImages 
      : [FALLBACK_IMAGE];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    const currentProduct = getCurrentProduct();
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      
      // Add to cart using global context
      addToCart(currentProduct);
      showToastMessage('Added to cart successfully!');
      
      console.log('Cart updated:', cartItems);
    }, 1000);
  };

  const handleGoToCart = () => {
    console.log('Navigating to cart with items:', cartItems);
    navigation.navigate('Cart');
    showToastMessage(`Cart has ${cartItems.length} items`);
  };

  const handleToggleWishlist = () => {
    const currentProduct = getCurrentProduct();
    const productId = currentProduct.id;
    
    const wasInWishlist = isProductInWishlist(productId);
    toggleWishlist(currentProduct);
    
    if (wasInWishlist) {
      showToastMessage('Removed from wishlist!');
    } else {
      showToastMessage('Added to wishlist!');
    }
    
    console.log('Wishlist updated');
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    
    // Animate in - flip up from bottom
    Animated.spring(toastAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      // Animate out - flip down to bottom
      Animated.spring(toastAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start(() => {
        setShowToast(false);
      });
    }, 3000);
  };

  const handleShare = () => {
    // Here you would typically use a sharing library like react-native-share
    console.log('Sharing product:', product?.name || 'Premium Leather Sneakers');
    showToastMessage('Share dialog opened');
  };

  const handleRecommendedProduct = (product) => {
    console.log('Selected recommended product:', product.name);
    // Navigate to the same screen with the new product
    navigation.push('ProductDetails', { product });
  };

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const handleImageScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentImageIndex(index);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Toast Notification */}
      {showToast && (
        <ToastContainer
          style={{
            transform: [
              {
                translateY: toastAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0], // Start 100px below, animate to 0
                }),
              },
              {
                scale: toastAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.8, 1.1, 1], // Slight scale effect for bounce
                }),
              },
            ],
            opacity: toastAnimation,
          }}
        >
          <ToastIcon>
            <Feather name="check" size={14} color={theme.colors.background} />
          </ToastIcon>
          <ToastText>{toastMessage}</ToastText>
        </ToastContainer>
      )}
      
      {/* Header */}
      <Header isScrolled={isHeaderScrolled}>
        <BackButton onPress={handleBack}>
          <Feather name="arrow-left" size={20} color={theme.colors.text} />
        </BackButton>
        <HeaderTitle isVisible={isHeaderTitleVisible}>
          {product?.name || 'Premium Leather Sneakers'}
        </HeaderTitle>
        <HeaderActions>
          <HeaderButton onPress={handleToggleWishlist}>
            <Feather 
              name={isProductInWishlist(product?.id || '1') ? "heart" : "heart"} 
              size={20} 
              color={isProductInWishlist(product?.id || '1') ? theme.colors.secondary : theme.colors.text} 
              style={{ fill: isProductInWishlist(product?.id || '1') ? theme.colors.secondary : "none" }}
            />
          </HeaderButton>
          <HeaderButton onPress={handleShare}>
            <Feather name="share" size={20} color={theme.colors.text} />
          </HeaderButton>
        </HeaderActions>
      </Header>

      {/* Image Section */}
      <ImageSection>
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={handleImageScroll}
          scrollEventThrottle={16}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ImageContainer>
              <ProductImage 
                source={item} 
                defaultSource={FALLBACK_IMAGE}
                onError={() => console.log(`Failed to load image ${index}`)}
                onLoad={() => console.log(`Successfully loaded image ${index}`)}
              />
            </ImageContainer>
          )}
        />
        <ImageIndicator>
          {images.map((_, index) => (
            <IndicatorDot key={index} active={index === currentImageIndex} />
          ))}
        </ImageIndicator>
      </ImageSection>

      {/* Main Scroll View for Panel Movement */}
      <ScrollView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingTop: IMAGE_HEIGHT - 34,
          paddingBottom: 75,
        }}
        onScroll={(event) => {
          const currentScrollY = event.nativeEvent.contentOffset.y;
          setScrollY(currentScrollY);
        }}
        scrollEventThrottle={16}
      >
        {/* Content Panel */}
        <View style={{
          backgroundColor: theme.colors.background,
          borderTopLeftRadius: Math.max(0, 28 - (scrollY / (IMAGE_HEIGHT - 34)) * 28),
          borderTopRightRadius: Math.max(0, 28 - (scrollY / (IMAGE_HEIGHT - 34)) * 28),
          shadowColor: theme.colors.text,
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.18,
          shadowRadius: 24,
          elevation: 12,
        }}>
          <ProductInfo>
            <ProductTitle isVisible={!isHeaderTitleVisible}>{product?.name || 'Premium Leather Sneakers - Classic Design'}</ProductTitle>
            <RatingRow>
              <RatingStars rating={product?.rating || 4.5} size={16} />
              <RatingText>{product?.rating || 4.5}</RatingText>
              <ReviewCount>({reviews.length} reviews)</ReviewCount>
              <SoldCount>• 2.5k sold</SoldCount>
            </RatingRow>
          </ProductInfo>

          <VariantSection>
            <ColorContainer>
              <SectionTitle>Color</SectionTitle>
              <ColorRow>
                {colors.map((color, index) => (
                  <ColorOption
                    key={index}
                    color={color}
                    selected={selectedColor === index}
                    onPress={() => setSelectedColor(index)}
                  >
                    {selectedColor === index && (
                      <ColorCheck>
                        <Feather name="check" size={10} color={theme.colors.primary} />
                      </ColorCheck>
                    )}
                  </ColorOption>
                ))}
              </ColorRow>
            </ColorContainer>

            <SizeContainer>
              <SectionTitle>Size</SectionTitle>
              <SizeRow>
                {sizes.map((size, index) => (
                  <SizeOption
                    key={index}
                    selected={selectedSize === index}
                    onPress={() => setSelectedSize(index)}
                  >
                    <SizeText selected={selectedSize === index}>{size}</SizeText>
                  </SizeOption>
                ))}
              </SizeRow>
            </SizeContainer>
          </VariantSection>

          <QuantitySection>
            <QuantityRow>
              <QuantityLabel>Quantity</QuantityLabel>
              <QuantityControl>
                <QuantityButton onPress={decreaseQuantity}>
                  <Feather name="minus" size={16} color={theme.colors.mutedText} />
                </QuantityButton>
                <QuantityText>{quantity}</QuantityText>
                <QuantityButton onPress={increaseQuantity}>
                  <Feather name="plus" size={16} color={theme.colors.mutedText} />
                </QuantityButton>
              </QuantityControl>
            </QuantityRow>
          </QuantitySection>

          <DescriptionSection>
            <SectionTitle>Description</SectionTitle>
            <DescriptionText>
              {product?.description || `Crafted with premium materials and exceptional attention to detail, these sneakers represent the perfect balance of style and comfort. \n\nFeatures:\n• Premium full-grain leather upper\n• Cushioned memory foam insole\n• Durable rubber outsole with superior traction\n• Reinforced stitching for longevity\n• Breathable lining for all-day comfort\n• Classic design that transcends trends\n\nPerfect for both casual and semi-formal occasions, these sneakers offer timeless elegance with modern comfort technology.`}
            </DescriptionText>
          </DescriptionSection>

          <ReviewsSection>
            <SectionTitle>Customer Reviews</SectionTitle>
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
              <ReviewItem key={review.id}>
                <ReviewHeader>
                  <ReviewAvatar>
                    <Text style={{ color: theme.colors.mutedText, fontSize: 14, fontWeight: '600' }}>
                      {review.name.charAt(0)}
                    </Text>
                  </ReviewAvatar>
                  <ReviewInfo>
                    <ReviewerName>{review.name}</ReviewerName>
                    <ReviewDate>{review.date}</ReviewDate>
                  </ReviewInfo>
                  <RatingStars rating={review.rating} size={12} />
                </ReviewHeader>
                <ReviewText>{review.text}</ReviewText>
              </ReviewItem>
            ))}
            {reviews.length > 3 && (
              <ShowMoreButton onPress={toggleShowAllReviews}>
                <ShowMoreText>
                  {showAllReviews ? 'Show Less Reviews' : 'Show More Reviews'}
                </ShowMoreText>
                <ShowMoreIcon>
                  <Feather 
                    name={showAllReviews ? "chevron-up" : "chevron-down"} 
                    size={16} 
                    color={theme.colors.text} 
                  />
                </ShowMoreIcon>
              </ShowMoreButton>
            )}
          </ReviewsSection>

          <RecommendedSection>
            <RecommendedTitle>You Might Also Like</RecommendedTitle>
            <RecommendedList 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {recommendedProducts.map((product) => (
                <RecommendedCard 
                  key={product.id} 
                  onPress={() => handleRecommendedProduct(product)}
                >
                  <RecommendedImage 
                    source={product.image} 
                    defaultSource={FALLBACK_IMAGE}
                  />
                  <RecommendedInfo>
                    <RecommendedProductTitle numberOfLines={2}>
                      {product.name}
                    </RecommendedProductTitle>
                    <RecommendedPrice>${product.price}</RecommendedPrice>
                  </RecommendedInfo>
                </RecommendedCard>
              ))}
            </RecommendedList>
          </RecommendedSection>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <BottomActionBar>
        <BottomPriceContainer>
          <BottomPriceRow>
            <BottomCurrentPrice>${product?.price || 89.99}</BottomCurrentPrice>
            <BottomOriginalPrice>${product?.originalPrice || 129.99}</BottomOriginalPrice>
            <BottomDiscountBadge>
              <BottomDiscountText>-31%</BottomDiscountText>
            </BottomDiscountBadge>
          </BottomPriceRow>
        </BottomPriceContainer>
        <AddToCartButton 
          onPress={isProductInCart(product?.id || '1') ? handleGoToCart : handleAddToCart} 
          disabled={isAddingToCart}
          style={{
            backgroundColor: isProductInCart(product?.id || '1') ? theme.colors.success : theme.colors.primary,
          }}
        >
          <AddToCartText>
            {isAddingToCart ? 'Adding...' : isProductInCart(product?.id || '1') ? 'Go to Cart' : 'Add to Cart'}
          </AddToCartText>
          <CartIcon>
            {isAddingToCart ? (
              <Feather name="loader" size={14} color={theme.colors.background} />
            ) : isProductInCart(product?.id || '1') ? (
              <Feather name="arrow-right" size={14} color={theme.colors.background} />
            ) : (
              <Feather name="shopping-cart" size={14} color={theme.colors.background} />
            )}
          </CartIcon>
        </AddToCartButton>
      </BottomActionBar>
    </Container>
  );
} 
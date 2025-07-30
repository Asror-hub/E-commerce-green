import React, { useState, useRef } from 'react';
import { View, ScrollView, FlatList, StatusBar, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MasonryList from '@react-native-seoul/masonry-list';
import Header from '../components/common/Header';
import BannerCarousel from '../components/common/BannerCarousel';
import ProductCard from '../components/common/ProductCard';
import SectionTitle from '../components/common/SectionTitle';
import Chip from '../components/common/Chip';
import RatingStars from '../components/common/RatingStars';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding-bottom: 120px;
`;

const CategoryContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const CategoryScroll = styled.ScrollView`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const CategoryItem = styled.TouchableOpacity`
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
  width: 80px;
`;

const CategoryIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const CategoryName = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onSurface};
  text-align: center;
`;

const ProductsContainer = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ProductsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const TrendingProductsContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const TrendingProductsScroll = styled.ScrollView`
  padding-horizontal: -${({ theme }) => theme.spacing.sm}px;
`;

const TrendingProductCard = styled.TouchableOpacity`
  width: 160px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.outline};
`;

const TrendingProductImage = styled.Image`
  width: 100%;
  height: 120px;
  resize-mode: cover;
`;

const TrendingProductInfo = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const TrendingProductName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  line-height: 18px;
`;

const TrendingProductPrice = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const TrendingProductOriginalPrice = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-decoration-line: line-through;
  margin-left: 4px;
`;

const TrendingProductRating = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const TrendingProductRatingText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-left: 4px;
`;

const DiscountProductsContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  margin-top: -30px;
  margin-bottom: 40px;
`;

const DiscountProductsScroll = styled.ScrollView`
  padding-horizontal: -${({ theme }) => theme.spacing.sm}px;
`;

const DiscountProductCard = styled.TouchableOpacity`
  width: 160px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.outline};
`;

const DiscountProductImage = styled.Image`
  width: 100%;
  height: 120px;
  resize-mode: cover;
`;

const DiscountProductInfo = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const DiscountProductName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  line-height: 18px;
`;

const DiscountProductPrice = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DiscountProductOriginalPrice = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-decoration-line: line-through;
  margin-left: 4px;
`;

const DiscountBadge = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

const DiscountBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const DiscountProductRating = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const DiscountProductRatingText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-left: 4px;
`;

const ToastContainer = styled(Animated.View)`
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.text};
  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  z-index: 2000;
  shadow-color: ${({ theme }) => theme.colors.text};
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
  background-color: ${({ theme }) => theme.colors.success};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  shadow-color: ${({ theme }) => theme.colors.success};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const ToastText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 18px;
`;

// Sample data
const banners = [
  {
    id: '1',
    image: require('../assets/images/mine.png'),
    backgroundColor: '#F0F8F6',
    title: 'Summer Collection',
    subtitle: 'Up to 50% off on selected items',
    badge: 'SALE',
    ctaText: 'Shop Now'
  },
  {
    id: '4',
    image: null,
    backgroundColor: '#16A085',
    title: 'Premium Collection',
    subtitle: 'Exclusive designer pieces',
    badge: 'PREMIUM',
    ctaText: 'Discover'
  }
];

const categories = [
          { id: '1', name: 'T-Shirts', icon: 'user' },
  { id: '2', name: 'Jeans', icon: 'user' },
  { id: '3', name: 'Dresses', icon: 'heart' },
  { id: '4', name: 'Shoes', icon: 'shopping-bag' },
  { id: '5', name: 'Accessories', icon: 'star' },
  { id: '6', name: 'Bags', icon: 'briefcase' },
];

const trendingProducts = [
  {
    id: 'trend1',
    name: 'Premium Leather Sneakers',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.5,
    image: { uri: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' }
  },
  {
    id: 'trend2',
    name: 'Classic Denim Jacket',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.3,
    image: { uri: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop' }
  },
  {
    id: 'trend3',
    name: 'Wireless Earbuds',
    price: 129.99,
    rating: 4.7,
    image: { uri: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop' }
  },
  {
    id: 'trend4',
    name: 'Smart Watch',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.6,
    image: { uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
  },
  {
    id: 'trend5',
    name: 'Designer Sunglasses',
    price: 149.99,
    rating: 4.4,
    image: { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop' }
  },
  {
    id: 'trend6',
    name: 'Leather Crossbody Bag',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.8,
    image: { uri: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop' }
  },
  {
    id: 'trend7',
    name: 'Fitness Tracker',
    price: 79.99,
    rating: 4.2,
    image: { uri: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop' }
  }
];

const discountProducts = [
  {
    id: 'discount1',
    name: 'Casual Cotton T-Shirt',
    price: 19.99,
    originalPrice: 39.99,
    discount: 50,
    rating: 4.2,
    image: { uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' }
  },
  {
    id: 'discount2',
    name: 'Basic Denim Jeans',
    price: 34.99,
    originalPrice: 69.99,
    discount: 50,
    rating: 4.0,
    image: { uri: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop' }
  },
  {
    id: 'discount3',
    name: 'Simple Summer Dress',
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    rating: 4.3,
    image: { uri: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop' }
  },
  {
    id: 'discount4',
    name: 'Comfortable Sneakers',
    price: 44.99,
    originalPrice: 89.99,
    discount: 50,
    rating: 4.1,
    image: { uri: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' }
  },
  {
    id: 'discount5',
    name: 'Stylish Sunglasses',
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    rating: 4.4,
    image: { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop' }
  },
  {
    id: 'discount6',
    name: 'Leather Wallet',
    price: 14.99,
    originalPrice: 29.99,
    discount: 50,
    rating: 4.0,
    image: { uri: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop' }
  },
  {
    id: 'discount7',
    name: 'Wireless Charger',
    price: 19.99,
    originalPrice: 39.99,
    discount: 50,
    rating: 4.2,
    image: { uri: 'https://images.unsplash.com/photo-1609592806596-b43bada2f2a2?w=400&h=300&fit=crop' }
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.5,
    image: { uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' }
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.3,
    image: { uri: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop' }
  },
  {
    id: '3',
    name: 'Summer Dress',
    price: 79.99,
    rating: 4.7,
    image: { uri: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop' }
  },
  {
    id: '4',
    name: 'Casual Sneakers',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.4,
    image: { uri: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' }
  },
  // New products
  {
    id: '5',
    name: 'Elegant Leather Handbag',
    price: 120.00,
    rating: 4.8,
    image: { uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop' }
  },
  {
    id: '6',
    name: 'Modern Sunglasses',
    price: 45.50,
    rating: 4.6,
    image: { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop' }
  },
  {
    id: '7',
    name: 'Classic Wrist Watch',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.9,
    image: { uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop' }
  },
  {
    id: '8',
    name: 'Wireless Headphones',
    price: 89.00,
    rating: 4.7,
    image: { uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop' }
  },
  {
    id: '9',
    name: 'Sporty Backpack',
    price: 65.00,
    rating: 4.5,
    image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop' }
  },
  {
    id: '10',
    name: 'Premium Coffee Mug',
    price: 24.99,
    rating: 4.3,
    image: { uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop' }
  },
  {
    id: '11',
    name: 'Bluetooth Speaker',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    image: { uri: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop' }
  },
  {
    id: '12',
    name: 'Yoga Mat',
    price: 34.99,
    rating: 4.4,
    image: { uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' }
  },
  {
    id: '13',
    name: 'Desk Lamp',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.7,
    image: { uri: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop' }
  },
  {
    id: '14',
    name: 'Plant Pot Set',
    price: 39.99,
    rating: 4.2,
    image: { uri: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop' }
  },
];

export default function HomeScreen({ navigation }) {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastAnimation = useRef(new Animated.Value(0)).current;


  const handleSearch = () => {
    // TODO: Navigate to search screen
    console.log('Search pressed');
  };

  const handleCart = () => {
    // TODO: Navigate to cart screen
    console.log('Cart pressed');
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    
    // Animate in
    Animated.spring(toastAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    // Auto hide after 3 seconds
    setTimeout(() => {
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

  const handleAddToCart = (productId) => {
    // Find the product from featured products
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        ...product,
        color: 'Default',
        size: 'M',
        quantity: 1
      });
      showToastMessage(`${product.name} added to cart!`);
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const handleWishlist = (productId) => {
    // Find the product from featured products
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      const wasInWishlist = isInWishlist(productId);
      toggleWishlist(product);
      if (wasInWishlist) {
        showToastMessage(`${product.name} removed from wishlist!`);
      } else {
        showToastMessage(`${product.name} added to wishlist!`);
      }
    }
  };

  const handleBannerPress = (banner) => {
    // TODO: Navigate to banner destination
    console.log('Banner pressed:', banner.title);
  };

  const handleTrendingProduct = (product) => {
    // TODO: Navigate to product details
    console.log('Trending product pressed:', product.name);
    navigation.navigate('ProductDetails', { product });
  };

  const handleDiscountProduct = (product) => {
    // TODO: Navigate to product details
    console.log('Discount product pressed:', product.name);
    navigation.navigate('ProductDetails', { product });
  };

  const renderCategory = (item) => (
    <CategoryItem 
      key={item.id} 
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.8}
    >
      <CategoryIcon>
        <Feather name={item?.icon || 'circle'} size={24} color="#fff" />
      </CategoryIcon>
      <CategoryName>{item?.name || 'Category'}</CategoryName>
    </CategoryItem>
  );

  const renderProduct = (item) => (
    <ProductCard
      key={item.id}
      image={item.image}
      name={item.name}
      price={item.price}
      originalPrice={item.originalPrice}
      discount={item.discount}
      rating={item.rating}
      onWishlist={() => handleWishlist(item.id)}
      isWishlisted={isInWishlist(item.id)}
      style={{ marginBottom: 12, marginHorizontal: 4 }}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      showAddToCart={true}
      onAddToCart={() => handleAddToCart(item.id)}
      isInCart={isProductInCart(item.id)}
    />
  );

  const renderTrendingProduct = (item) => (
    <TrendingProductCard 
      key={item.id} 
      onPress={() => handleTrendingProduct(item)}
      activeOpacity={0.8}
    >
      <TrendingProductImage source={item.image} />
      <TrendingProductInfo>
        <TrendingProductName numberOfLines={2}>{item.name}</TrendingProductName>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <TrendingProductPrice>${item.price}</TrendingProductPrice>
          {item.originalPrice && (
            <TrendingProductOriginalPrice>${item.originalPrice}</TrendingProductOriginalPrice>
          )}
        </View>
        <TrendingProductRating>
          <RatingStars rating={item.rating} size={12} />
          <TrendingProductRatingText>({item.rating})</TrendingProductRatingText>
        </TrendingProductRating>
      </TrendingProductInfo>
    </TrendingProductCard>
  );

  const renderDiscountProduct = (item) => (
    <DiscountProductCard 
      key={item.id} 
      onPress={() => handleDiscountProduct(item)}
      activeOpacity={0.8}
    >
      <DiscountProductImage source={item.image} />
      {item.discount && (
        <DiscountBadge>
          <DiscountBadgeText>-{item.discount}%</DiscountBadgeText>
        </DiscountBadge>
      )}
      <DiscountProductInfo>
        <DiscountProductName numberOfLines={2}>{item.name}</DiscountProductName>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <DiscountProductPrice>${item.price}</DiscountProductPrice>
          {item.originalPrice && (
            <DiscountProductOriginalPrice>${item.originalPrice}</DiscountProductOriginalPrice>
          )}
        </View>
        <DiscountProductRating>
          <RatingStars rating={item.rating} size={12} />
          <DiscountProductRatingText>({item.rating})</DiscountProductRatingText>
        </DiscountProductRating>
      </DiscountProductInfo>
    </DiscountProductCard>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        onSearch={handleSearch}
      />
      
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
            <Feather name="check" size={14} color="#FFFFFF" />
          </ToastIcon>
          <ToastText>{toastMessage}</ToastText>
        </ToastContainer>
      )}
      
      <Content showsVerticalScrollIndicator={false}>
        <BannerCarousel
          banners={banners}
          onBannerPress={handleBannerPress}
        />
        
        <TrendingProductsContainer>
          <SectionTitle 
            title="Trending Now" 
            subtitle="Most popular products"
            actionText="View All"
            onAction={() => navigation.navigate('ProductList')}
          />
          <TrendingProductsScroll 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          >
            {trendingProducts.map(renderTrendingProduct)}
          </TrendingProductsScroll>
        </TrendingProductsContainer>
        
        <CategoryContainer>
          <SectionTitle 
            title="Categories" 
            subtitle="Shop by category"
            actionText="View All"
            onAction={() => navigation.navigate('Categories')}
          />
          <CategoryScroll horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(renderCategory)}
          </CategoryScroll>
        </CategoryContainer>
        
        <ProductsContainer>
          <SectionTitle 
            title="Featured Products" 
            subtitle="Handpicked for you"
            actionText="View All"
            onAction={() => navigation.navigate('ProductList')}
          />
          <MasonryList
            data={featuredProducts.slice(0, 6)}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderProduct(item)}
          />
        </ProductsContainer>
        
        <DiscountProductsContainer>
          <SectionTitle 
            title="On Sale" 
            subtitle="Great deals up to 50% off"
            actionText="View All"
            onAction={() => navigation.navigate('ProductList')}
          />
          <DiscountProductsScroll 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          >
            {discountProducts.map(renderDiscountProduct)}
          </DiscountProductsScroll>
        </DiscountProductsContainer>
        
        <ProductsContainer style={{ marginTop: 0, marginBottom: 0 }}>
          <MasonryList
            data={featuredProducts.slice(6)}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderProduct(item)}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </ProductsContainer>
      </Content>
    </Container>
  );
} 
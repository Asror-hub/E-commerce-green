import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useCart } from '../contexts/CartContext';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

// Custom Tab Bar Icon Component
const TabBarIcon = styled.View`
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background-color: ${({ focused }) => 
    focused ? '#4CB7A5' : 'transparent'
  };
  margin-bottom: 24px;
  position: relative;
`;

const CartBadge = styled.View`
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: #E94F8A;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 2px solid #F8FAFC;
`;

const CartBadgeText = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  line-height: 16px;
`;

const TabBarLabel = styled.Text`
  font-size: 13px;
  font-weight: ${({ focused }) => focused ? '700' : '500'};
  color: ${({ focused }) => 
    focused ? '#4CB7A5' : '#64748B'
  };
  letter-spacing: 0.3px;
  text-align: center;
`;

function AuthNavigator({ setIsAuthenticated }) {
  return (
    <AuthStack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
      }}
    >
      <AuthStack.Screen name="Onboarding">
        {props => <OnboardingScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Login">
        {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Register">
        {props => <RegisterScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
}

function MainTabs() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: '#FFFFFF' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Categories':
              iconName = 'grid';
              break;
            case 'Wishlist':
              iconName = 'heart';
              break;
            case 'Cart':
              iconName = 'shopping-cart';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              iconName = 'circle';
          }
          
          return (
            <TabBarIcon focused={focused}>
              <Feather name={iconName} size={size || 24} color={focused ? '#FFFFFF' : '#64748B'} />
              {route.name === 'Cart' && cartCount > 0 && (
                <CartBadge>
                  <CartBadgeText>
                    {cartCount > 99 ? '99+' : cartCount}
                  </CartBadgeText>
                </CartBadge>
              )}
            </TabBarIcon>
          );
        },
        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel focused={focused}>{children}</TabBarLabel>
        ),
        tabBarActiveTintColor: '#4CB7A5',
        tabBarInactiveTintColor: '#64748B',
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          height: 100,
          backgroundColor: '#F8FAFC',
          borderTopWidth: 0,
          paddingTop: 16,
          paddingBottom: 24,
          paddingHorizontal: 16,
          overflow: 'hidden',
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Categories" component={CategoryScreen} options={{ tabBarLabel: 'Categories' }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ tabBarLabel: 'Wishlist' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: 'Cart' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

function MainAppNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <MainStack.Screen name="ProductList" component={ProductListScreen} />
      <MainStack.Screen name="Checkout" component={CheckoutScreen} />
      <MainStack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      <MainStack.Screen name="OrderTracking" component={OrderTrackingScreen} />
    </MainStack.Navigator>
  );
}

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Temporarily set to true

  return (
    <NavigationContainer
      style={{ backgroundColor: '#FFFFFF' }}
      theme={{
        colors: {
          background: '#FFFFFF',
          primary: '#4CB7A5',
          card: '#FFFFFF',
          text: '#1E293B',
          border: '#E2E8F0',
          notification: '#E94F8A',
        },
        dark: false,
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          light: {
            fontFamily: 'System',
            fontWeight: '300',
          },
          thin: {
            fontFamily: 'System',
            fontWeight: '100',
          },
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={MainAppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
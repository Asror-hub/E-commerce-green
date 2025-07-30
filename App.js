import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#FFFFFF' }}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <WishlistProvider>
            <AppNavigator />
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

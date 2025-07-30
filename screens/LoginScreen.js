import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import TextInput from '../components/common/TextInput';
import PrimaryButton from '../components/common/PrimaryButton';
import OutlinedButton from '../components/common/OutlinedButton';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Header = styled.View`
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const LogoContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  ${({ theme }) => theme.typography.displaySmall};
  color: ${({ theme }) => theme.colors.onSurface};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  text-align: center;
  line-height: 24px;
`;

const FormContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const ForgotPasswordContainer = styled.View`
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ForgotPassword = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const ForgotPasswordText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outline};
`;

const DividerText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const SocialButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const SocialButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-horizontal: ${({ theme }) => theme.spacing.xs}px;
`;

const SocialButtonText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

const SignUpText = styled.Text`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const SignUpLink = styled.Text`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

export default function LoginScreen({ navigation, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      // Show error message
      console.log('Please enter email and password');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
    }, 1000);
  };

  const handleGuestAccess = () => {
    setIsAuthenticated(true);
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    console.log('Apple login');
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Header>
          <LogoContainer>
            <Feather name="shopping-bag" size={32} color="#fff" />
          </LogoContainer>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your account to continue shopping</Subtitle>
        </Header>
        
        <FormContainer>
          <TextInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail"
          />
          
          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock"
          />
          
          <ForgotPasswordContainer>
            <ForgotPassword>
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </ForgotPassword>
          </ForgotPasswordContainer>
          
          <PrimaryButton 
            onPress={handleLogin} 
            loading={loading}
            size="large"
          >
            Sign In
          </PrimaryButton>
        </FormContainer>

        <DividerContainer>
          <DividerLine />
          <DividerText>or continue with</DividerText>
          <DividerLine />
        </DividerContainer>

        <SocialButtonsContainer>
          <SocialButton onPress={handleGoogleLogin} activeOpacity={0.8}>
            <Feather name="chrome" size={20} color="#DB4437" />
            <SocialButtonText>Google</SocialButtonText>
          </SocialButton>
          <SocialButton onPress={handleAppleLogin} activeOpacity={0.8}>
            <Feather name="smartphone" size={20} color="#000" />
            <SocialButtonText>Apple</SocialButtonText>
          </SocialButton>
        </SocialButtonsContainer>

        <OutlinedButton 
          onPress={handleGuestAccess}
          size="large"
          icon="user"
        >
          Continue as Guest
        </OutlinedButton>

        <SignUpContainer>
          <SignUpText>Don't have an account?</SignUpText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <SignUpLink>Sign Up</SignUpLink>
          </TouchableOpacity>
        </SignUpContainer>
      </ScrollContainer>
    </Container>
  );
} 
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import TextInput from '../components/common/TextInput';
import PrimaryButton from '../components/common/PrimaryButton';
import OutlinedButton from '../components/common/OutlinedButton';
import Chip from '../components/common/Chip';

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

const GenderContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const GenderLabel = styled.Text`
  ${({ theme }) => theme.typography.labelLarge};
  color: ${({ theme }) => theme.colors.onSurface};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  font-weight: 600;
`;

const GenderChips = styled.View`
  flex-direction: row;
`;

const SignInContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

const SignInText = styled.Text`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const SignInLink = styled.Text`
  ${({ theme }) => theme.typography.bodyMedium};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

export default function RegisterScreen({ navigation, setIsAuthenticated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const handleRegister = () => {
    // TODO: Implement actual registration logic with validation
    if (name && email && password && confirmPassword && selectedGender) {
      if (password === confirmPassword) {
        setIsAuthenticated(true); // For demo, authenticate on register
      } else {
        console.log('Passwords do not match');
      }
    } else {
      console.log('Please fill all fields');
    }
  };

  const handleGuestAccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Header>
          <LogoContainer>
            <Feather name="user-plus" size={32} color="#fff" />
          </LogoContainer>
          <Title>Create Account</Title>
          <Subtitle>Sign up to get started with your shopping journey</Subtitle>
        </Header>
        
        <FormContainer>
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            leftIcon="user"
          />
          
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
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock"
          />
          
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon="lock"
          />
          
          <GenderContainer>
            <GenderLabel>Gender</GenderLabel>
            <GenderChips>
              <Chip
                selected={selectedGender === 'male'}
                onPress={() => setSelectedGender('male')}
                style={{ marginRight: 8 }}
              >
                Male
              </Chip>
              <Chip
                selected={selectedGender === 'female'}
                onPress={() => setSelectedGender('female')}
              >
                Female
              </Chip>
            </GenderChips>
          </GenderContainer>
          
          <PrimaryButton onPress={handleRegister} size="lg">
            Create Account
          </PrimaryButton>
        </FormContainer>
        
        <SignInContainer>
          <SignInText>Already have an account?</SignInText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <SignInLink>Sign In</SignInLink>
          </TouchableOpacity>
        </SignInContainer>

        <OutlinedButton 
          onPress={handleGuestAccess}
          size="lg"
          icon="user"
        >
          Continue as Guest
        </OutlinedButton>
      </ScrollContainer>
    </Container>
  );
} 
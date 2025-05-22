import { useAppDispatch } from '@/store/hooks';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { JwtPayload } from 'jwt-decode';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useLoginMutation, useRegisterMutation } from '../../api/authApi';
import { setCredentials } from '../../slice/authSlice';

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  role: string;
  email: string;
  fullName: string;
}

export default function LoginRegister() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await login({ email, password }).unwrap();
      console.log('Login result:', result);
      dispatch(setCredentials({ accessToken: result.message.data.accessToken, refreshToken: result.message.data.accessToken }));
      Alert.alert('Login Successfully', 'Welcome to Aloha.');
      router.push('/');
    } catch (error: any) {
      Alert.alert('Login Failed', error?.data?.title || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !name || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await register({ email, name, password, confirmPassword }).unwrap();
      setIsLogin(true);
    } catch (error: any) {
      Alert.alert('Registration Failed', error?.data?.title || 'Could not register');
    } finally {
      setIsLoading(false);
    }
  };

  const LoginForm = () => (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold text-center text-blue-500 mb-5">LOGIN</Text>
      
      <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-300 rounded-lg py-3 my-2">
        <AntDesign name="google" size={24} color="red" className="mr-2" />
        <Text className="text-sm">Login with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-300 rounded-lg py-3 my-2">
        <FontAwesome name="facebook-square" size={24} color="#4267B2" className="mr-2" />
        <Text className="text-sm">Login with Facebook</Text>
      </TouchableOpacity>
      
      <View className="flex-row items-center my-5">
        <View className="flex-1 h-px bg-gray-400" />
        <Text className="px-2 text-gray-400 text-sm">Or</Text>
        <View className="flex-1 h-px bg-gray-400" />
      </View>
      
      <View className="mb-4">
        <Text className="mb-1 text-sm">
          Email <Text className="text-red-500 font-bold">*</Text>
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-base"
          placeholder="name@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View className="mb-4">
        <Text className="mb-1 text-sm">
          Password <Text className="text-red-500 font-bold">*</Text>
        </Text>
        <View className="flex-row border border-gray-300 rounded-lg items-center">
          <TextInput
            className="flex-1 px-3 py-2 text-base"
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            className="px-3"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-outline" : "eye-off-outline"} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity className="items-end mb-4">
        <Text className="text-xs text-blue-500 underline">Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="bg-blue-500 rounded-lg py-3 items-center my-4"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-base font-medium">
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center my-4">
        <Text className="text-sm mr-1">New to Aloha?</Text>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text className="text-sm text-blue-500 underline">Register</Text>
        </TouchableOpacity>
      </View>
      
      <View className="items-center mt-5">
        <Text className="text-xs text-center">
          Having trouble logging in?{' '}
          <Text className="font-bold underline">Aloha Help Center</Text>
        </Text>
      </View>
      
      <View className="items-center mt-2">
        <Text className="text-xs text-center">
          This site is protected by reCAPTCHA Enterprise and the Google{' '}
          <Text className="font-bold underline">Privacy Policy and Terms of Service</Text> apply.
        </Text>
      </View>
    </View>
  );

  const RegisterForm = () => (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold text-center text-blue-500 mb-5">REGISTER</Text>
      
      <View className="mb-4">
        <Text className="mb-1 text-sm">
          Email <Text className="text-red-500 font-bold">*</Text>
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-base"
          placeholder="name@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View className="mb-4">
        <Text className="mb-1 text-sm">
          Username <Text className="text-red-500 font-bold">*</Text>
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-base"
          placeholder="Enter your username"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <View className="mb-4">
        <Text className="mb-1 text-sm">
          Password <Text className="text-red-500 font-bold">*</Text>
        </Text>
        <View className="flex-row border border-gray-300 rounded-lg items-center">
          <TextInput
            className="flex-1 px-3 py-2 text-base"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            className="px-3"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-outline" : "eye-off-outline"} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="mb-4">
        <Text className="mb-1 text-sm">
          Confirm Password <Text className="text-red-500 font-bold">*</Text>
        </Text>
        <View className="flex-row border border-gray-300 rounded-lg items-center">
          <TextInput
            className="flex-1 px-3 py-2 text-base"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            className="px-3"
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Ionicons 
              name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        className="bg-blue-500 rounded-lg py-3 items-center my-4"
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-white text-base font-medium">
          {loading ? "Loading..." : "Register"}
        </Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center my-4">
        <Text className="text-sm mr-1">Already have an account?</Text>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text className="text-sm text-blue-500 underline">Login</Text>
        </TouchableOpacity>
      </View>
      
      <View className="items-center mt-5">
        <Text className="text-xs text-center">
          Having trouble logging in?{' '}
          <Text className="font-bold underline">Aloha Help Center</Text>
        </Text>
      </View>
      
      <View className="items-center mt-2">
        <Text className="text-xs text-center">
          This site is protected by reCAPTCHA Enterprise and the Google{' '}
          <Text className="font-bold underline">Privacy Policy and Terms of Service</Text> apply.
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white pt-16"
    >
      <ScrollView className="flex-grow">
        <View className="flex-1 flex-col">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
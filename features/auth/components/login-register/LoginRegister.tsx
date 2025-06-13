import { useAppDispatch } from '@/store/hooks'
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { JwtPayload } from 'jwt-decode'
import React, { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useLoginMutation, useRegisterMutation } from '../../api/authApi'
import { setCredentials } from '../../slice/authSlice'
import LoginSuccessModal from '../login-success-modal/LoginSuccessModal'
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign'

interface CustomJwtPayload extends JwtPayload {
  sub: string
  role: string
  email: string
  fullName: string
}

export default function LoginRegister() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [userFullName, setUserFullName] = useState('')

  const { safeAreaInsets, isSmallScreen } = useResponsiveDesign()
  const rememberMe = true
  const [login] = useLoginMutation()
  const [register] = useRegisterMutation()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await login({
        email,
        password,
        rememberMe
      }).unwrap()
      console.log('Login result:', result)
      dispatch(
        setCredentials({
          accessToken: result.message.data.accessToken,
          refreshToken: result.message.data.accessToken
        })
      )
      setUserFullName(result.message.data.fullName || 'Aloha')
      setShowSuccessModal(true)
    } catch (error: any) {
      Alert.alert('Login Failed', error?.data?.title || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!email || !name || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.')
      return
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.')
      return
    }
    setIsLoading(true)
    try {
      const res = await register({ name, email, password, confirmPassword }).unwrap()
      console.log('register: ', res)
      setIsLogin(true)
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error?.data?.title || 'Could not register'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const LoginForm = () => (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header with back button */}
      <View 
        className="flex-row items-center px-6 py-4"
        style={{ paddingTop: safeAreaInsets.top + 16 }}
      >
        <TouchableOpacity 
          onPress={() => {
            if (router.canGoBack()) {
              router.back()
            } else {
              router.push('/')
            }
          }}
          className="mr-4"
        >
          <Feather name="arrow-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">Login</Text>
      </View>

      <ScrollView 
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className={`flex-1 ${isSmallScreen ? 'px-6' : 'px-8'} pt-8`}>
          
          {/* Profile Avatar with Gradient */}
          <View className="items-center mb-8">
            <LinearGradient
              colors={['#3b82f6', '#06b6d4', '#10b981']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: isSmallScreen ? 80 : 96,
                height: isSmallScreen ? 80 : 96,
                borderRadius: isSmallScreen ? 40 : 48,
              }}
              className="items-center justify-center mb-6"
            >
              <MaterialIcons name="person" size={isSmallScreen ? 36 : 44} color="white" />
            </LinearGradient>
            
            <Text className={`${isSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-center text-blue-600 mb-2`}>
              Welcome Back
            </Text>
            <Text className={`${isSmallScreen ? 'text-sm' : 'text-base'} text-center text-gray-600 px-4`}>
              Sign in to continue your Vietnamese adventure
            </Text>
          </View>

          {/* Social Login Buttons */}
          <View className="mb-6">
            <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-4 mb-3 shadow-sm">
              <AntDesign name="google" size={20} color="#db4437" />
              <Text className="ml-3 text-base font-medium text-gray-700">Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-4 mb-6 shadow-sm">
              <FontAwesome name="facebook" size={20} color="#4267b2" />
              <Text className="ml-3 text-base font-medium text-gray-700">Continue with Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="px-4 text-gray-500 text-sm">Or login with email</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Email Address</Text>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4 shadow-sm">
              <MaterialIcons name="email" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: '#1f2937' }}
                placeholder="your.email@example.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity>
                <MaterialIcons name="mic" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm font-medium text-gray-700">Password</Text>
              <TouchableOpacity>
                <Text className="text-sm text-blue-500">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4 shadow-sm">
              <MaterialIcons name="lock" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: '#1f2937' }}
                placeholder="••••••"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <MaterialIcons name="fingerprint" size={20} color="#9ca3af" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setPasswordVisible(!passwordVisible)}
                className="ml-2"
              >
                <Ionicons
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className="bg-blue-500 rounded-xl py-4 items-center mt-6 shadow-lg"
            style={{
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Text className="text-white text-lg font-semibold">
              {loading ? 'Signing in...' : 'Login'}
            </Text>
          </TouchableOpacity>



          {/* Bottom Section */}
          <View 
            className="mt-auto pt-8"
            style={{ paddingBottom: safeAreaInsets.bottom + 32 }}
          >
            <View className="bg-gray-100 rounded-xl p-4 mb-4">
              <Text className="text-gray-800 font-medium mb-2">New to Aloha Vietnam?</Text>
              <Text className="text-gray-600 text-sm mb-4">Create an account to start your adventure</Text>
              <TouchableOpacity 
                onPress={() => setIsLogin(false)}
                className="flex-row items-center"
              >
                <Text className="text-blue-500 font-medium mr-2">Sign Up</Text>
                <Feather name="arrow-right" size={16} color="#3b82f6" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {showSuccessModal && (
        <LoginSuccessModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          userName={userFullName}
        />
      )}
    </SafeAreaView>
  )

  const RegisterForm = () => (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header with back button */}
      <View 
        className="flex-row items-center px-6 py-4"
        style={{ paddingTop: safeAreaInsets.top + 16 }}
      >
        <TouchableOpacity 
          onPress={() => {
            if (router.canGoBack()) {
              router.back()
            } else {
              router.push('/')
            }
          }}
          className="mr-4"
        >
          <Feather name="arrow-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">Register</Text>
      </View>

      <ScrollView 
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className={`flex-1 ${isSmallScreen ? 'px-6' : 'px-8'} pt-8`}>
          
          {/* Profile Avatar with Gradient */}
          <View className="items-center mb-8">
            <LinearGradient
              colors={['#10b981', '#06b6d4', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: isSmallScreen ? 80 : 96,
                height: isSmallScreen ? 80 : 96,
                borderRadius: isSmallScreen ? 40 : 48,
              }}
              className="items-center justify-center mb-6"
            >
              <MaterialIcons name="person-add" size={isSmallScreen ? 36 : 44} color="white" />
            </LinearGradient>
            
            <Text className={`${isSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-center text-green-600 mb-2`}>
              Join Aloha
            </Text>
            <Text className={`${isSmallScreen ? 'text-sm' : 'text-base'} text-center text-gray-600 px-4`}>
              Create your account to start exploring Vietnam
            </Text>
          </View>

          {/* Name Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Full Name</Text>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4 shadow-sm">
              <MaterialIcons name="person" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: '#1f2937' }}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Email Address</Text>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4 shadow-sm">
              <MaterialIcons name="email" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: '#1f2937' }}
                placeholder="your.email@example.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Password</Text>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4 shadow-sm">
              <MaterialIcons name="lock" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: '#1f2937' }}
                placeholder="Create a strong password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Ionicons
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-medium text-gray-700">Confirm Password</Text>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4 shadow-sm">
              <MaterialIcons name="lock" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-base"
                style={{ color: '#1f2937' }}
                placeholder="Confirm your password"
                placeholderTextColor="#9ca3af"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                <Ionicons
                  name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className="bg-green-500 rounded-xl py-4 items-center shadow-lg"
            style={{
              shadowColor: '#10b981',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Text className="text-white text-lg font-semibold">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text className="text-green-500 font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing */}
          <View style={{ paddingBottom: safeAreaInsets.bottom + 32 }} />
        </View>
      </ScrollView>

      {showSuccessModal && (
        <LoginSuccessModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          userName={userFullName}
        />
      )}
    </SafeAreaView>
  )

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </KeyboardAvoidingView>
  )
}

import { useState, useEffect } from 'react'
import { Dimensions, ScaledSize } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ResponsiveValues {
  width: number
  height: number
  isSmallScreen: boolean
  isMediumScreen: boolean
  isLargeScreen: boolean
  safeAreaInsets: {
    top: number
    bottom: number
    left: number
    right: number
  }
  // Dynamic spacing based on screen size
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  // Dynamic font sizes
  fontSize: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
}

export function useResponsiveDesign(): ResponsiveValues {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'))
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
      setDimensions(window)
    })

    return () => subscription?.remove()
  }, [])

  const { width, height } = dimensions

  // Screen size categories
  const isSmallScreen = width < 380
  const isMediumScreen = width >= 380 && width < 600
  const isLargeScreen = width >= 600

  // Dynamic spacing based on screen size
  const baseSpacing = isSmallScreen ? 8 : isMediumScreen ? 12 : 16
  const spacing = {
    xs: baseSpacing * 0.5,
    sm: baseSpacing,
    md: baseSpacing * 1.5,
    lg: baseSpacing * 2,
    xl: baseSpacing * 3
  }

  // Dynamic font sizes
  const baseFontSize = isSmallScreen ? 14 : isMediumScreen ? 16 : 18
  const fontSize = {
    xs: baseFontSize * 0.75,
    sm: baseFontSize * 0.875,
    md: baseFontSize,
    lg: baseFontSize * 1.125,
    xl: baseFontSize * 1.25
  }

  return {
    width,
    height,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    safeAreaInsets: insets,
    spacing,
    fontSize
  }
} 
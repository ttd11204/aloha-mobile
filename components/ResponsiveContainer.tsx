import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
  useSafeArea?: boolean
  includeTabBar?: boolean
}

export default function ResponsiveContainer({
  children,
  className = '',
  style = {},
  useSafeArea = false,
  includeTabBar = false
}: ResponsiveContainerProps) {
  const insets = useSafeAreaInsets()
  const { isSmallScreen } = useResponsiveDesign()

  const containerStyle: ViewStyle = {
    flex: 1,
    ...(useSafeArea && {
      paddingTop: insets.top,
      paddingBottom: includeTabBar ? insets.bottom + 60 : insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }),
    ...style
  }

  const responsiveClassName = [
    className,
    isSmallScreen ? 'px-4' : 'px-6'
  ].filter(Boolean).join(' ')

  return (
    <View className={responsiveClassName} style={containerStyle}>
      {children}
    </View>
  )
} 
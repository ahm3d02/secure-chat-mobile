import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  useColorScheme,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type PressableStateCallbackType,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

export const ThemedButton = ({
  title,
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          container: isDark ? styles.secondaryDark : styles.secondaryLight,
          text: isDark ? styles.textSecondaryDark : styles.textSecondaryLight,
          indicator: isDark ? '#FFFFFF' : '#171717',
        };
      case 'outline':
        return {
          container: {
            ...styles.outlineBase,
            borderColor: isDark ? '#525252' : '#e5e5e5',
            backgroundColor: 'transparent',
          },
          text: { color: isDark ? '#FAFAFA' : '#171717' },
          indicator: isDark ? '#FAFAFA' : '#171717',
        };
      case 'danger':
        return {
          container: styles.danger,
          text: styles.textLight,
          indicator: '#FFFFFF',
        };
      case 'primary':
      default:
        return {
          container: isDark ? styles.primaryDark : styles.primaryLight,
          text: isDark ? styles.textPrimaryDark : styles.textPrimaryLight,
          indicator: isDark ? '#171717' : '#FFFFFF',
        };
    }
  };

  const theme = getVariantStyles();

  return (
    <Pressable
      disabled={disabled || isLoading}
      style={(state: PressableStateCallbackType) => {
        const incomingStyle = typeof style === 'function' ? style(state) : style;
        
        return [
          styles.base,
          theme.container,
          state.pressed && styles.pressed,
          disabled && styles.disabled,
          incomingStyle,
        ];
      }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.indicator} />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text style={[styles.textBase, theme.text, textStyle]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.5,
  },
  textBase: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
  
  primaryLight: { backgroundColor: '#171717' },
  primaryDark: { backgroundColor: '#fafafa' },
  textPrimaryLight: { color: '#fafafa' },
  textPrimaryDark: { color: '#171717' },
  
  secondaryLight: { backgroundColor: '#e5e5e5' },
  secondaryDark: { backgroundColor: '#262626' },
  textSecondaryLight: { color: '#171717' },
  textSecondaryDark: { color: '#fafafa' },
  
  outlineBase: { borderWidth: 1 },
  
  danger: { backgroundColor: '#ef4444' },
  textLight: { color: '#FFFFFF' },
});
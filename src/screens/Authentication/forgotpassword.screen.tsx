import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

import { StatusBar }           from 'expo-status-bar'
import { useForm, Controller } from 'react-hook-form'
import { Platform }            from 'react-native'

import Toast from 'react-native-toast-message'

import { Ionicons } from '@expo/vector-icons'

import { Block, Button,  Input,  Text }             from '../../components/ui'
import { email as EMAIL_REGEX }                     from '../../constants/regex'
import {  ForgotPasswordFormData, NavigationProps } from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'

const isAndroid = Platform.OS === 'android'

const ForgotPasswordScreen = () => {
  const { handleSubmit, control, formState: { errors, isValid } } = useForm<ForgotPasswordFormData>()
  const { colors, sizes }                                         = useTheme()
  const navigation                                                = useNavigation<NavigationProps>()

  const { auth: { isLoading, isLoggedIn, error } } = useStoreState((state) => state)
  const { forgotPassword }                         = useStoreActions((actions) => actions.auth)

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Main', { screen: 'Home' })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (error) {
      handleError(error)
    }
  }, [error])

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data)
  }

  const handleError = (error: any) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: error?.data?.message || error || 'Something went wrong',
      visibilityTime: 4000
    })
  }

  return (
    <Block white paddingTop={sizes.xxl * 2} paddingBottom={sizes.xxl} paddingHorizontal={sizes.md}>
      <StatusBar style='dark' />

      {/* signin form */}
      <Block
        keyboard
        white
        behavior={!isAndroid ? 'padding' : 'height'}>
        <Block
          flex={0}
          justify='center'
        >
          <Block
            radius={sizes.sm}
            overflow="hidden"
            paddingVertical={sizes.sm}
          >
            {/* form title */}
            <Block align='center' justify='center' marginBottom={sizes.sm}>
              <Block flex={1} primary radius={sizes.base * 5} align='center' justify='center' padding={sizes.sm} height={sizes.base * 10} width={sizes.base * 10}>
                <Ionicons name="mail-unread" size={sizes.l} color={colors.white} />
              </Block>
              <Text h3 semibold center primary> Password Recovery </Text>

            </Block>

            {/* form inputs */}
            <Block paddingHorizontal={sizes.xs}>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: 'Email is required' },
                  pattern: { value: EMAIL_REGEX, message: 'Not a valid email' }
                }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    value={value}
                    keyboardType="email-address"
                    placeholder='Email Address'
                    danger={Boolean(errors?.email)}
                    message={errors?.email?.message?.toString()}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />

            </Block>
            <Button
              primary
              shadow={!isAndroid}
              marginVertical={sizes.s}
              disabled={isLoading || isValid}
              onPress={handleSubmit(onSubmit)}
            >
              <Text bold white >
                  Send Reset Link
              </Text>
            </Button>

            <Block row justify='space-between'>
              <Button
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text bold underlined>
                    Try Sign In?
                </Text>
              </Button>

            </Block>
          </Block>
        </Block>
      </Block>
    </Block >
  )
}

export default ForgotPasswordScreen

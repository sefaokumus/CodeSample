import React, { useRef } from 'react'

import { useNavigation } from '@react-navigation/native'

import { StatusBar }           from 'expo-status-bar'
import { useForm, Controller } from 'react-hook-form'
import { Platform }            from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { Block, Button, Input, Text }      from '../../components/ui'
import { WINDOW_WIDTH }                    from '../../constants'
import { email as EMAIL_REGEX }            from '../../constants/regex'
import { SignUpFormData, NavigationProps } from '../../constants/types'
import { useTheme }                        from '../../hooks'

const isAndroid = Platform.OS === 'android'

const SignUpScreen = () => {
  const { handleSubmit, control, watch, formState: { errors } } = useForm<SignUpFormData>()

  const passwordRef   = useRef({})
  passwordRef.current = watch('password', '')

  const { colors, sizes } = useTheme()
  const navigation        = useNavigation<NavigationProps>()

  const onSubmit = (data: SignUpFormData) => {
    navigation.navigate('Main', { screen: 'Home' })
  }

  return (
    <Block primary paddingTop={sizes.xxl * 2} paddingBottom={sizes.xxl} paddingHorizontal={sizes.md}>
      <StatusBar style='light' />
      <Block paddingHorizontal={sizes.s} >

        {/* signup form */}
        <Block
          keyboard
          white
          radius={sizes.sm}
          shadow
          behavior={!isAndroid ? 'padding' : 'height'}>
          <Block
            flex={0}
            marginHorizontal="8%"
            justify='center'
            align='center'
          >
            <Block
              radius={sizes.sm}
              overflow="hidden"
              align='center'
              paddingVertical={sizes.sm}>

              <Block >
                {/* form title */}
                <Block align='center' justify='center' marginBottom={sizes.sm}>
                  <Block flex={1} primary radius={sizes.base * 5} align='center' justify='center' padding={sizes.sm} height={sizes.base * 10} width={sizes.base * 10}>
                    <Ionicons name="lock-closed" size={sizes.l} color={colors.white} />
                  </Block>
                  <Text h3 semibold center primary> Sign Up </Text>

                </Block>

                {/* form inputs */}
                <Block style={{ minWidth: WINDOW_WIDTH * 0.7 }} paddingHorizontal={sizes.s}>
                  <Controller
                    control={control}
                    rules={{
                      required: { value: true, message: 'Username is required' }
                    }}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        autoCapitalize="none"
                        marginBottom={sizes.m}
                        value={value}
                        keyboardType="default"
                        placeholder='Username'
                        danger={Boolean(errors?.email)}
                        message={errors?.email?.message?.toString()}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                  />

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

                  <Controller
                    rules={{
                      required: { value: true, message: 'Password is required' }
                    }}
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        secureTextEntry
                        autoCapitalize="none"
                        marginBottom={sizes.m}
                        placeholder={'Password'}
                        value={value}
                        onChangeText={(value) => onChange(value)}
                        onBlur={onBlur}
                        danger={Boolean(errors?.password)}
                        message={errors?.password?.message?.toString()}
                      />
                    )}
                  />

                  <Controller
                    rules={{
                      required: { value: true, message: 'Confirm Password is required' },
                      validate: (value) => value === passwordRef.current || 'Passwords do not match'
                    }}
                    name="confirm"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        secureTextEntry
                        autoCapitalize="none"
                        marginBottom={sizes.m}
                        placeholder={'Confirm Password'}
                        value={value}
                        onChangeText={(value) => onChange(value)}
                        onBlur={onBlur}
                        danger={Boolean(errors?.confirm)}
                        message={errors?.confirm?.message?.toString()}
                      />
                    )}
                  />

                </Block>
                <Button
                  primary
                  outlined
                  shadow={!isAndroid}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text bold primary >
                    Sign Up
                  </Text>
                </Button>

                <Button
                  shadow={!isAndroid}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  onPress={() => navigation.navigate('SignIn')}
                >
                  <Text bold underlined>
                    Already Registered?
                  </Text>
                </Button>

              </Block>

            </Block>
          </Block>
        </Block>
      </Block >
    </Block >
  )
}

export default SignUpScreen

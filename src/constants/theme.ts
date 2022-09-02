import { Dimensions, Platform } from 'react-native'

import {
  ICommonTheme,
  // ThemeAssets,
  ThemeFonts,
  // ThemeIcons,
  ThemeLineHeights,
  ThemeWeights
} from './types'

const { width, height } = Dimensions.get('window')

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
  text: 'normal',
  h1: Platform.OS === 'ios' ? '700' : 'normal',
  h2: Platform.OS === 'ios' ? '700' : 'normal',
  h3: Platform.OS === 'ios' ? '700' : 'normal',
  h4: Platform.OS === 'ios' ? '700' : 'normal',
  h5: Platform.OS === 'ios' ? '600' : 'normal',
  p: 'normal',

  thin: Platform.OS === 'ios' ? '100' : 'normal',
  extralight: Platform.OS === 'ios' ? '200' : 'normal',
  light: Platform.OS === 'ios' ? '300' : 'normal',
  normal: Platform.OS === 'ios' ? '400' : 'normal',
  medium: Platform.OS === 'ios' ? '500' : 'normal',
  semibold: Platform.OS === 'ios' ? '600' : 'normal',
  bold: Platform.OS === 'ios' ? '700' : 'normal',
  extrabold: Platform.OS === 'ios' ? '800' : 'normal',
  black: Platform.OS === 'ios' ? '900' : 'normal'
}

export const ICONS = {
  // apple: require('../assets/icons/apple.png'),
  // google: require('../assets/icons/google.png'),
  // facebook: require('../assets/icons/facebook.png'),
  // arrow: require('../assets/icons/arrow.png'),
  // articles: require('../assets/icons/articles.png'),
  // basket: require('../assets/icons/basket.png'),
  // bell: require('../assets/icons/bell.png'),
  // calendar: require('../assets/icons/calendar.png'),
  // chat: require('../assets/icons/chat.png'),
  // check: require('../assets/icons/check.png'),
  // clock: require('../assets/icons/clock.png'),
  // close: require('../assets/icons/close.png'),
  // components: require('../assets/icons/components.png'),
  // document: require('../assets/icons/document.png'),
  // documentation: require('../assets/icons/documentation.png'),
  // extras: require('../assets/icons/extras.png'),
  // flight: require('../assets/icons/flight.png'),
  // home: require('../assets/icons/home.png'),
  // hotel: require('../assets/icons/hotel.png'),
  // image: require('../assets/icons/image.png'),
  // location: require('../assets/icons/location.png'),
  // menu: require('../assets/icons/menu.png'),
  // more: require('../assets/icons/more.png'),
  // notification: require('../assets/icons/notification.png'),
  // office: require('../assets/icons/office.png'),
  // payment: require('../assets/icons/payment.png'),
  // profile: require('../assets/icons/profile.png'),
  // register: require('../assets/icons/register.png'),
  // rental: require('../assets/icons/rental.png'),
  // search: require('../assets/icons/search.png'),
  // settings: require('../assets/icons/settings.png'),
  // star: require('../assets/icons/star.png'),
  // train: require('../assets/icons/train.png'),
  // users: require('../assets/icons/users.png'),
  // warning: require('../assets/icons/warning.png'),
}

export const ASSETS: any = {
  // backgrounds/logo
  // logo: require('../assets/images/logo.png'),
  // header: require('../assets/images/header.png'),
  // background: require('../assets/images/background.png'),
  // ios: require('../assets/images/ios.png'),
  // android: require('../assets/images/android.png')
}

export const FONTS: ThemeFonts = {
  // based on font size
  text: 'Roboto_400Regular',
  h1: 'Roboto_700Bold',
  h2: 'Roboto_700Bold',
  h3: 'Roboto_700Bold',
  h4: 'Roboto_700Bold',
  h5: 'Roboto_500Medium',
  p: 'Roboto_400Regular',

  // based on fontWeight
  thin: 'Roboto_300Light',
  extralight: 'Roboto_300Light',
  light: 'Roboto_300Light',
  normal: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  semibold: 'Roboto_500Medium',
  bold: 'Roboto_700Bold',
  extrabold: 'Roboto_900Black',
  black: 'Roboto_900Black'
}

export const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22
}

export const THEME: ICommonTheme = {
  icons: ICONS,
  assets: { ...ICONS, ...ASSETS },
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: { width, height }
}

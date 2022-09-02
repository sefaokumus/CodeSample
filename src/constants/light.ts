import { THEME as commonTheme }                          from './theme'
import { ITheme, ThemeColors, ThemeSizes, ThemeSpacing } from './types'

export const COLORS: ThemeColors = {
  // default text color
  text: '#000000', // '#252F40',

  // base colors
  /** UI color for #primary */
  primary: '#795548',
  /** UI color for #secondary */
  secondary: '#009688',
  /** UI color for #tertiary */
  tertiary: '#5260ff',

  // non-colors
  black: '#000000',
  white: '#FFFFFF',

  dark: '#252F40',
  light: '#E9ECEF',

  // gray variations
  /** UI color for #gray */
  gray: '#A7A8AE',
  lightGray: '#D3D3D3',

  // colors variations
  /** UI color for #danger */
  danger: '#eb445a',
  /** UI color for #warning */
  warning: '#ffc409',
  /** UI color for #success */
  success: '#2dd36f',
  /** UI color for #info */
  info: '#17C1E8',

  /** UI colors for navigation & card */
  card: '#FFFFFF',
  background: '#FFFFFF',

  /** UI color for shadowColor */
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
  primaryOverlay: 'rgba(121, 85, 72, 0.5)',

  /** UI color for input borderColor on focus */
  focus: '#795548',
  input: '#826055',

  /** UI color for switch checked/active color */
  switchOn: '#3A416F',
  switchOff: '#E9ECEF',

  /** UI color for checkbox icon checked/active color */
  checkbox: ['#3A416F', '#141727'],
  checkboxIcon: '#FFFFFF',

  /** icon tint color */
  icon: '#795548'
}

export const SIZES: ThemeSizes = {
  // global sizes
  base: 8,
  text: 12,
  radius: 8,
  padding: 8,

  // font sizes
  h1: 44,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 18,
  p: 14,

  // button sizes
  buttonBorder: 1,
  buttonRadius: 8,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 1,
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,

  // input sizes
  inputHeight: 46,
  inputBorder: 1,
  inputRadius: 8,
  inputPadding: 12,

  // card sizes
  cardRadius: 16,
  cardPadding: 10,

  // image sizes
  imageRadius: 14,
  avatarSize: 48,
  avatarRadius: 24,
  sliderImageSize: 320,
  sliderImageRadius: 16,

  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  // product link size
  linkSize: 12,

  // badge sizes
  badgeSmallSize: 22,
  badgeSmallRadius: 11,

  badgeLargeSize: 30,
  badgeLargeRadius: 15,

  /** font size multiplier: for maxFontSizeMultiplier prop */
  multiplier: 2
}

export const SPACING: ThemeSpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7
}

export const THEME: ITheme = {
  ...commonTheme,
  colors: COLORS,
  sizes: { ...SIZES, ...commonTheme.sizes, ...SPACING }
}

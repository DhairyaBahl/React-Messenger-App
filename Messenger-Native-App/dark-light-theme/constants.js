import themes from './themes'

// eslint-disable-next-line max-len
const isLightTheme = (theme, colorName) => (theme === 'light' ? themes.primary.colors[colorName] : themes.primaryDark.colors[colorName])

export default {
  isLightTheme,
}

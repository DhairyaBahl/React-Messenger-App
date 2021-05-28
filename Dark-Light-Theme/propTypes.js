import { bool, string, shape } from 'prop-types'

const themePropTypes = shape({
  colors: shape({
    accent: string,
    primary: string,
    error: string,
    disabled: string,
    background: string,
    surface: string,
  }),
  dark: bool,
})

export default {
  themePropTypes,
}

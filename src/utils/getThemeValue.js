import get from 'lodash/get'
import { DefaultTheme } from 'styled-components'

const getThemeValue = (path, fallback) => (theme) => get(theme, path, fallback)

export default getThemeValue

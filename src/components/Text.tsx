import styled, { DefaultTheme } from 'styled-components'

import { space, typography, layout, LayoutProps, SpaceProps, TypographyProps } from 'styled-system'

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string
  fontSize?: string
  bold?: boolean
  small?: boolean
  ellipsis?: boolean
  lines?: number
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
}

interface ThemedProps extends TextProps {
  theme: DefaultTheme
}

const getFontSize = ({ fontSize, small }: TextProps) => {
  return small ? '14px' : fontSize || '16px'
}

const Text = styled.div<TextProps>`
  color: ${({ color }) => color ?? '#01142a'};
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  font-family: 'SF Pro Display';
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ ellipsis }) =>
    ellipsis &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}

  ${({ lines }) =>
    `-webkit-line-clamp: ${lines ?? 0};
    line-clamp: ${lines ?? 0};
    display: -webkit-box;
    white-space: ${lines ? 'normal' : 'none'};
    -webkit-box-orient: vertical;`}

  ${space}
  ${typography}
  ${layout}
`

Text.defaultProps = {
  color: 'text',
  small: false,
  ellipsis: false,
}

export default Text

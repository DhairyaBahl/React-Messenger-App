import React, { useEffect } from 'react';
import WebFont from 'webfontloader'

interface Props extends LoaderProps {
  children: JSX.Element | JSX.Element[]
}

const Font = (props: Props): JSX.Element => {
  return (
    <div style={styleGen(props)}>
      <FontLoader {...props} />
      {props.children}
    </div>
  )
}

interface TextProps extends LoaderProps {
  children: string
}

export const Text = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > &
    TextProps
): JSX.Element => {
  return (
    <p
      {...{
        ...Object.keys(props).reduce((object, key) => {
          if (
            ![
              'family',
              'italic',
              'weight',
              'onLoad',
              'onError',
              'onAllLoad',
              'onAllError'
            ].includes(key)
          ) {
            object[key] = props[key]
          }
          return object
        }, {})
      }} // pass props but remove font props
      style={{ ...styleGen(props), ...props.style }} // combine the font style and any custom style from props
    >
      <FontLoader {...props} text={props.children} />
      {props.children}
    </p>
  )
}

interface LoaderProps extends FontProps {
  provider?: string
  onLoad?: (family: string, style: string) => void
  onError?: (family: string, style: string) => void
  onAllLoad?: () => void
  onAllError?: () => void
  text?: string
}

export const FontLoader = ({
  family,
  weight = 400,
  italic = false,
  provider = 'google',
  onLoad = () => {},
  onError = () => {},
  onAllLoad = () => {},
  onAllError = () => {},
  text = undefined
}: LoaderProps): JSX.Element | null => {
  useEffect(() => {
    const WebFontConfig: WebFont.Config = {
      classes: false,
      fontactive: onLoad,
      fontinactive: onError,
      active: onAllLoad,
      inactive: onAllError
    }

    if (provider === 'google') {
      const fontFamily = GoogleFont({
        family,
        weight,
        italic
      })
      WebFontConfig.google = {
        families: [fontFamily],
        text
      }
    } else if (provider === 'local') {
      WebFontConfig.custom = {
        families: [family]
      }
    }

    WebFont.load(WebFontConfig)
  }, [family, weight, italic, provider, onLoad, onError])

  return null
}

const GoogleFont = ({ family, weight = 400, italic = false }: FontProps) => {
  let encodedURL = encodeURIComponent(family)

  if (weight !== 400 && italic) {
    encodedURL += `:bi`
  } else if (weight !== 400) {
    encodedURL += `:${weight}`
  } else if (italic) {
    encodedURL += `:i`
  }

  return encodedURL
}

interface FontProps {
  family: string
  weight?: number
  italic?: boolean
}

const styleGen = ({ family, italic, weight }: FontProps) => {
  return {
    fontFamily: `'${family}'`,
    fontStyle: italic ? 'italic' : undefined,
    fontWeight: weight
  }
}

export default Font

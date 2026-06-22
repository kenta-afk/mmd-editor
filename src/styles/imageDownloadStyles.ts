import { css } from '../../styled-system/css'

export const containerStyle = css({
  display: 'grid',
  gap: '3',
  width: 'full',
})

export const diagramWrapperStyle = css({
  width: 'full',
  overflow: 'auto',
  borderWidth: '1px',
  borderColor: 'gray.200',
  borderRadius: 'md',
  bg: 'white',
  p: '4',
})

export const downloadButtonStyle = css({
  justifySelf: 'start',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2',
  px: '4',
  py: '2',
  rounded: 'md',
  bg: 'blue.600',
  color: 'white',
  fontWeight: 'semibold',
  transitionDuration: 'normal',
  transitionProperty: 'common',
  _hover: {
    bg: 'blue.700',
  },
  _disabled: {
    bg: 'gray.400',
    cursor: 'not-allowed',
    opacity: 0.8,
  },
})

export const errorTextStyle = css({
  color: 'red.600',
  fontSize: 'sm',
})

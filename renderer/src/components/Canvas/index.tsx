import React from 'react'

import { useCanvas } from '../../hooks'
import { CanvasProps } from './types'

export const Canvas = (props: CanvasProps) => {
  const { draw, options, ...rest } = props

  const canvasRef = useCanvas(draw, { ...options })

  return <canvas ref={canvasRef} {...rest} />
}

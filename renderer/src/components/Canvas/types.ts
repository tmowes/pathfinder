import { CanvasHTMLAttributes } from 'react'

import { Draw, Options } from '../../hooks/useCanvas/types'

export type CanvasProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
  draw: Draw
  options?: Options
}

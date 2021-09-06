import { useRef, useEffect } from 'react'

import { Draw, Options } from './types'

export const useCanvas = (draw: Draw, options = {} as Options) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext(options?.context || '2d')
    let frameCount = 0
    let animationFrameId: number
    const render = () => {
      frameCount += 1
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, options?.context])

  return canvasRef
}

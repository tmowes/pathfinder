import { useCallback, useEffect, useState } from 'react'

import { Flex } from '@chakra-ui/react'

import * as C from '../components'
import { create2DMatrix } from '../utils/create2DMatrix'
import { mainAStar } from '../utils/algorithms/aStar'
import { Node } from '../utils/algorithms/aStar/types'

const FPS = 60

const cols = Math.floor(140 * 2)
const rows = Math.floor(70 * 2)
// 002450 / 2 avg 0.004seconds
// 009800 * 1 avg 0.026seconds
// 039200 * 2 avg 0.26seconds
// 088200 * 3 avg 0.9seconds
// 156800 * 4 avg 3.2seconds
// 245000 * 5 avg 7.0seconds

const CANVAS_WIDTH = 1400
const CANVAS_HEIGHT = 700

const TILE_WIDTH = Math.floor(CANVAS_WIDTH / cols)
const TILE_HEIGHT = Math.floor(CANVAS_HEIGHT / rows)

const gridColors = {
  isWall: '#1c1c1c',
  isEmpty: '#99999',
}

export default function Home() {
  const [grid, setGrid] = useState<Node[][]>([])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      grid.flat().forEach(cell => {
        const color =
          (cell.isShortest && 'orangered') ||
          (cell.isWall && 'black') ||
          (cell.isStart && 'red') ||
          (cell.isFinish && 'green') ||
          (cell.isVisited && 'dodgerblue') ||
          'gray'
        ctx.fillStyle = color
        ctx.fillRect(
          cell.col * TILE_WIDTH,
          cell.row * TILE_HEIGHT,
          TILE_WIDTH,
          TILE_HEIGHT
        )
      })
      ctx.fill()
    },
    [grid]
  )

  useEffect(() => {
    setGrid(create2DMatrix(cols, rows))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      mainAStar(grid)
    }, 1000 / 5)
    return () => clearInterval(interval)
  }, [grid])

  return (
    <Flex w="100%" h="100%" direction="column" align="center">
      <C.Canvas
        draw={draw}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ borderWidth: 20, borderColor: 'black' }}
      />
    </Flex>
  )
}

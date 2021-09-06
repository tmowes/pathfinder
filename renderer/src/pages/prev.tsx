import { useCallback, useEffect, useState } from 'react'

import { Button, Flex, VStack } from '@chakra-ui/react'

import * as C from '../components'
import { Node } from '../utils/algorithms/dijkstra/types'
import { dijkstra, getNodesInShortestPathOrder } from '../utils/algorithms/dijkstra'

const NUM_COLS = Math.floor(48 * 2.85 * 1.5)
const NUM_ROWS = Math.floor(27 * 2.05 * 1.5)

const START_NODE_ROW = 3
const START_NODE_COL = 3
const FINISH_NODE_ROW = Math.floor(Math.random() * NUM_ROWS) ?? 25
const FINISH_NODE_COL = Math.floor(Math.random() * NUM_COLS) ?? 45

export default function Home() {
  const [mouseIsPressed, setMouseIsPressed] = useState(false)
  const [grid, setGrid] = useState<Node[][]>([])
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const getNewGridWithWallToggled = (row: number, col: number) =>
    grid.map(item =>
      item.map(node => {
        if (node.col === col && node.row === row) {
          return {
            ...node,
            isWall: !node.isWall,
          }
        }
        return node
      })
    )

  function handleMouseDown(row: number, col: number) {
    const newGrid = getNewGridWithWallToggled(row, col)
    setMouseIsPressed(true)
    setGrid(newGrid)
  }

  function handleMouseEnter(row: number, col: number) {
    if (!mouseIsPressed) return
    const newGrid = getNewGridWithWallToggled(row, col)
    setGrid(newGrid)
  }

  const visualizeDijkstra = () => {
    console.time('visualization')
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    dijkstra(grid, startNode, finishNode)
    getNodesInShortestPathOrder(finishNode)
    setShouldUpdate(true)
    setIsFinished(true)
    console.timeEnd('visualization')
  }

  const reload = useCallback(() => {
    setIsFinished(false)
    setGrid(
      Array.from({ length: NUM_ROWS }, (_r, rowIdx) =>
        Array.from({ length: NUM_COLS }, (_c, colIdx) => ({
          col: colIdx,
          row: rowIdx,
          isStart: rowIdx === START_NODE_ROW && colIdx === START_NODE_COL,
          isFinish: rowIdx === FINISH_NODE_ROW && colIdx === FINISH_NODE_COL,
          distance: Infinity,
          isVisited: false,
          isShortest: false,
          isWall:
            !(rowIdx === START_NODE_ROW && colIdx === START_NODE_COL) &&
            !(rowIdx === FINISH_NODE_ROW && colIdx === FINISH_NODE_COL) &&
            Math.random() >= 0.69,
          previousNode: null,
        }))
      )
    )
  }, [])

  useEffect(() => {
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setTimeout(() => {
      setShouldUpdate(true)
      console.log('update')
    }, 30)
    return () => clearInterval(interval)
  }, [isFinished])

  return (
    <Flex w="100%" h="100%" direction="column" align="center">
      <VStack w="100%" h="100%" spacing="0.5">
        {grid.map((rows, rowIdx) => (
          <Flex key={`node_id-${0}-${rowIdx}`}>
            {rows.map((node, colIdx) => (
              <C.NodeItem
                key={`node_id-${colIdx}-${rowIdx}`}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={() => setMouseIsPressed(false)}
                isShortest={node.isShortest}
                col={node.col}
                row={node.row}
                isFinish={node.isFinish}
                isStart={node.isStart}
                isWall={node.isWall}
                isVisited={node.isVisited}
                shouldUpdate={shouldUpdate}
              />
            ))}
          </Flex>
        ))}
      </VStack>
      <Flex w="100%" justify="center" align="center">
        <Button
          colorScheme="blackAlpha"
          mr="8"
          isDisabled={!isFinished}
          onClick={reload}
        >
          Reload
        </Button>
        <Button colorScheme="blackAlpha" onClick={visualizeDijkstra}>
          Find
        </Button>
      </Flex>
    </Flex>
  )
}

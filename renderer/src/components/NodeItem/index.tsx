import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { NodeItemProps } from './types'

export const NodeItem = (props: NodeItemProps) => {
  const {
    col,
    row,
    isFinish,
    isStart,
    isWall,
    isVisited,
    isShortest,
    shouldUpdate,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props

  const [bgColor, setBgColor] = useState('gray')

  useEffect(() => {
    const color =
      (isShortest && 'orangered') ||
      (isWall && 'black') ||
      (isStart && 'red') ||
      (isFinish && 'green') ||
      (isVisited && 'dodgerblue') ||
      'gray'
    setBgColor(color)
  }, [isFinish, isShortest, isStart, isVisited, isWall, shouldUpdate])

  return (
    <Box
      w="10px"
      h="10px"
      bg={bgColor}
      mx="0.5px"
      rounded="3"
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  )
}

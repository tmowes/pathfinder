export type NodeItemProps = {
  col: number
  row: number
  isFinish: boolean
  isStart: boolean
  isWall: boolean
  isVisited: boolean
  isShortest: boolean
  shouldUpdate: boolean
  // mouseIsPressed: boolean
  onMouseDown: (row: number, col: number) => void
  onMouseEnter: (row: number, col: number) => void
  onMouseUp: () => void
}

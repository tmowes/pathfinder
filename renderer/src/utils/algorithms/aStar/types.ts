export type Node = {
  col: number
  row: number
  isStart: boolean
  isFinish: boolean
  distance: number | null
  isVisited: boolean
  isWall: boolean
  isShortest: boolean
  stepCost: number
  totalCost: number
  heuristicCost: number
  previousNode: Node | null
}

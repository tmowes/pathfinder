/* eslint-disable radar/cognitive-complexity */
import { Node } from './types'

let finished = false

function aStar(
  grid: Node[][],
  unvisitedNodes: Node[],
  closedSet: Node[],
  bestPath: Node[],
  lastNode: Node
) {
  console.time('AStar')
  while (!finished) {
    if (unvisitedNodes.length > 0) {
      const bestUnvisitedNode = unvisitedNodes.sort(
        (a, b) => a.totalCost - b.totalCost
      )[0]
      bestUnvisitedNode.isVisited = true
      if (bestUnvisitedNode.isFinish) {
        let temp = bestUnvisitedNode
        bestPath.push(temp)
        while (temp.previousNode !== null) {
          temp = temp.previousNode
          temp.isShortest = true
          bestPath.push(temp)
        }
        console.timeEnd('AStar')
        console.log('FINISH')
        finished = true
      } else {
        removeFromArray(unvisitedNodes, bestUnvisitedNode)
        closedSet.push(bestUnvisitedNode)
        const neighbors: Node[] = getUnvisitedNeighbors(bestUnvisitedNode, grid)
        neighbors.forEach(neighbor => {
          if (!closedSet.includes(neighbor) && !neighbor?.isWall) {
            const tempStepCost = bestUnvisitedNode.stepCost + 1
            if (unvisitedNodes.includes(neighbor)) {
              if (tempStepCost < neighbor.stepCost) {
                neighbor.stepCost = tempStepCost
              }
            } else {
              neighbor.stepCost = tempStepCost
              unvisitedNodes.push(neighbor)
            }
            neighbor.heuristicCost = heuristica(neighbor, lastNode)
            neighbor.totalCost = neighbor.stepCost + neighbor.heuristicCost
            neighbor.previousNode = bestUnvisitedNode
          }
        })
      }
    } else {
      console.timeEnd('AStar')
      console.log('FINISH SEM CAMINHO')
      finished = true
    }
  }
}

function getUnvisitedNeighbors(node: Node, grid: Node[][]) {
  const neighbors: Node[] = []
  const { col, row } = node
  if (col > 0) neighbors.push(grid[col - 1][row]) //                         top
  if (row < grid[0].length - 1) neighbors.push(grid[col][row + 1]) //      right
  if (col < grid.length - 1) neighbors.push(grid[col + 1][row]) //        bottom
  if (row > 0) neighbors.push(grid[col][row - 1]) //                        left
  return neighbors.filter(item => !item?.isWall && item)
}

function heuristica(a: Node, b: Node) {
  const colDiff = Math.abs(a.col - b.col)
  const rowDiff = Math.abs(a.row - b.row)
  return colDiff + rowDiff
}

function removeFromArray(array: Node[], elemento: Node) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === elemento) {
      array.splice(i, 1)
    }
  }
}

export const mainAStar = (grid: Node[][]) => {
  const closedSet = []
  const bestPath = []
  const startNode = grid.flat().find(node => node.isStart)
  const lastNode = grid.flat().find(node => node.isFinish)
  const unvisitedNodes: Node[] = getUnvisitedNeighbors(startNode, grid)
  aStar(grid, unvisitedNodes, closedSet, bestPath, lastNode)
}

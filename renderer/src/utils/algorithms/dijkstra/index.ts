/* eslint-disable consistent-return */
import { Node } from './types'
// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid: Node[][], startNode: Node, finishNode: Node) {
  const visitedNodesInOrder = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) {
      // eslint-disable-next-line no-continue
      continue
    }
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder
    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)
    if (closestNode === finishNode) return visitedNodesInOrder
    updateUnvisitedNeighbors(closestNode, grid)
  }
}

function sortNodesByDistance(unvisitedNodes: Node[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node: Node, grid: Node[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  unvisitedNeighbors.forEach(neighbor => {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  })
}

export function getUnvisitedNeighbors(node: Node, grid: Node[][]) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter(neighbor => !neighbor.isVisited)
}

const getAllNodes = (grid: Node[][]) => grid.map(rows => rows.map(row => row)).flat()

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode: Node) {
  const nodesInShortestPathOrder = []
  let currentNode = finishNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode.isShortest = true
    currentNode = currentNode.previousNode
  }
  return nodesInShortestPathOrder
}

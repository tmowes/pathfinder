/* eslint-disable no-continue */
import { Dirs, Maze, Node, Visited } from './types'

export const hasPath = (maze: Maze, start: Node, destination: Node) => {
  const m = maze.length
  const n = maze[0].length
  const queue = []
  const visited = Array.from({ length: m }, () => new Array(n).fill(false))
  queue.push(start)
  const dirs = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ]
  while (queue.length) {
    const cur = queue.shift()
    if (cur[0] === destination[0] && cur[1] === destination[1]) return true
    if (visited[cur[0]][cur[1]]) continue
    visited[cur[0]][cur[1]] = true
    dirs.forEach(dir => {
      // for (const dir of dirs) {
      let x = cur[0]
      let y = cur[1]
      while (x >= 0 && x < m && y >= 0 && y < n && maze[x][y] === 0) {
        x += dir[0]
        y += dir[1]
      }
      x -= dir[0]
      y -= dir[1]
      queue.push([x, y])
    })
    // }
  }
  return false
}

export const hasPath2 = (maze: Maze, start: Node, destination: Node) => {
  const m = maze.length
  const n = maze[0].length
  const visited = Array.from({ length: m }, () => new Array(n).fill(false))
  const dirs = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ]
  return dfs(maze, start, destination, visited, dirs)
}

function dfs(maze: Maze, start: Node, destination: Node, visited: Visited, dirs: Dirs) {
  if (visited[start[0]][start[1]]) return false
  if (start[0] === destination[0] && start[1] === destination[1]) return true
  visited[start[0]][start[1]] = true
  for (let i = 0; i < dirs.length; i++) {
    const d = dirs[i]
    let row = start[0]
    let col = start[1]
    while (isValid(maze, row + d[0], col + d[1])) {
      row += d[0]
      col += d[1]
    }
    if (dfs(maze, [row, col], destination, visited, dirs)) return true
  }
  return false
}

const isValid = (maze: Maze, row: number, col: number) =>
  row >= 0 &&
  row < maze.length &&
  col >= 0 &&
  col < maze[0].length &&
  maze[row][col] !== 1

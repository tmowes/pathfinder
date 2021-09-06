// LIFO  = stack
// Depth First Search

export const depthFirstSearch = (grid: number[], start: number, end: number) => {
  // criar stack
  const stack = []
  const seen = []
  let curr
  let adjacent
  // criar seen set node

  stack.push(start)

  while (stack.length > 0) {
    curr = stack.pop()
    // if not been seen
    if (!seen.includes(curr)) {
      seen.push(curr)
    }
    // add unseen nodes
    // for adjacent
    for (let i = 0; i < seen.length; i++) {
      if (seen.includes(adjacent)) {
        stack.push(adjacent)
      }
    }
  }
}

export const nQueens = (n: number) => {
  const result = [[]]
  const cols = []
  solveNQueens(n, 0, cols, result)
  return result
}

const solveNQueens = (
  n: number,
  row: number,
  colPlacement: number[],
  result: number[][]
) => {
  if (row === n) {
    result.push(colPlacement)
  } else {
    for (let col = 0; col < n; col++) {
      colPlacement.push(col)
      if (isValid(colPlacement)) {
        solveNQueens(n, row + 1, colPlacement, result)
      }
      colPlacement.pop()
    }
  }
}

const isValid = (colPlacement: number[]) => {
  const rowID = colPlacement.length - 1
  for (let i = 0; i < rowID; i++) {
    const diff = Math.abs(colPlacement[i] - colPlacement[rowID])
    if (diff === 0 || diff === rowID - i) {
      return false
    }
  }
  return true
}

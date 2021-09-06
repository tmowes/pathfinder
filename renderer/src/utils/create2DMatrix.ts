export const create2DMatrix = (
  cols: number,
  rows: number,
  fill = 0,
  start: [number, number] = [3, 3],
  finish: [number, number] = [cols - 3, rows - 3]
) =>
  Array.from({ length: cols }, (_c, colIdx) =>
    Array.from({ length: rows }, (_r, rowIdx) => {
      const isStart = colIdx === start[0] && rowIdx === start[1]
      const isFinish = colIdx === finish[0] && rowIdx === finish[1]
      return {
        col: colIdx,
        row: rowIdx,
        isStart,
        isFinish,
        isVisited: false,
        isShortest: false,
        isWall: !isStart && !isFinish && Math.random() >= 0.7,
        stepCost: 0,
        totalCost: 0,
        heuristicCost: 0,
        distance: Infinity,
        neighbors: [],

        previousNode: null,
      }
    })
  )

// Array.from({ length: cols }).map(_ => Array.from({ length: rows }).fill(fill))

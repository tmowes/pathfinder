// FIFO = queue
// Breath First Search

export const breathFirstSearch = (grid: number[], start: number, end: number) => {
  // criar queue
  const queue = []
  const seen = []
  let curr
  let adjacent
  // criar seen set node

  queue.push(start)

  while (queue.length > 0) {
    curr = queue.pop()
    // if not been seen
    if (!seen.includes(curr)) {
      seen.unshift(curr)
    }
    // add unseen nodes
    // for adjacent
    for (let i = 0; i < seen.length; i++) {
      if (seen.includes(adjacent)) {
        queue.unshift(adjacent)
      }
    }
  }
}

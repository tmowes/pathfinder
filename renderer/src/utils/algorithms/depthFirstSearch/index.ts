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

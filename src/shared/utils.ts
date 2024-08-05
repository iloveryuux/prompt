export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const getVisibleCount = (): number =>
  Math.max(process.stdout.rows - 2, 1)

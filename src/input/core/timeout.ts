export function createTimeoutPromise(timeout: number): {
  promise: Promise<void>
  timer: NodeJS.Timeout
} {
  let timer: NodeJS.Timeout | null = null
  const promise = new Promise<void>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Input timed out')), timeout)
  })
  return { promise, timer: timer as unknown as NodeJS.Timeout }
}

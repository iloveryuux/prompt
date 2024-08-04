export function setupCleanup(cleanup: () => void) {
  process.on('exit', cleanup)
  process.on('SIGINT', () => {
    cleanup()
    process.exit()
  })
}

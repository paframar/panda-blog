export function generateNumericId(): number {
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    return array[0]
  } else {
    // for testing handling (window element not present in that env)
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  }
}

export function seededRandom(index, salt = 0) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

export function seededRange(index, salt, min, max) {
  return min + seededRandom(index, salt) * (max - min)
}

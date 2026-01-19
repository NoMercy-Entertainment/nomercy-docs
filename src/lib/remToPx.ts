export function remToPx(remValue: number) {
  let fontSize = typeof window === 'undefined' ? 16 : parseFloat(getComputedStyle(document.documentElement).fontSize)

  return remValue * fontSize
}

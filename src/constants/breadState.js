export const BreadState = Object.freeze({
  CRISPY: '탄',
  DRY: '마른',
  SOGGY: '눅눅한',
  FROZEN: '꽁꽁얼은',
  PERFECT: '완벽한',
})

export function getBreadState({ temp, humid, nameEn }) {
  if (!nameEn) return BreadState.SOGGY // 바다(도시명 없음)는 눅눅으로 처리
  if (temp <= 0) return BreadState.FROZEN
  if (temp >= 35) return BreadState.CRISPY
  if (humid >= 80) return BreadState.SOGGY
  if (humid <= 20) return BreadState.DRY

  return BreadState.PERFECT
}

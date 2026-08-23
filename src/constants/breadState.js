export const BreadState = Object.freeze({
  CRISPY: '탐',
  DRY: '마름',
  SOGGY: '눅눅',
  FROZEN: '꽁꽁얼음',
  PERFECT: '완벽',
})

export function getBreadState({ temp, humid, nameEn }) {
  if (!nameEn) return BreadState.SOGGY // 바다(도시명 없음)는 눅눅으로 처리
  if (temp <= 0) return BreadState.FROZEN
  if (temp >= 35) return BreadState.CRISPY
  if (humid >= 80) return BreadState.SOGGY
  if (humid <= 20) return BreadState.DRY

  return BreadState.PERFECT
}

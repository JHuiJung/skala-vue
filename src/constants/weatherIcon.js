import iconSun from '../assets/img/icon_sun.png'
import iconCloud from '../assets/img/icon_cloud.png'
import iconRain from '../assets/img/icon_rain.png'
import iconSnow from '../assets/img/icon_snow.png'

// OpenWeatherMap 한글 설명(status) 문자열로 4종 아이콘 중 하나를 매칭
export function getWeatherIcon(status) {
  if (!status) return iconSun
  if (status.includes('눈')) return iconSnow
  if (status.includes('비')) return iconRain
  if (status.includes('구름') || status.includes('흐림')) return iconCloud
  return iconSun
}

import Taro from '@tarojs/taro'

export const cShowToast = (
  data: string,
  icon: 'none' | 'success' | 'loading' | undefined = 'none',
  duration: number = 3000
): void => {
  Taro.showToast({
    title: data,
    icon: icon,
    duration: duration
  })
}

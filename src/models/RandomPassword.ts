export default class RandomPassword {
  // constructor(parameters) {

  // }

  private pwd: string

  private getPwd(): string {
    return this.pwd
  }

  public genRandomPassword(
    num: boolean = true,
    lowerCase: boolean = true,
    upperCase: boolean = false,
    symbol: boolean = false,
    length: number = 8
  ): string {
    let condition: string = ''
    let result: string = ''

    condition += num ? '0123456789' : ''
    condition += lowerCase ? 'abcdefghijklmnopqrstuvwxyz' : ''
    condition += upperCase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''
    condition += symbol ? '!@#$%^&*' : ''

    condition = this.randString(condition)
    const conLength = condition.length

    let location: number = this.genRandConLocation(conLength)
    for (let i = 0; i < length; i++) {
      let nLocation = this.genRandConLocation(conLength)
      while (location == nLocation)
        nLocation = this.genRandConLocation(conLength)
      location = nLocation

      result += condition[nLocation]
    }

    return (this.pwd = result)
  }

  private genRandConLocation(conLength: number): number {
    return Math.floor(Math.random() * conLength)
  }

  private averageRand(): number {
    let result = 0

    for (let i = 0; i < 10; i++) {
      result += Math.random()
    }

    return result / 10
  }

  //Box-Muller变换
  private randn_bm() {
    let u = 0
    let v = 0
    while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) return this.randn_bm() // resample between 0 and 1
    return num
  }

  private randString(str: string): string {
    let arr = str.split('')
    return arr.sort(() => Math.random() - 0.5).join('')
  }
}

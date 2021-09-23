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

    for (let i = 0; i < length; i++) {
      result += condition[Math.floor(Math.random() * condition.length)]
    }

    return (this.pwd = result)
  }
}

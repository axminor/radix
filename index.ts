export class Radix {
  private radixCode: string[];
  constructor (radixCode?: string) {
    this.radixCode = this.setRadixCode(radixCode)
  }

  private setRadixCode(radixCode?: string) {
    const str = radixCode || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const arr = str.split(',').flatMap((v, i, self) => {
      return self.indexOf(v) === i ? v : []
    })
    const res = [...arr]
    this.radixCode = res
    return res
  }
  // private getRadisStr() { return this.radixCode }

  private getBase(base = 0) {
    const bool = base >= 2 && base <= this.radixCode.length
    if (!bool) {
      throw new Error(`目标进制值必须为2-${this.radixCode.length}之间，请检查 base 或 radixCode 是否已正确设置`)
    }
    let baseTime = this.radixCode.length
    if (base >= 2) { baseTime = Math.floor(base) }
    return baseTime
  }

  /**
   * 转换成目标进制
   * @param num 待转换的十进制数（只支持整型, 小数会被强制转换为整数）
   * @param resultLength 期望的转换结果的长度：期望值可能会有不如意的时候，若待转换数为负，则负号不包含在长度中，转换结果的长度超出了期望长度，则不会按期望长度返回
   * @param base 设置为0时，则以radixCode的长度作为目标进制
   * @returns 返回目标进制字符串
   */
  enCode(num: number, resultLength = 0, base = 0) {
    // num值为非数字时，抛错
    num = Math.floor(num)
    if (isNaN(num)) {
      throw new Error('待转换的num必须为数字')
    }

    let baseTime = this.getBase(base)
    // 目标进制小于2时抛错

    const radixResult: string[] = []
    const prefix = num < 0 ? '-' : ''
    let x = Math.abs(num)
    let i = 0
    while (x > 0 ) {
      const char = this.radixCode[x % baseTime]
      radixResult.push(char)
      i += 1
      x = Math.floor( x / baseTime)
    }
    let preFillText = ''
    if (resultLength > 0 && resultLength < radixResult.length) {
      for (let j = 0; j < resultLength - radixResult.length; j++) {
        preFillText += this.radixCode[0]
      }
    }
    radixResult.reverse()
    const result = prefix + preFillText + radixResult.join('')
    return result
  }

  deCode(radixNum: string, base = 0) {
    if (typeof radixNum !== 'string') {
      throw new Error('参数的数据类型错误')
    }
    const bit = this.getBase(base)
    let num = 0

    // 处理负数 Start
    const prefix = radixNum.startsWith('-') ? -1 : 1
    if (prefix < 0) {
      radixNum = radixNum.replace(/-/ig, '')
    }
    // 处理负数 End

    const len = radixNum.length - 1
    for (let i = 0; i < len; i++) {
      const n = this.radixCode.findIndex(x => x === radixNum[i])
      if (n < 0) {
        throw new Error('不符合规范的参数')
      }
      num += n * Math.pow(bit, len - 1)
    }
    return num * prefix
  }
}

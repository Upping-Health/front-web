class Money {

  static centsToCoin(value: number) {
    return value / 100;
  }

  static coinToCents(value: number) {
    return value * 100;
  }

  static centsToMaskMoney(value: number) {
    return this.maskMoney(value / 100);
  }

  static maskMoney(value: number) {
    let newvalue = 'R$ ' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    return newvalue.substring(0, newvalue.length - 3) + ',' + newvalue.substring(newvalue.length - 2, newvalue.length)
  }

  static decimal(n: number) {
    return Math.round(n * 100) / 100
  }

}

export default Money;
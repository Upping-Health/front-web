export default {
  unmask: (value: any) => {
    if (!value) {
      return ''
    }
    return value.replace(/\D/g, '').substring(0, value.length)
  },
  cepMask: (zip_code = '') => {
    return zip_code
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  },
  dateMask: (date = '') => {
    return date
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1')
  },
  dateHourMask: (date = '') => {
    const dat = new Date(date)
    return dat.toLocaleString()
  },
  phoneMask: (phone = '') => {
    if (phone)
      return phone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
        .replace(/(\d{4})\d+?$/, '$1')
  },
  cpfMask: (document = '') => {
    return document
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },
  cnpjMask: (v: any) => {
    let x = v
      .replace(/\D/g, '')
      .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/)
    return !x[2]
      ? x[1]
      : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '')
  },
  hourMask: (hour: any) => {
    return hour
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1:$2')
      .replace(/(\d{2})\d+?$/, '$1')
  },
  moneyMask: (value: any) => {
    return `R$ ${String(value.toFixed(2)).replace('.', ',')}`
  },
  money(value: string) {
    const money = this.unmask(value)
    let maskedMoney = ''

    maskedMoney = Number(money) + ''
    maskedMoney = maskedMoney.replace(/[\D]+/g, '')
    maskedMoney = maskedMoney + ''
    maskedMoney = maskedMoney.replace(/([0-9]{2})$/g, ',$1')

    if (maskedMoney.length === 1) {
      maskedMoney = '0,0' + maskedMoney
    } else if (maskedMoney.length > 6) {
      maskedMoney = maskedMoney.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    }

    return maskedMoney
  },

  maskMoney(value: any) {
    // Remove todos os caracteres que não sejam dígitos
    const cleanValue = value.replace(/\D/g, '')

    // Se o valor estiver vazio ou não for um número, retorna vazio
    if (!cleanValue || isNaN(cleanValue)) return ''

    // Converte o valor para número e formata como moeda
    const formattedValue = Number(cleanValue) / 100 // Divide por 100 para converter centavos
    return formattedValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  },

  validaCpf: (document: string) => {
    document = document.replace(/[^\d]+/g, '')
    console.log(document)
    if (document == '') return false
    // Elimina CPFs invalidos conhecidos
    if (
      document.length != 11 ||
      document == '00000000000' ||
      document == '11111111111' ||
      document == '22222222222' ||
      document == '33333333333' ||
      document == '44444444444' ||
      document == '55555555555' ||
      document == '66666666666' ||
      document == '77777777777' ||
      document == '88888888888' ||
      document == '99999999999'
    )
      return false
    // Valida 1o digito
    let add = 0
    let i = 0
    for (i; i < 9; i++) add += parseInt(document.charAt(i)) * (10 - i)
    let rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(document.charAt(9))) return false
    // Valida 2o digito
    add = 0
    for (i = 0; i < 10; i++) add += parseInt(document.charAt(i)) * (11 - i)
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(document.charAt(10))) return false
    return true
  },
  validaCnpj: (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14) return false

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1+$/.test(cnpj)) return false

    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--
      if (pos < 2) pos = 9
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(0))) return false

    tamanho += 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--
      if (pos < 2) pos = 9
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(1))) return false

    return true
  },

  validateEmail: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },
}

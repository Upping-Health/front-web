export default {
  unmask: (value: any) => {
    if (!value) {
      return '';
    }
    return value.replace(/\D/g, '').substring(0, value.length);
  },
  cepMask: (zip_code = '') => {
    return zip_code
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  },
  dateMask: (date = '') => {
    return date
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  },
  dateHourMask: (date = '') => {
    const dat = new Date(date);
    return dat.toLocaleString()
  },
  phoneMask: (phone = '') => {
    if (phone)
      return phone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
        .replace(/(\d{4})\d+?$/, '$1');
  },
  cpfMask: (cpf = '') => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  },
  cnpjMask: (v: any) => {
    let x = v.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    return !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
  },
  hourMask: (hour: any) => {
    return hour
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1:$2')
      .replace(/(\d{2})\d+?$/, '$1');
  },
  moneyMask: (value: any) => {
    return `R$ ${String(value.toFixed(2)).replace('.', ',')}`;
  },

  maskMoney(value: any) {
    // Remove todos os caracteres que não sejam dígitos
    const cleanValue = value.replace(/\D/g, '');

    // Se o valor estiver vazio ou não for um número, retorna vazio
    if (!cleanValue || isNaN(cleanValue)) return '';

    // Converte o valor para número e formata como moeda
    const formattedValue = Number(cleanValue) / 100; // Divide por 100 para converter centavos
    return formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  },

  validaCpf: (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    console.log(cpf);
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;
    // Valida 1o digito	
    let add = 0;
    let i = 0
    for (i; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return false;
    return true;
  },




};

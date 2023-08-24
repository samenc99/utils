export class ValidatorUtils {
  static isCpf(value: any) {
    if (typeof value !== 'string') return false;

    value = value.replace(/[^0-9]/gi, '');

    if (value.length !== 11) {
      return false;
    }

    if (value[0].repeat(11) === value) {
      return false;
    }

    for (let t = 9; t < 11; t++) {
      let digit = 0,
        cont = 0;
      for (cont = 0; cont < t; cont++) {
        digit += Number(value[cont]) * (t + 1 - cont);
      }

      digit = ((10 * digit) % 11) % 10;

      if (Number(value[cont]) !== digit) {
        return false;
      }
    }

    return true;
  }

  static isCnpj(value: any) {
    const calc = (cnpj: string, slice: number) => {
      cnpj = cnpj.slice(0, slice);
      let factor = slice - 7;
      let sum = 0;

      for (let i = slice; i > 0; i--) {
        const n = Number(cnpj[slice - i]);
        sum += n * factor--;

        if (factor < 2) {
          factor = 9;
        }
      }

      const result = 11 - (sum % 11);

      return result > 9 ? 0 : result;
    };

    if (typeof value !== 'string') return false;

    value = value.replace(/[^\d]+/gi, '');

    if (value.length !== 14) {
      return false;
    }

    if (value[0].repeat(14) === value) {
      return false;
    }

    if (calc(value, 12) !== Number(value[12])) {
      return false;
    }

    return (
      calc(value, 12) === Number(value[12]) &&
      calc(value, 13) === Number(value[13])
    );
  }
}

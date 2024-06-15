export function isCnpjValidation(value: string) {
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

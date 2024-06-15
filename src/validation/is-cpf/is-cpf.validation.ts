export function isCpfValidation(value: string) {
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

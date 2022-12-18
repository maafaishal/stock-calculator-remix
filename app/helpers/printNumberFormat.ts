interface Options {
  withCurrency?: boolean;
}

const printNumberFormat = (num: number, options?: Options) => {
  const { withCurrency } = options || {};

  let numberText = Number(Math.round(num * 100) / 100).toLocaleString("id-ID");

  if (withCurrency) {
    numberText = "Rp" + numberText;
  }

  return numberText;
};

export default printNumberFormat;

const printNumberFormat = (num: number) => {
  return Number(Math.round(num * 100) / 100).toLocaleString("id-ID");
};

export default printNumberFormat;

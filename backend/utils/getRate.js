const getRate = (numeroStr) => {
  const numero = parseFloat(numeroStr.trim().replace(",", "."));
  return parseFloat(numero.toFixed(4));
};

export default getRate;

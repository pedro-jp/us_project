const formatToBRL = (value: string) => {
  const price = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

export default formatToBRL;

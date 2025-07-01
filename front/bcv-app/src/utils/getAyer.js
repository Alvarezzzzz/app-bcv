const getAyer = () => {
  const hoy = new Date();
  const ayer = new Date(hoy);

  ayer.setDate(hoy.getDate() - 1);

  const año = ayer.getFullYear();
  const mes = String(ayer.getMonth() + 1).padStart(2, "0");
  const dia = String(ayer.getDate()).padStart(2, "0");

  const fechaAyer = `${año}-${mes}-${dia}`;
  return fechaAyer;
};

export default getAyer;

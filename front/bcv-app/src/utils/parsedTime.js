const convertirHoraVenezuela = (fechaISO) => {
  const fecha = new Date(fechaISO);

  fecha.setHours(fecha.getHours() - 4);
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");

  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
};

export default convertirHoraVenezuela;

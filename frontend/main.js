// url base del backend
const API_BASE_URL = "http://localhost:3000";

// elementos utilizados del dom
const elements = {
  refreshBtn: document.getElementById("refresh-btn"),

  // Cuadro principal de tasa actual
  rateValue: document.getElementById("rate-value"),
  consultaFechaValue: document.getElementById("consulta-fecha"),
  validezFechaValue: document.getElementById("validez-fecha"),
  variationValue: document.getElementById("variation"),

  // Tabla de los ultimos 30 registros
  lastRates: document.getElementById("last-rates"),

  // Seccion de conversion
  amountInput: document.getElementById("amount"),
  fromCurrency: document.getElementById("from-currency"),
  toCurrency: document.getElementById("to-currency"),
  convertedAmount: document.getElementById("converted-amount"),
  convertBtn: document.getElementById("convert-btn"),
  conversionDate: document.getElementById("conversion-date"),
  historicalRateDisplay: document.getElementById("historical-rate-display"),
  historicalRateValue: document.getElementById("historical-rate-value"),
  historicalRateDate: document.getElementById("historical-rate-date"),

  // Seccion de historico por rango o por fecha unica
  startDate: document.getElementById("start-date"),
  endDate: document.getElementById("end-date"),
  searchBtn: document.getElementById("search-btn"),
  historyTable: document.getElementById("history-table"),
  historyBodyForRange: document.getElementById("history-body"),
  noData: document.getElementById("no-data"),

  // Notificaciones
  notificationArea: document.getElementById("notification-area"),
};

// Variables globales donde se almacenarán las tasas de la ultima consulta y la actual
let currentRate = 0;
let previousRate = 0;

/* Funciones de utilidad */
// Funcion que convierte una fecha en formato "YYYY-MM-DD" a "DD de mes de YYYY"
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Lo mismo que la funcion anterior pero le agrega el formato de hora "HH:mm:ss"
function formatDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Funcion que le da formato a las valores de las tasas (numeros) mostradas en la vista
function formatCurrency(value) {
  return parseFloat(value).toFixed(4).replace(".", ",");
}

// Funcion que calcula la variacion entre la tasa de la ultima consulta y la actual
function calculateVariation(current, previous) {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Funcion que le da formato a la variacion
function formatVariation(variation) {
  return variation.toFixed(2);
}

// Funcion para mostrar notificaciones y quitarlas a los 5 segundos
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
                <i class="fas ${
                  type === "success"
                    ? "fa-check-circle"
                    : "fa-exclamation-circle"
                }"></i>
                <div>${message}</div>
            `;

  elements.notificationArea.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Función para obtener tasa histórica por rango de fecha o por fecha unica
async function getHistoricalRate(date) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dollarRates/range?range=${date}`
    );
    if (!response.ok) throw new Error("Error al obtener tasa histórica");

    const data = await response.json();

    // Manejar respuesta de error
    if (data.message === "Not found") {
      showNotification(`No se encontró tasa para la fecha ${date}`, "error");
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    showNotification(
      "Error al obtener tasa histórica: " + error.message,
      "error"
    );
    return null;
  }
}

// Funciones para cargar datos
async function loadCurrentRate() {
  try {
    elements.refreshBtn.innerHTML =
      '<i class="fas fa-sync-alt"></i> Actualizando... <span class="spinner"></span>';

    const response = await fetch(`${API_BASE_URL}/dollarRates/today`);
    if (!response.ok) throw new Error("Error al cargar la tasa actual");

    const data = await response.json();

    // Manejar respuesta de error
    if (data.message === "Not found") {
      showNotification("No se encontró tasa para hoy", "error");
      return;
    }

    // Actualizar la interfaz con la nueva tasa
    currentRate = parseFloat(data.tasa);
    elements.rateValue.textContent = formatCurrency(data.tasa);
    elements.consultaFechaValue.textContent = formatDateTime(
      data.fecha_consulta
    );
    elements.validezFechaValue.textContent = formatDate(data.fecha_validez);

    // Calcular variación y la mostramos en la interfaz
    if (previousRate && previousRate > 0) {
      const variation = calculateVariation(currentRate, previousRate);
      const formattedVariation = formatVariation(variation);
      elements.variationValue.textContent = `${
        variation >= 0 ? "+" : ""
      }${formattedVariation}%`;
      elements.variationValue.className = `variation ${
        variation >= 0 ? "positive" : "negative"
      }`;
    }

    // Recargar datos adicionales
    await loadLastRates();
  } catch (error) {
    console.error(error);
    showNotification(
      "Error al cargar la tasa actual: " + error.message,
      "error"
    );
  } finally {
    elements.refreshBtn.innerHTML =
      '<i class="fas fa-sync-alt"></i> Actualizar Tasa';
  }
}

// Funcion para cargar el histórico y mostrarlo en la interfaz
async function loadLastRates() {
  try {
    const response = await fetch(`${API_BASE_URL}/dollarRates/history`);
    if (!response.ok) throw new Error("Error al cargar el histórico");

    const data = await response.json();

    // Manejar respuesta de error
    if (data.message === "Not found") {
      showNotification("No se encontraron tasas históricas", "error");
      return;
    }

    // Guardar la tasa anterior para cálculo de variación
    if (data.length >= 2) {
      previousRate = parseFloat(data[1].tasa);

      // Si ya tenemos la tasa actual, calcular variación y la mostramos en la interfaz
      if (currentRate > 0) {
        const variation = calculateVariation(currentRate, previousRate);
        const formattedVariation = formatVariation(variation);
        elements.variationValue.textContent = `${
          variation >= 0 ? "+" : ""
        }${formattedVariation}%`;
        elements.variationValue.className = `variation ${
          variation >= 0 ? "positive" : "negative"
        }`;
      }
    }

    // Mostrar los últimos 30 tasas
    const lastRates = data.slice(0, 30);
    elements.lastRates.innerHTML = "";

    // Mostrar las tasas en la tabla
    lastRates.forEach((rate) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${formatDate(rate.fecha_validez)}</td>
                        <td>${formatDateTime(rate.fecha_consulta)}</td>
                        <td>${formatCurrency(rate.tasa)}</td>
                    `;
      elements.lastRates.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    showNotification("Error al cargar el histórico: " + error.message, "error");
  }
}

// Función para cargar el histórico en la tabla du rango por fechas o por fecha unica
async function loadHistoryForRange() {
  // Obtener las fechas de inicio y fin
  const start = elements.startDate.value;
  const end = elements.endDate.value;

  if (!start && !end) {
    showNotification("Por favor seleccione un rango de fechas", "error");
    return;
  }

  try {
    let url = `${API_BASE_URL}/dollarRates/range`;

    // Construir la URL con el rango de fechas
    if (start && end) {
      url += `?range=${start}-to-${end}`;
    } else if (start) {
      url += `?range=${start}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al cargar el histórico");

    let data = await response.json();

    // Manejar respuesta de error
    if (data.message === "Not found") {
      elements.noData.style.display = "block";
      elements.historyTable.style.display = "none";
      return;
    }

    elements.historyBodyForRange.innerHTML = "";

    if (data.length === 0) {
      elements.noData.style.display = "block";
      elements.historyTable.style.display = "none";
      return;
    }

    elements.noData.style.display = "none";
    elements.historyTable.style.display = "table";

    data.forEach((rate) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${formatDate(rate.fecha_validez)}</td>
                        <td>${formatDateTime(rate.fecha_consulta)}</td>
                        <td>${formatCurrency(rate.tasa)}</td>
                    `;
      elements.historyBodyForRange.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    showNotification("Error al cargar el histórico: " + error.message, "error");
  }
}

// Funciones para usadas para la sección de conversión
async function convertCurrency() {
  const amount = parseFloat(elements.amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    showNotification("Por favor ingrese una cantidad válida", "error");
    return;
  }

  const from = elements.fromCurrency.value;
  const to = elements.toCurrency.value;
  const conversionDate = elements.conversionDate.value;

  let rateData = null;
  let rate = 0;

  // Si se ha seleccionado una fecha específica
  if (conversionDate) {
    rateData = await getHistoricalRate(conversionDate);
    if (!rateData) {
      // Mostrar la tasa usada
      elements.historicalRateValue.textContent = "Sin tasa para esta fecha:";
      elements.historicalRateDate.textContent = conversionDate;
      elements.historicalRateDisplay.style.display = "block";
      return;
    }

    rate = parseFloat(rateData.tasa);

    // Mostrar la tasa usada
    elements.historicalRateValue.textContent = formatCurrency(rateData.tasa);
    elements.historicalRateDate.textContent = formatDate(
      rateData.fecha_validez
    );
    elements.historicalRateDisplay.style.display = "block";
  } else {
    // Obtener la tasa actual
    try {
      const response = await fetch(`${API_BASE_URL}/dollarRates/today`);
      if (!response.ok) throw new Error("Error al obtener tasa actual");

      const data = await response.json();

      // Manejar respuesta de error
      if (data.message === "Not found") {
        showNotification("No se encontró tasa para hoy", "error");
        return;
      }

      rate = parseFloat(data.tasa);
      elements.historicalRateDisplay.style.display = "none";
    } catch (error) {
      console.error(error);
      showNotification(
        "Error al obtener tasa actual: " + error.message,
        "error"
      );
      return;
    }
  }

  // Logica para hacer las conversiones
  let result;
  if (from === "VED" && to === "USD") {
    result = amount / rate;
  } else if (from === "USD" && to === "VED") {
    result = amount * rate;
  } else {
    result = amount;
  }

  // Mostrar el resultado
  elements.convertedAmount.value = result.toFixed(2);

  const dateInfo = conversionDate
    ? ` usando la tasa del ${conversionDate}`
    : " usando la tasa actual";

  showNotification(`Conversión realizada${dateInfo}`, "success");
}

/* Event Listeners */

// evento para el boton de refrescar la tasa
elements.refreshBtn.addEventListener("click", async () => {
  try {
    // Enviar solicitud para obtener nueva tasa
    const response = await fetch(`${API_BASE_URL}/dollarRates/`, {
      method: "POST",
    });

    if (!response.ok) throw new Error("Error al actualizar la tasa");

    const data = await response.json();

    // Actualizar la interfaz con la nueva tasa
    currentRate = parseFloat(data.tasa);
    elements.rateValue.textContent = formatCurrency(data.tasa);
    elements.consultaFechaValue.textContent = formatDateTime(
      data.fecha_consulta
    );
    elements.validezFechaValue.textContent = formatDate(data.fecha_validez);

    // Recargar los últimos registros para obtener tasa anterior
    await loadLastRates();
    await loadHistoryForRange();

    showNotification("Tasa actualizada correctamente", "success");
  } catch (error) {
    console.error(error);
    showNotification("Error al actualizar la tasa: " + error.message, "error");
  }
});

// Evento para el boton de cargar el histórico y conversión
elements.convertBtn.addEventListener("click", convertCurrency);
elements.searchBtn.addEventListener("click", loadHistoryForRange);

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Establecer fechas por defecto para la busqueda  por rango y conversion
  const today = new Date().toISOString().split("T")[0];
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const oneMonthAgoStr = oneMonthAgo.toISOString().split("T")[0];

  elements.startDate.value = oneMonthAgoStr;
  elements.endDate.value = today;
  elements.conversionDate.value = today;

  // Cargar datos iniciales
  loadCurrentRate();
  loadHistoryForRange();
});

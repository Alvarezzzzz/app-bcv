<script setup>
import { useCoinStore } from '@/store/coinStore';
import { computed, ref, watchEffect } from 'vue';
import getAyer from '@/utils/getAyer';
import formatoYYYYMMDD from '@/utils/parsedDate';
import convertirHoraVenezuela from '@/utils/parsedTime';

const coinStore = useCoinStore();
const coin = computed(() => coinStore.coin);

const consultaFecha = ref('30 de junio de 2025');
const validezFecha = ref('30 de junio de 2025');
const valorDolar = ref('107,62');
const variacion = ref('+0,45%'); 
const tendencia = ref('alza'); 

watchEffect(async() => {
    const urlCoin = coin.value === 'dolar' ? 'dollarRates' : 'euroRates';
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${urlCoin}/today`);
    const tasaToday = await response.json();
    const fechaAyer = getAyer();
    const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${urlCoin}/range?range=${fechaAyer}`);
    const tasaAyer = await response2.json();
    const tasaVariacion = (tasaToday.tasa - tasaAyer.tasa) / tasaToday.tasa * 100;
    console.log(tasaToday);
    console.log(convertirHoraVenezuela(tasaToday.fecha_consulta));
});

const consultarTasa = () => {
  
};
</script>

<template>
  <section class="container">
    <p class="title">TASA OFICIAL DEL <strong>{{coin}}</strong> BCV</p>
    <div class="price-container">
      <p class="price">{{ valorDolar }}</p>
      <p class="currency">{{ coin }}</p>
    </div>

    <div class="variation" :class="tendencia">
      <span class="variation-icon">
        {{ tendencia === 'alza' ? '↑' : '↓' }}
      </span>
      <span class="variation-value">{{ variacion }}</span>
      <span class="variation-text">Variación</span>
    </div>

    <div class="info">
      <p><span class="info-label">Consultado:</span> <span class="info-value">{{ consultaFecha }}</span></p>
      <p><span class="info-label">Día de validez:</span> <span class="info-value">{{ validezFecha }}</span></p>
    </div>

    <button class="consult-button" @click="consultarTasa">
      Consultar tasa BCV
    </button>
  </section>
</template>

<style scoped>
.container {
  max-width: 420px;
  margin: 2rem auto;
  background: var(--color-white);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
  text-align: center;
  color: #333;
  border: 1px solid #e0e0e0;
  position: relative;
}

.title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.title strong {
  font-weight: 700;
  color: var(--color-blue);
}

.price-container {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.price {
  font-size: 4.5rem;
  font-weight: 700;
  color: var(--color-blue);
  margin: 0;
  line-height: 1;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.currency {
  font-size: 2rem;
  font-weight: 500;
  margin-top: 0.5rem;
  color: #555;
}

.variation {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-top: 0.5rem;
  font-weight: 600;
}

.variation.alza {
  background-color: #e6f7ee;
  color: #10b981;
}

.variation.baja {
  background-color: #fee2e2;
  color: #ef4444;
}

.variation-icon {
  font-size: 1.2rem;
}

.variation-value {
  font-size: 1.1rem;
}

.variation-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.info {
  margin-top: 1.75rem;
  font-size: 0.95rem;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.info p {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-weight: 500;
  color: #555;
}

.info-value {
  font-weight: 600;
  color: #333;
}

.consult-button {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.consult-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.consult-button:active {
  transform: translateY(0);
}

/* Efecto hover para interactividad */
.container:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgb(0 0 0 / 0.2);
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 480px) {
  .container {
    max-width: 90vw;
    padding: 1.5rem;
  }

  .title {
    font-size: 1.1rem;
  }

  .price {
    font-size: 3.5rem;
  }

  .currency {
    font-size: 1.75rem;
  }
  
  .consult-button {
    padding: 0.65rem 1.25rem;
    font-size: 0.95rem;
  }
}
</style>
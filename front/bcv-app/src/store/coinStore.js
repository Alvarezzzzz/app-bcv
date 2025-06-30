import { defineStore } from "pinia";
import { ref } from "vue";

export const useCoinStore = defineStore("coin", () => {
  const coin = ref("dolar");

  const setCoin = (newCoin) => {
    coin.value = newCoin;
  };

  return { coin, setCoin };
});

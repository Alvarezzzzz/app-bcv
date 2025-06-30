<script setup>
console.log('Home');
import { useCoinStore } from '@/store/coinStore';
import { computed } from 'vue';

const coinStore = useCoinStore();
const coin = computed(() => coinStore.coin);
</script>

<template>
    <h1>Pagina del {{ coin }}</h1>
    <button @click="coinStore.setCoin('euro')"></button>
</template>

<style scoped>  </style>
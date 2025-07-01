<script setup>
import { RouterLink } from "vue-router";
import { useCoinStore } from "@/store/coinStore";
import { computed } from "vue";

const coinStore = useCoinStore();
const coin = computed(() => coinStore.coin);
const onToggleCoin = () => {
    coinStore.setCoin(coin.value === "dolar" ? "euro" : "dolar");
}
</script>

<template>
    <nav class="navbar">
        <div class="navbar-links">
                <RouterLink to="/" class="navbar-link">
                    Home
                </RouterLink>
                <RouterLink to="/historico" class="navbar-link">
                    Historico
                </RouterLink>
                <RouterLink to="/conversor" class="navbar-link">
                    Conversor
                </RouterLink>
                <RouterLink to="/rango" class="navbar-link">
                    Por Fechas
                </RouterLink>
        </div>
        <div v-if="coin === 'dolar'" class="toggle-coin" @click="onToggleCoin">
            $ Dolar
        </div>
        <div v-else class="toggle-coin" @click="onToggleCoin">
            € Euro
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: var(--color-white);
    height: 50px;
    width: 100%;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-links {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    
}

.navbar-link {
    text-decoration: none;
    padding: 8px 16px;
    background-color: var(--color-gray);
    font-family: Arial, Helvetica, sans-serif;
    color:#333;
    border-radius: 5px;
    transition: color 0.3s ease, background-color 0.3s ease;
}

.navbar-link:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
}

.toggle-coin {
    cursor: pointer;
    padding: 8px 16px;
    background-color: var(--color-gray);
    border-radius: 5px;
    transition: color 0.3s ease, background-color 0.3s ease;
}

.toggle-coin:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
}
</style>
import { createRouter, createWebHistory } from "vue-router";
import Dolar from "@/views/Dolar.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/dolar",
      name: "dolar",
      component: Dolar,
    },
  ],
});

export default router;

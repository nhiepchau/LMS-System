<template>
  <v-app>
    <v-main>
      <side-bar v-if="isAuthenticated() && !isLoginPage"></side-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from './utils/router';
import { computed, inject } from 'vue';

const route = useRoute();
const auth = inject<(a: String, b: String) => Boolean>('auth', (_, __) => false);

const isLoginPage = computed(() => {
  return route.path === '/login'
});

function isAuthenticated() {
  const userName = localStorage.getItem("username") ?? "";
  const password = localStorage.getItem("password") ?? "";

  if (!auth(userName, password)) {
    router.push('/login');
    return false;
  }

  return true;
}
  //
</script>

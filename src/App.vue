<template>
  <v-app>
    <v-main>
      <side-bar v-if="isAuthenticated"></side-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import router from './utils/router';
import useAuth from './services/auth';
import { computed } from 'vue';

const auth = useAuth();

const isAuthenticated = computed<boolean>(() => {
  // In case page is reloaded, get username/password from session storage
  // Otherwise, get username/password from auth store
  const username = auth.username ?? sessionStorage.getItem('username');
  const password = auth.password ?? sessionStorage.getItem('password');

  auth.setLogin(username, password);

  return username !== null && password !== null;
})
  //
</script>

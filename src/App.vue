<template>
  <v-app>
    <v-main>
      <side-bar v-if="isAuthenticated"></side-bar>
      <router-view />

      <base-alert v-for="(item, idx) in notify.notifications.value"
        :key="idx"
        :type="item.type"
        :id="item.id"
        :message="item.message"
        :autoClose="item.autoClose"
        :duration="item.duration"
        @close="() => { console.log('Close'); notify.removeNotification(item.id); }" >
      </base-alert>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import useNotifications from './utils/notification';
import useAuth from './services/auth';
import { computed, provide } from 'vue';

const auth = useAuth();

const notify = useNotifications();

const isAuthenticated = computed<boolean>(() => {
  // In case page is reloaded, get username/password from session storage
  // Otherwise, get username/password from auth store
  const username = auth.username ?? sessionStorage.getItem('username');
  const password = auth.password ?? sessionStorage.getItem('password');
  const token = auth.token ?? sessionStorage.getItem('token');
  const fullname = auth.user.name ?? sessionStorage.getItem('fullname');
  const role = auth.user.role ?? sessionStorage.getItem('role');

  auth.setLogin(username, password, token);
  auth.setUserInfo(fullname, role);

  return username !== null && password !== null;
})

provide("create-notification", notify.createNotification);
  //
</script>

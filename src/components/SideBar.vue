<template>
  <v-navigation-drawer permanent>
    <v-img src="../assets/images/LMS-Ava.png" width="8rem" class="ml-3 my-2" />

    <div class="d-flex flex-column">
      <v-list nav density="compact">
        <v-list-item title="Home" value="home" to="/">
          <template v-slot:prepend>
            <v-icon size="md">fas fa-home</v-icon>
          </template>
        </v-list-item>

        <v-list-item title="Courses" value="Courses" to="/course" >
          <template v-slot:prepend>
            <v-icon size="md">fas fa-book</v-icon>
          </template>
        </v-list-item>

        <v-list-item title="Reports" value="reports" to="/report">
          <template v-slot:prepend>
            <v-icon size="md">fas fa-chart-pie</v-icon>
          </template> 
        </v-list-item>
        <v-list-item title="Notifications" value="notify" to="/notification">
          <template v-slot:prepend>
            <v-icon size="md">fas fa-bell</v-icon>
          </template> 
        </v-list-item>
        <v-list-item title="Settings" value="setting" to="/setting">
          <template v-slot:prepend>
            <v-icon size="md">fas fa-cog</v-icon>
          </template> 
        </v-list-item>
      </v-list>

      <v-btn block @click.prevent="onLogOut" density="comfortable" >Log out</v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import router from '@/utils/router';

function onLogOut() {
  localStorage.setItem("username", "");
  localStorage.setItem("password", "");

  router.push('/login');
}
</script>

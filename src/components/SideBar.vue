<template>
  <v-navigation-drawer permanent class="bg-grey" >
    <div class="d-flex flex-column h-100">
      <div>
        <v-img src="../assets/images/LMS-Ava.png" width="8rem" class="ml-3 my-2" />
        <v-list nav density="compact">
          <v-list-item title="Home" value="home" to="/">
            <template v-slot:prepend>
              <v-icon size="md">fas fa-home</v-icon>
            </template>
          </v-list-item>

          <v-list-item title="Classes" value="classes" to="/class" v-if="auth.user.role === 'Teacher'" >
            <template v-slot:prepend>
              <v-icon size="md">fas fa-book</v-icon>
            </template>
          </v-list-item>

          <v-list-item title="Reports" value="reports" to="/report" v-if="auth.user.role === 'Teacher'">
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
      </div>
      <v-btn class="text-none w-75 mx-auto mt-auto mb-10 bg-grey-lighten-3 text-grey-darken-2" prepend-icon="fas fa-sign-out-alt" variant="flat" @click.prevent="onLogOut" >Logout</v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import router from '@/utils/router';

const auth = useAuth();
function onLogOut() {
  sessionStorage.clear();
  auth.setLogin(null, null, null);

  router.push({ name: 'login' });
}
</script>

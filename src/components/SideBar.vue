<template>
  <v-navigation-drawer permanent>
    <v-img src="../assets/images/LMS-Ava.png" width="8rem" class="ml-3 my-2" />

    <v-divider></v-divider>

    <v-list nav density="compact">
      <v-list-item title="Home" value="home" to="/">
        <template v-slot:prepend>
          <v-icon size="md">fas fa-home</v-icon>
        </template>
      </v-list-item>

      <v-list-group value="Courses">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Courses" >
            <template v-slot:prepend>
              <v-icon size="md">fas fa-book</v-icon>
            </template>
            <template v-slot:append>
              <v-icon size="md">fas fa-chevron-down</v-icon>
            </template>
          </v-list-item>
        </template>
        <v-list-item prepend-icon="" title="Exercises" value="exercises" to="/exercise" >
          <template v-slot:prepend>
            <v-icon size="md">far fa-envelope-open</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="Submissions" value="submissions" to="/submission" >
          <template v-slot:prepend>
            <v-icon size="md">fas fa-user-friends</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="Learning outcomes" value="outcomes" to="/outcome" >
          <template v-slot:prepend>
            <v-icon size="md">fas fa-check-circle</v-icon>
          </template>
        </v-list-item>
      </v-list-group>
      <v-list-item title="Reports" value="reports">
        <template v-slot:prepend>
          <v-icon size="md">fas fa-chart-pie</v-icon>
        </template> 
      </v-list-item>
      <v-list-item title="Notifications" value="notify">
        <template v-slot:prepend>
          <v-icon size="md">fas fa-bell</v-icon>
        </template> 
      </v-list-item>
      <v-list-item title="Settings" value="setting">
        <template v-slot:prepend>
          <v-icon size="md">fas fa-cog</v-icon>
        </template> 
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  //
</script>

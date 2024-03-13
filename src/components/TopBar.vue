<template>
    <v-toolbar class="bg-white" density="comfortable" title="" >
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon size="md">fas fa-search</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon size="md">fas fa-bell</v-icon>
        </v-btn>

        <v-divider
            class="ml-3 align-self-center"
            vertical
        ></v-divider>

        <v-list-group value="Users">
            <template v-slot:activator="{ props }">
                <v-list-item
                    lines="two"
                    :prepend-avatar="avaUrl"
                    subtitle="Professor"
                    title="Minh Châu"
                    v-bind="props"
                    class="width-full"
                >
                    <template v-slot:append>
                        <v-icon size="md">fas fa-chevron-down</v-icon>
                    </template>
                </v-list-item>
            </template>
            <v-list-item title="Logout" value="Logout"></v-list-item>
        </v-list-group>
    </v-toolbar>
</template>

<script setup lang="ts">
const avaUrl = "https://randomuser.me/api/portraits/women/81.jpg";
</script>
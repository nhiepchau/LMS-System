<template>
    <v-container>
        <h1>Dashboard</h1>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted } from 'vue';

async function getCourses() {
    const { data } = await http.get('courses');
    console.log('First api ', data)
    console.log('Http ', http)
} 

onMounted(() => {
    getCourses();
})
</script>
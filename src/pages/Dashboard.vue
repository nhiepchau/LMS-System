<template>
    <top-bar />
    <v-container>
        <h1>Dashboard</h1>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import http from '@/utils/http';
import { onMounted } from 'vue';

async function getCourses() {
    const auth = useAuth();

    const { data } = await http.get('api/courses');
    console.log('First api ', data)
    console.log('Http ', http)
} 

onMounted(() => {
    getCourses();
})
</script>
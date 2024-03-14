<template>
    <top-bar />

    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1>All courses</h1>
            <div>
                <v-btn variant="outlined" class="text-none text-blue-grey-darken-3 mr-3" prepend-icon="fas fa-file-download">Export</v-btn>
                <v-btn variant="flat" height="40" class="text-none bg-blue-darken-4 text-white" prepend-icon="fas fa-plus">New course</v-btn>
            </div>
        </div>

        <div class="d-flex justify-start mt-10">
            <course-item></course-item>
            <course-item></course-item>
        </div>
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
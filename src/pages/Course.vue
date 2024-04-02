<template>
    <top-bar />

    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">All classes</h1>
            <div>
                <v-btn variant="outlined" class="text-none text-primary mr-3" prepend-icon="fas fa-file-download">Export</v-btn>
                <v-btn @click.prevent="() => router.push('/class/create')" variant="flat" height="40" class="text-none bg-primary text-white" prepend-icon="fas fa-plus">New classes</v-btn>
            </div>
        </div>

        <div class="w-100 mt-10 d-flex">
            <course-item class="mr-4" v-for="(course, index) in courses" :key="index" :id="index" :department="course.department" :name="course.name" :semesters="course.semesters"></course-item>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';
import router from '@/utils/router';

const courses = ref<Array<{ name: String, semesters: Array<string>, department: String }>>();

async function getCourses() {
    const { data } = await http.get('/api/courses');

    console.log('Courses ', data)

    courses.value = data.map((x: { course_name: any; course_code: any; department: any }) => {
        return {
            name: `${x.course_code} - ${x.course_name}`,
            semesters: ['HK231'],
            department: x.department
        }
    });
} 

onMounted(() => {
    getCourses();
})
</script>
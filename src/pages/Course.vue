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
            <class-item class="mr-4" v-for="(course, index) in courses" 
                :key="index" 
                :id="index" 
                :name="course.name" 
                :code="course.code" 
                :group="course.group"
                :semester="course.semester"></class-item>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';
import router from '@/utils/router';

const courses = ref<Array<{ name: String, code: String, group: String, semester: String }>>();

async function getClasses() {
    const { data } = await http.get('/api/classes');
    courses.value = data.map((x: { course: any; class_code: any; group: any }) => {
        const [course_code, course_name] = x.course.split('-');
        const semester = x.class_code.split('_')[0].substring(2);
        return {
            name: course_name,
            code: course_code,
            group: x.group,
            semester: semester
        }
    })
} 

onMounted(() => {
    getClasses();
})
</script>
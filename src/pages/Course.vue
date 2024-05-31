<template>
    <top-bar></top-bar>

    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">All courses</h1>
            <div>
                <v-btn to="/course/create" variant="flat" height="40" class="text-none bg-primary text-white" prepend-icon="fas fa-plus">New course</v-btn>
            </div>
        </div>

        <div class="mt-10" style="display: grid; grid-template-columns: 375px 375px auto; gap: 20px;">
            <course-item class="mr-4 w-100" v-for="(course, index) in courses" 
                :key="index" 
                :course_code="course.course_code"
                :course_name="course.course_name"
                :department="course.department"
            ></course-item>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';

const courses = ref<Array<{ course_code: String, course_name: String, department: String }>>();

async function getCourses() {
    const { data } = await http.get('/api/courses');
    courses.value = data.map((x: { course_code: any, course_name: any, department: any }) => {
        return {
            course_code: x.course_code,
            course_name: x.course_name,
            department: x.department
        }
    })
} 

onMounted(() => {
    getCourses();
})
</script>
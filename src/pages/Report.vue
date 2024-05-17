<template>
    <top-bar />
    <v-container>
        <h1>Report & Suggestion</h1>
        <div class="mt-5">
            <combine-chart class="w-100" 
                title="Learning Outcome Performance"
                :classes="courses?.map(x => { return { name: x.name, classCode: x.class_code, num_of_lab: x.num_of_lab } })" 
            ></combine-chart>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';

const courses = ref<Array<{ name: string, course_code: string, class_code: string, group: string, num_of_lab: number, semester: string, num_of_students: number, num_of_submissions: number, num_of_exercises: number, num_submit_file: number }>>();

async function getClasses() {
    const { data } = await http.get('/api/classes');
    courses.value = data.map((x: { course: any; class_code: any; group: any, num_of_lab: any, num_of_students: any, num_of_submissions: any, num_of_exercises: any, num_submit_file: any }) => {
        const [course_code, course_name] = x.course.split('-');
        const semester = x.class_code.split('_')[0].substring(2);
        return {
            name: course_name,
            course_code: course_code,
            class_code: x.class_code,
            group: x.group,
            semester: semester,
            num_of_lab: x.num_of_lab,
            num_of_students: x.num_of_students,
            num_submit_file: x.num_submit_file,
            num_of_exercises: x.num_of_exercises,
            num_of_submissions: x.num_of_submissions
        }
    })
}

onMounted(() => {
    getClasses();
})
</script>
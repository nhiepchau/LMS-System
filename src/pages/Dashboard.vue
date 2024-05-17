<template>
    <top-bar />
    <v-container v-if="auth.user.role === 'Teacher'">
        <h1 class="text-primary" >Dashboard</h1>

        <v-row class="mt-0">
            <v-col><course-info-item class="bg-blue-lighten-4 text-blue-darken-4" :to="'/class'" :info="courses?.length" typeInfo="Total Classes" ></course-info-item></v-col>
            <v-col><course-info-item class="bg-green-lighten-4 text-dark-green" :info="countSubmission" typeInfo="Total Submissions"></course-info-item></v-col>
            <v-col><course-info-item class="bg-grey-lighten-3 text-dark-grey" :info="countStudent" typeInfo="Total Students"></course-info-item></v-col>
            <v-col>
                <v-btn class="w-100 bg-blue-lighten-5 h-100 text-center" variant="plain" to="/class/create">
                    <div>
                        <v-icon size="large" >fas fa-circle-plus</v-icon>
                        <p class="mt-2 text-none">Add a new class</p>
                    </div>
                </v-btn>
            </v-col>
        </v-row>

        <div class="d-flex flex-row mt-8">
            <div class="pa-4 border-sm rounded-lg w-33">
                <div class="d-flex flex-row justify-space-between w-100" v-bind="$attrs">
                    <h3 class="my-auto">Recent classes</h3>
                    <v-btn :to="'/class'" variant="plain" class="text-none text-blue-lighten-2" >View all</v-btn>
                </div>

                <div class="mt-2">
                    <recent-course-item v-for="course in courses?.slice(0, 3)"
                        :className="`${course.course_code} - ${course.name}`" 
                        :selectedClass="course.group" 
                        :classCode="course.class_code" 
                        class="mt-4" 
                    ></recent-course-item>
                </div>
            </div>
            <bar-chart class="w-66 ml-4" :classes="courses?.map(x => { return { name: x.name, classCode: x.class_code, num_of_lab: x.num_of_lab } })" ></bar-chart>
        </div>
    </v-container>
    <v-container v-else>
        <h1 class="text-primary" >Learning Outcome Support</h1>
        <div class="d-flex flex-row mt-5">
            <performance-chart class="w-50"></performance-chart>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import http from '@/utils/http';
import { computed, onMounted, ref } from 'vue';

const auth = useAuth();
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

const countSubmission = computed(() => {
    return courses.value?.map(x => x.num_of_submissions).reduce((a: number, b: number) => a + b, 0)
})

const countStudent = computed(() => {
    return courses.value?.map(x => x.num_of_students).reduce((a: number, b: number) => a + b, 0)
})

onMounted(() => {
    getClasses();
})
</script>
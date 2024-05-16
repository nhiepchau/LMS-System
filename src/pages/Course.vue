<template>
    <top-bar />

    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">All classes</h1>
            <div>
                <v-btn variant="outlined" class="text-none text-primary mr-3" prepend-icon="fas fa-file-download">Export</v-btn>
                <v-btn to="/class/create" @click="manageCourse.resetCourse()" variant="flat" height="40" class="text-none bg-primary text-white" prepend-icon="fas fa-plus">New classes</v-btn>
            </div>
        </div>

        <div class="mt-10" style="display: grid; grid-template-columns: 375px 375px auto; gap: 20px;">
            <class-item class="mr-4 w-100" v-for="(course, index) in courses" 
                :key="index" 
                :id="index" 
                :name="course.name" 
                :course_code="course.course_code"
                :class_code="course.class_code"
                :group="course.group"
                :semester="course.semester"
                :num_of_labs="course.num_of_lab"
                :num_of_exercises="course.num_of_exercises"
                :num_of_submissions="course.num_of_submissions"
                :num_submit_file="course.num_submit_file"
            ></class-item>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import useCourse from '@/services/course';
import http from '@/utils/http';
import { onMounted, ref } from 'vue';

const manageCourse = useCourse();
const courses = ref<Array<{ name: String, course_code: String, class_code: String, group: String, semester: String, num_of_lab: Number, num_of_submissions: Number, num_of_exercises: Number, num_submit_file: Number }>>();

async function getClasses() {
    const { data } = await http.get('/api/classes');
    courses.value = data.map((x: { course: any; class_code: any; group: any, num_of_lab: any, num_of_submissions: any, num_of_exercises: any, num_submit_file: any }) => {
        const [course_code, course_name] = x.course.split('-');
        const semester = x.class_code.split('_')[0].substring(2);
        return {
            name: course_name,
            course_code: course_code,
            class_code: x.class_code,
            group: x.group,
            semester: semester,
            num_of_lab: x.num_of_lab,
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
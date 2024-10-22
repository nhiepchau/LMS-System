<template>
    <top-bar />
    <v-container>
        <div class="d-flex flex-row justify-space-between">
            <h1 class="w-75">Report & Suggestion</h1>
            <v-select
                    label="Class"
                    v-model="selectClass"
                    :items="courses?.map(x => x.class_code)"
                    variant="solo"
                    density="compact"
                    class=""
                    bg-color="#F3F4F6"
                    flat
            ></v-select>
        </div>
        <div class="">
            <combine-chart class="w-100" 
                title="Learning Outcome Performance"
                :classCode="selectClass"
                :numOfLab="numOfLab"
            ></combine-chart>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';

const selectClass = ref<string>();
const numOfLab = ref<number>();
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

    selectClass.value = courses.value?.at(0)?.class_code ?? '';
    numOfLab.value = courses.value?.at(0)?.num_of_lab ?? 0;
}

onMounted(() => {
    getClasses();
})
</script>
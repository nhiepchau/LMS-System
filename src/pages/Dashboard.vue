<template>
    <top-bar />
    <v-container v-if="auth.user.role === 'Teacher' || auth.user.role === 'Head Lecturer'">
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
        <div class="d-flex flex-row justify-space-between w-100">
            <h1 class="text-primary w-75 my-auto" >Learning Outcome Support</h1>
            <v-select
                label="Class"
                v-model="selectClass"
                :items="courses?.map(x => x.class_code) ?? []"
                variant="solo"
                density="compact"
                class="my-auto mt-1"
                bg-color="#F3F4F6"
                flat
            ></v-select>
        </div>
        <h4 class="mt-2">Suggested Exercises for Student</h4>
        <div class="d-flex flex-row justify-space-between mt-3">
            <div class="w-25">
                <v-select
                    label="Outcomes"
                    v-model="outcome"
                    :items="allOutcomes?.map(x => x.outcome_code)"
                    variant="solo"
                    bg-color="#F3F4F6"
                    flat
                    density="compact"
                ></v-select>
            </div>
            <div class="w-66">
                <div class="">
                    <exercise-item v-for="exercise in questions?.slice(0, 3)"
                        :exerciseCode="exercise.exercise_code"
                        :exerciseName="exercise.exercise_name"
                    ></exercise-item>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row mt-5">
            <performance-chart class="w-100" :classCode="selectClass" :numOfLab="numOfLab" ></performance-chart>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import http from '@/utils/http';
import { computed, onMounted, ref } from 'vue';

const auth = useAuth();
const selectClass = ref<string>('');
const outcome = ref<string>('');
const numOfLab = ref<number>();
const allOutcomes = ref<Array<{ pk: number, outcome_code: string, parent_outcome: string, threshold: number }>>();
const questions = ref<Array<{ exercise_id: number, exercise_code: string, exercise_name: string, level: number }>>();
const courses = ref<Array<{ name: string, course_code: string, class_code: string, group: string, num_of_lab: number, semester: string, num_of_students: number, num_of_submissions: number, num_of_exercises: number, num_submit_file: number }>>();

async function getClasses() {
    let payload : any;
    if (auth.user.role === 'Teacher' || auth.user.role === 'Head Lecturer') {
        const { data } = await http.get('/api/classes');
        payload = data;
    }
    else {
        const { data } = await http.get(`/api/students/${auth.user.studentId}/classes`);
        payload = data;
    }
    courses.value = payload.map((x: { course: any; class_code: any; group: any, num_of_lab: any, num_of_students: any, num_of_submissions: any, num_of_exercises: any, num_submit_file: any }) => {
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

    if (!selectClass.value) {
        selectClass.value = courses.value?.at(0)?.class_code ?? '';
        numOfLab.value = courses.value?.at(0)?.num_of_lab ?? 0;

        getSuggestExercises(selectClass.value, parseInt(auth.user.studentId));
        getOutcomesByCourse(selectClass.value);
    }
}

async function getSuggestExercises(classCode: string, student: number) {
    await http.get(`/api/classes/${classCode}/students/${student}/recommend`)
    .then(function(response) {
        const { data } = response;
        questions.value = data.map((x: { exercise_id: any, exercise_code: any, exercise_name: any, level: any }) => {
            return {
                exercise_id: x.exercise_id,
                exercise_code: x.exercise_code,
                exercise_name: x.exercise_name,
                level: x.level
            }
        })
    })
}

function compareString (a: { outcome_code: string }, b: { outcome_code: string }) {
    return ('' + a.outcome_code).localeCompare(b.outcome_code);
}

async function getOutcomesByCourse(classCode: string) {
    const courseCode = classCode.substring(6, 12);
    await http.get(`/api/courses/${courseCode}/outcomes`)
    .then(function(response) {
        const { data } = response
        allOutcomes.value = data.map((x: { pk: any, outcome_code: any, parent_outcome: any, threshold: any }) => {
            return {
                pk: x.pk,
                outcome_code: x.outcome_code,
                parent_outcome: x.parent_outcome,
                threshold: x.threshold
            }
        }).sort(compareString);

        outcome.value = allOutcomes.value?.at(0)?.outcome_code ?? '';
    });
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
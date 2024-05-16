<template>
    <top-bar />
    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-dark-grey"><span class="text-primary">[HK{{ semester }}] {{ classCode.toString().substring(13) }}</span> - {{ courseName }}</h1>
            <div>
                <v-btn 
                    :to="`/class/${classCode}/exercise`"
                    variant="outlined" width="145" class="text-none pl-0 text-primary mr-3 justify-space-between" append-icon="fas fa-plus">
                    Exercise
                </v-btn>
                <v-btn 
                    :to="`/class/${classCode}/submission`"
                    variant="flat" class="text-none bg-primary text-white" append-icon="fas fa-chevron-right">
                    Submission
                </v-btn>
            </div>
        </div>

        <v-row class="mt-5">
            <v-col><course-info-item class="bg-blue-lighten-4 text-blue-darken-4" :info="classInfo?.num_of_submissions" typeInfo="SubmissionsLarge" ></course-info-item></v-col>
            <v-col><course-info-item class="bg-green-lighten-5 text-dark-green" :info="classInfo?.num_of_exercises" typeInfo="ExercisesLarge"></course-info-item></v-col>
            <v-col><course-info-item class="bg-grey-lighten-3 text-dark-grey" :info="classInfo?.num_of_students" typeInfo="StudentsLarge"></course-info-item></v-col>
            <v-col><course-info-item class="bg-orange-lighten-4 text-orange-darken-3" :info="classInfo?.num_of_outcomes" typeInfo="OutcomesLarge"></course-info-item></v-col>
        </v-row>

        <div class="d-flex flex-row w-100">
            <!-- Overview chart -->
            <overview-chart :num_of_lab="classInfo?.num_of_lab" class="w-66 mt-7 mr-4"></overview-chart>

            <!-- Detail chart for each LO -->
            <doughnut-chart :percent="80" class="w-33 mt-7"></doughnut-chart>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const classCode = route.params.class_code
const semester = classCode.toString().substring(2, 5)
const courseCode = classCode.toString().substring(6).substring(0, 6)
const courseName = ref<string>('');

const classInfo = ref<{ num_of_lab: Number, num_of_submissions: Number, num_of_exercises: Number, num_of_outcomes: Number, num_of_students: Number }>();

async function getClassDetail() {
    await http.get(`/api/courses/${courseCode}/classes/${classCode}`)
        .then(function(response) {
            const { data } = response;
            classInfo.value =  {
                num_of_lab: data.num_of_lab,
                num_of_exercises: data.num_of_exercises,
                num_of_submissions: data.num_of_submissions,
                num_of_outcomes: data.num_of_outcomes,
                num_of_students: data.num_of_students
            };
            courseName.value = `${data.course}`.substring(7);
        });
} 

onMounted(() => {
    getClassDetail();
})
</script>
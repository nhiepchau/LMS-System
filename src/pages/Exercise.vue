<template>
    <top-bar />
    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">
                [{{ class_code.substring(6) }}]
                Exercises
            </h1>
            <div>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="outlined" v-bind="activatorProps" class="text-none text-primary mr-3" prepend-icon="fas fa-file-upload">Import</v-btn>
                    </template>
                    <import-card :classId="class_id" @open-import-card="(val: boolean) => { dialog = val; getExercises(); }" ></import-card>
                </v-dialog>
                <v-dialog v-model="questionForm">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="flat" height="40" v-bind="activatorProps" class="text-none bg-primary text-white" prepend-icon="fas fa-plus">New question</v-btn>
                    </template>
                    <add-question-form></add-question-form>
                </v-dialog>
            </div>
        </div>

        <v-data-table
            class="border-sm rounded-lg mt-8"
            :items="exercises"
            :headers="headers"
            item-value="name"
            show-select
        >
            <template v-slot:item.level="{ value }">
                <v-chip :color="getColor(value)">
                    {{ value }}
                </v-chip>
            </template>

            <template v-slot:item.bkel_link="{ value }">
                <v-btn icon variant="plain" @click="openBkelPage(value)">
                    <v-icon size="xsmall" class="text-dark-grey">fas fa-link</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const dialog = ref(false);
const questionForm = ref(false);
const class_id = ref(0);
const class_code = route.params.class_code.toString();

async function getClassDetail() {
    const course = class_code.substring(6, 12);
    const { data } = await http.get(`/api/courses/${course}/classes/${class_code}`);
    class_id.value = data.pk;
}

function openBkelPage(url: string) {
    window.open(url, '_blank')
}

const exercises = ref<Array<{ question: String, name: String, level: String, topic: String, lab_id: String, outcome_id: String, bkel_link: String}>>();

async function getExercises() {
    const { data } = await http.get(`/api/classes/${class_code}/exercises`);
    exercises.value = data.map((x: { exercise_code: any; exercise_name: any; level: any, topic: any, lab: any, outcome: any, url: any }) => {
        const standardized_level = x.level === 1 ? '1-easy' 
            : x.level === 2 ? '2-medium'
            : x.level === 3 ? '3-hard' : '';
        return {
            question: x.exercise_code,
            name: x.exercise_name,
            level: standardized_level,
            topic: x.topic,
            lab_id: x.lab,
            outcome_id: x.outcome,
            bkel_link: x.url
        }
    })
}

onMounted(() => {
    getClassDetail();
    getExercises();
})

function getColor(value: string) {
    if (value === '3-hard') return 'red'
    else if (value === '2-medium') return 'orange'
    else return 'green'
}

const headers : any = [
    { title: 'question', align: 'start', key: 'question', sortable: false },
    { title: 'name', align: 'start', key: 'name', sortable: false },
    { title: 'level', align: 'start', key: 'level', sortable: false },
    { title: 'topic', align: 'start', key: 'topic', sortable: false },
    { title: 'lab_id', align: 'start', key: 'lab_id', sortable: false },
    { title: 'outcome_id', align: 'start', key: 'outcome_id', sortable: false },
    { title: 'bkel_link', align: 'center', key: 'bkel_link', sortable: false }
]
</script>

<style>
.v-data-table tbody tr:nth-of-type(even) {
    background-color: rgba(0, 0, 0, .03);
}
</style>
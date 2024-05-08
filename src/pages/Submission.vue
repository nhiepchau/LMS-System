<template>
    <top-bar />
    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">
                [{{ class_code.substring(6) }}]
                Submissions
            </h1>
            <div>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="flat" v-bind="activatorProps" class="text-none bg-primary text-white" prepend-icon="fas fa-file-upload">Import</v-btn>
                    </template>
                    <upload-submission :classId="class_id" @open-submission-card="(val: boolean) => { dialog = val; }" ></upload-submission>
                </v-dialog>
            </div>
        </div>

        <v-data-table-server
            class="border-sm rounded-lg mt-8"
            v-model:items-per-page="itemsPerPage"
            :items="submissions"
            :headers="headers"
            :items-length="totalItems"
            :loading="loading"
            item-value="name"
            show-select
            @update:options="loadItems"
        >
        </v-data-table-server>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const dialog = ref(false);
const class_id = ref(0);
const class_code = route.params.class_code.toString();
const itemsPerPage = ref(25);
const loading = ref(false);

async function getClassDetail() {
    const course = class_code.substring(6, 12);
    const { data } = await http.get(`/api/courses/${course}/classes/${class_code}`);
    class_id.value = data.pk;
    totalItems.value = data.num_of_submissions;
}

const totalItems = ref(0);
const submissions = ref<Array<{ question_id: Number, secured_student_id: String, started_time: String, submitted_time: String, time_taken: String, score: Number }>>();

async function loadItems ({ page, itemsPerPage, sortBy }: any) {
    loading.value = true;
    await getSubmissions(page, itemsPerPage);
    loading.value = false;
}

async function getSubmissions(page: Number, itemsPerPage: Number) {
    const { data } = await http.get(`/api/classes/${class_code}/submissions?page=${page}&items=${itemsPerPage}`);
    submissions.value = data.map((x: { exercise: any; student: any; score: any, time_taken: any, started_time: any, submitted_time: any }) => {
        return {
            question_id: x.exercise,
            secured_student_id: x.student,
            started_time: x.started_time,
            submitted_time: x.submitted_time,
            time_taken: x.time_taken,
            score: x.score
        }
    });
}

onMounted(async () => {
    await getClassDetail();
    await getSubmissions(1, itemsPerPage.value);
})

const headers : any = [
    { title: 'question_id', align: 'start', key: 'question_id', sortable: false },
    { title: 'secured_student_id', align: 'start', key: 'secured_student_id', sortable: false },
    { title: 'started_time', align: 'start', key: 'started_time', sortable: false },
    { title: 'submitted_time', align: 'start', key: 'submitted_time', sortable: false },
    { title: 'time_taken', align: 'start', key: 'time_taken', sortable: false },
    { title: 'score', align: 'center', key: 'score', sortable: false }
]
</script>

<style>
.v-data-table tbody tr:nth-of-type(even) {
    background-color: rgba(0, 0, 0, .03);
}
</style>
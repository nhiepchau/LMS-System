<template>
    <top-bar />
    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">Exercises</h1>
            <div>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="outlined" v-bind="activatorProps" class="text-none text-primary mr-3" prepend-icon="fas fa-file-upload">Import</v-btn>
                    </template>
                    <import-card @open-import-card="(val: boolean) => dialog = val" ></import-card>
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
            :items="items"
            item-value="name"
            show-select
        >
            <template v-slot:item.level="{ value }">
                <v-chip :color="getColor(value)">
                    {{ value }}
                </v-chip>
            </template>

            <template v-slot:item.bkel_link="{ value }">
                <v-icon size="small" class="text-dark-grey">fas fa-link</v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
const questionForm = ref(false);

// const headers = [
//     { title: 'question', align: 'start', key: 'question', sortable: false },
//     { title: 'name', align: 'start', key: 'name', sortable: false },
//     { title: 'level', align: 'start', key: 'level', sortable: false },
//     { title: 'topic', align: 'start', key: 'topic', sortable: false },
//     { title: 'lab_id', align: 'start', key: 'lab_id', sortable: false },
//     { title: 'outcome_id', align: 'start', key: 'outcome_id', sortable: false },
//     { title: 'bkel_link', align: 'center', key: 'bkel_link', sortable: false }
// ]

const items = [
    {
        question: '1.1',
        name: 'Zeros array',
        level: '2-medium',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '2.2',
        name: 'Library management I',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '1-pre',
        outcome_id: 'L.0.1.2',
        bkel_link: ''
    },
    {
        question: '3.1',
        name: 'Create array 2D',
        level: '3-hard',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '1.2',
        name: 'Memory management',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '1.3',
        name: 'Introduction',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '1.4',
        name: 'Compiler',
        level: '2-medium',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '2.3',
        name: 'Library management II',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '1-pre',
        outcome_id: 'L.0.1.2',
        bkel_link: ''
    },
    {
        question: '3.2',
        name: 'Create array 3D',
        level: '3-hard',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '3.4',
        name: 'Linked list',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '4.1',
        name: 'Review I',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '4.2',
        name: 'Review II',
        level: '2-medium',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '4.3',
        name: 'Library management III',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '1-pre',
        outcome_id: 'L.0.1.2',
        bkel_link: ''
    },
    {
        question: '3.3',
        name: 'Breaking',
        level: '3-hard',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '5.1',
        name: 'Operating System',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    },
    {
        question: '5.2',
        name: 'Examine',
        level: '1-easy',
        topic: 'Pointer Basic',
        lab_id: '2-post',
        outcome_id: 'L.0.2.1',
        bkel_link: ''
    }
]

function getColor(value: string) {
    if (value === '3-hard') return 'red'
    else if (value === '2-medium') return 'orange'
    else return 'green'
}
</script>

<style>
.v-data-table tbody tr:nth-of-type(even) {
    background-color: rgba(0, 0, 0, .03);
}
</style>
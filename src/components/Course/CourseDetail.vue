<template>
    <v-card class="w-66 mx-auto text-secondary">
        <v-card-item>
            <div class="d-flex flex-row text-primary mb-2">
                <h2 class="my-auto">{{ props.course }}</h2>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">{{ props.semester }}</v-chip>
            </div>
            <v-divider />
            <div class="mt-4 d-flex flex-row">
                <div class="w-50 px-2">
                    <div class="d-flex flex-row">
                        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-info-circle</v-icon>
                        <h3 class="my-auto">General Information</h3>
                    </div>
                    <v-container class="px-1">
                        <v-row>
                            <v-col><course-info-item class="bg-green-lighten-5 text-dark-green" info="4" typeInfo="Labs"></course-info-item></v-col>
                            <v-col><course-info-item class="bg-blue-lighten-5 text-sub" info="500" typeInfo="Exercises"></course-info-item></v-col>
                        </v-row>
                        <v-row class="d-flex">
                            <v-col><course-info-item class="bg-green-lighten-5 text-dark-green" info="20" typeInfo="Submission files"></course-info-item></v-col>
                            <v-col><course-info-item class="bg-blue-lighten-5 text-sub" info="60,000" typeInfo="Submissions"></course-info-item></v-col>
                        </v-row>
                    </v-container>
                </div>
                <div class="w-50 px-2">
                    <div class="d-flex flex-row">
                        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-bookmark</v-icon>
                        <h3 class="my-auto">Lab</h3>
                    </div>
                    <v-container class="px-1">
                        <lab-item label="Lab 1"></lab-item>
                        <lab-item label="Lab 2"></lab-item>
                        <lab-item label="Lab 3"></lab-item>
                        <lab-item label="Lab 4"></lab-item>
                    </v-container>
                </div>
            </div>
            <div>
                <div class="d-flex flex-row">
                    <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-check-circle</v-icon>
                    <h3 class="my-auto">Learning outcome distribution</h3>
                </div>
                <v-tabs v-model="tab">
                    <v-tab v-for="(LO, index) in LOs" :key="index" :value="LO">{{ LO }}</v-tab>
                </v-tabs>
                <v-window v-model="tab" class="mt-3">
                    <v-window-item v-for="(LO, index) in LOs" :key="index" :value="LO">
                        <lab-contribution></lab-contribution>
                    </v-window-item>
                </v-window>
            </div>
        </v-card-item>
        <v-divider class="my-1" />
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Close"
                class="text-none bg-blue-lighten-5 text-blue-darken-2"
                @click="emit('openDialog', false)"
            ></v-btn>

            <v-btn
                class="text-none bg-primary"
                text="Save"
                @click="emit('openDialog', false)"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    course: String,
    semester: String
});

const emit = defineEmits<{
    (e: 'openDialog', value: boolean): void
}>();

const LOs = ref<Array<string>>(['L.O.1', 'L.O.2', 'L.O.3', 'L.O.4']);
const tab = ref<String>('');
</script>
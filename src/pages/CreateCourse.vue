<template>
    <top-bar></top-bar>
    <v-container>
        <h1>Create course</h1>
        <div class="border-sm px-3 py-5 rounded-lg mt-4">
            <div class="d-flex flex-row">
                <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-info-circle</v-icon>
                <h3 class="my-auto text-primary">General Information</h3>
            </div>
            <v-row class="mt-4">
                <v-col cols="3">
                    <v-text-field
                        label="Course code"
                        variant="outlined"
                        color="sub"
                        bg-color="#F3F4F6"
                        density="comfortable"
                        v-model="state.courseCode"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        label="Course name"
                        variant="outlined"
                        color="sub"
                        bg-color="#F3F4F6"
                        density="comfortable"
                        v-model="state.courseName"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        bg-color="#F3F4F6"
                        label="Department"
                        color="sub"
                        variant="outlined"
                        density="comfortable"
                        v-model="state.department"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex flex-row mt-4">
                <v-icon class="my-auto mr-2 text-sub" size="small">far fa-calendar</v-icon>
                <h3 class="my-auto text-primary">Learning outcomes</h3>
            </div>
            <v-table>
                <thead>
                    <tr>
                        <th>Outcome</th>
                        <th>Threshold</th>
                        <th class="w-50">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, idx) in state.outcomes" :key="idx" >
                        <td>
                            <v-text-field
                                rounded="md"
                                bg-color="#F3F4F6"
                                color="sub"
                                variant="outlined"
                                placeholder="Outcome (e.g, L.O.1.1)"
                                class="mt-2"
                                density="compact"
                                v-model="row.outcome"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                rounded="md"
                                bg-color="#F3F4F6"
                                color="sub"
                                variant="outlined"
                                placeholder="Threshold"
                                class="mt-2"
                                density="compact"
                                v-model="row.threshold"
                            ></v-text-field>
                        </td>
                        <td class="w-50">
                            <v-text-field
                                rounded="md"
                                bg-color="#F3F4F6"
                                color="sub"
                                variant="outlined"
                                placeholder="Description"
                                class="mt-2"
                                density="compact"
                                v-model="row.description"
                            ></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-btn variant="plain" @click.prevent="addOutcome()" class="text-none text-primary" prepend-icon="fas fa-plus">Add more outcomes</v-btn>
        </div>
        <div class="mt-2 text-right">
            <v-btn
                variant="plain"
                append-icon="fas fa-arrow-right"
                class="text-none bg-primary"
                text="Save"
                @click.prevent="submitCreateCourse"
            ></v-btn>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { CreateNotification } from '@/utils/notification';
import { stat } from 'fs';
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';

const createNotification = <CreateNotification>inject('create-notification');

const state = reactive({
    courseCode: '' as string,
    courseName: '' as string,
    department: '' as string,
    outcomes: [
        { outcome: '' as string, threshold: 5 as number, description: '' as string }
    ]
})

function addOutcome() {
    state.outcomes.push({ outcome: '', threshold: 5, description: '' });
}

const router = useRouter();
async function submitCreateCourse() {
    // Create new course
    await http.post(`/api/courses/`, {
        course_code: state.courseCode,
        course_name: state.courseName,
        department: state.department
    })
    .then(async function(response: any) {
        // Create list outcomes for new course
        let validOutcomes = state.outcomes.filter(x => x.outcome !== '')
            .map(x => { 
                return { outcome_code: x.outcome, outcome_description: x.description, threshold: x.threshold, parent_outcome: x.outcome.substring(0, 5) } 
            });
        console.log('Valid outcomes ', validOutcomes)
        await http.post(`/api/courses/${state.courseCode}/outcomes/create`, validOutcomes)
            .then(function () {
                createNotification({
                    type: 'success',
                    message: `Create new course successfully!`
                });

                // Redirect to homepage
                setTimeout(() => {
                    router.push({ name: 'course-home' })
                }, 3000);
            })
    })
    .catch(function() {
        createNotification({
            type: 'error',
            message: `Failed to create new course!`
        });
    })
}
</script>
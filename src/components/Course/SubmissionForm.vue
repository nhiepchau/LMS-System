<template>
    <v-tabs v-model="tab" class="w-100" >
        <v-tab class="text-none" value="Submissions">
            <v-icon>fas fa-circle-check</v-icon>&nbsp;
            Submissions</v-tab>
        <v-tab class="text-none" value="LODistribution">LO Distribution</v-tab>
    </v-tabs>
    <v-window class="mt-3 w-100" v-model="tab">
        <v-window-item value="Submissions">
            <div class="mt-3 w-100">
                <h3>Classes</h3>
                <p>Exercise for each class</p>

                <div class="d-flex flex-row mt-5">
                    <v-tabs direction="vertical" v-model="verticalTab" class="w-25" >
                        <v-tab v-for="(val, idx) in classes" :key="idx" :value="val.Name">
                            {{ val.Name }}
                        </v-tab>
                    </v-tabs>
                    <v-window v-model="verticalTab" class="border-sm rounded w-75 pa-4" style="height: 250px; ; margin-top: -70px;" >
                        <v-window-item v-for="(val, idx) in classes" :key="idx" :value="val.Name">
                            <div class="d-flex flex-row text-primary">
                                <v-icon class="mr-2">fas fa-file-alt</v-icon>
                                <h3>Submissions file</h3>
                            </div>
                            <div class="mt-15">
                                <file-input :idx="idx" type="Submission" ></file-input>
                            </div>
                        </v-window-item>
                    </v-window>
                </div>
            </div>
        </v-window-item>
        <!-- Break tabs -->
        <v-window-item value="LODistribution">
            <div class="mt-3">
                <h3>Distribution</h3>
                <p>Exercise for each class</p>
            </div>

            <div class="d-flex flex-row mt-5">
                <v-tabs direction="vertical" v-model="verticalTab" class="w-25" >
                    <v-tab v-for="(val, idx) in classes" :key="idx" :value="val.Name">
                        {{ val.Name }}
                    </v-tab>
                </v-tabs>
                <v-window v-model="verticalTab" class="border-sm rounded w-75 pa-4" style="height: 400px; margin-top: -70px;">
                    <v-window-item v-for="(val, idx) in classes" :key="idx" :value="val.Name">
                        <h3 class="text-primary">Learning outcome distribution</h3>
                        <p class="text-dark-grey text-sm-body-2">Loading learning outcome details from your data</p>
                        <div class="text-center mt-10" v-if="loading">
                            <v-progress-circular
                                :size="70"
                                :width="7"
                                color="dark-grey"
                                indeterminate
                            ></v-progress-circular>
                            <p class="mt-5">Just one second</p>
                        </div>
                        <distribution-form v-else :outcomes="outcomes" :classIdx="idx"></distribution-form>
                    </v-window-item>
                </v-window>
            </div>
        </v-window-item>
    </v-window>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useCourse from '@/services/course';
import http from '@/utils/http';

const tab = ref<String>('');
const verticalTab = ref<String>('');

const loading = ref<Boolean>(true);
const manageCourse = useCourse();
const courseCode = manageCourse.selectedCourse.CourseCode;
const classes = manageCourse.getValidClasses();
const outcomes = ref<Array<{ pk: number, outcome_code: string, parent_outcome: string, threshold: number }>>();

onMounted(() => {
    getOutcomes();
});

async function getOutcomes() {
    // Naive approach
    await http.get(`/api/courses/${courseCode}/outcomes`)
        .then(function(response) {
            loading.value = false;
            const { data } = response
            outcomes.value = data.map((x: { pk: any, outcome_code: any, parent_outcome: any, threshold: any }) => {
                return {
                    pk: x.pk,
                    outcome_code: x.outcome_code,
                    parent_outcome: x.parent_outcome,
                    threshold: x.threshold
                }
            })
        });
}
</script>@/interface/CourseModel
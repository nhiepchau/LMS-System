<template>
    <div class="pa-4 border-sm rounded-lg" v-bind="$attrs">
        <div class="d-flex flex-row justify-space-between w-100">
            <h3 class="w-66">{{ props.title }}</h3>
        </div>

        <div class="d-flex flex-row mt-2 mb-2">
            <div style="width: 50%; height: 300px;">
                <div class="d-flex flex-row justify-space-between">
                    <div class="w-33">
                        <v-select
                            label="Outcome"
                            v-model="chartOutcome"
                            :items="outcomes"
                            variant="solo"
                            bg-color="#F3F4F6"
                            flat
                            density="compact"
                            @update:model-value="(value) => { getChartData(props.classCode); }"
                        ></v-select>
                    </div>
                    <div class="mt-2 font-italic font-weight-medium text-dark-brown">Average progress outcome: {{ state.averageProgress * 100 }}%</div>
                </div>
                <!-- Draw chart -->
                <Bar
                    id="my-chart-id"
                    :options="chartOptions"
                    :data="currentChartData"
                />
            </div>
            <v-divider vertical class="mx-4" style="height: 360px;" ></v-divider>
            <div style="width: 50%; height: 300px;">
                <div class="w-33 text-right">
                    <v-select
                        label="Student ID"
                        v-model="selectStudent"
                        :items="students?.map(x => x.student_id)"
                        variant="solo"
                        density="compact"
                        class="mr-2"
                        bg-color="#F3F4F6"
                        flat
                        @update:model-value="(value) => { getSecondChartData(props.classCode, value); getSuggestExercises(props.classCode, value); }"
                    ></v-select>
                </div>
                <!-- Draw chart -->
                <Bar
                    id="my-chart-id"
                    :options="secondChartOptions"
                    :data="currentSecondChartData"
                />
            </div>
        </div>

        <div class="w-100 mt-5">
            <h3>Suggested Exercises for Student</h3>
            <div class="mt-3 d-flex flex-row justify-space-between">
                <div class="w-25">
                    <v-select
                        label="Outcome"
                        v-model="selectOutcome"
                        :items="outcomes"
                        variant="solo"
                        bg-color="#F3F4F6"
                        flat
                        density="compact"
                    ></v-select>
                </div>
                <div class="w-66">
                    <exercise-item v-for="exercise in questions"
                        :exerciseCode="exercise.exercise_code"
                        :exerciseName="exercise.exercise_name"
                    ></exercise-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, reactive, ref, watch } from 'vue';
import http from '@/utils/http';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const selectStudent = ref<number>();
const chartOutcome = ref<string>('');
const selectOutcome = ref<string>('');
const outcomes = ref<string[]>();
const students = ref<Array<{ student_id: number, secured_student_id: number, first_name: string, last_name: string }>>();
const questions = ref<Array<{ exercise_id: number, exercise_code: string, exercise_name: string, level: number }>>();

const props = defineProps({
    title: {
        type: String,
        default: 'Statistics'
    },
    classCode: {
        type: String,
        default: ''
    },
    numOfLab: {
        type: Number,
        default: 0
    }
});

const state = reactive({
    averageProgress: 0,
    chartData: {
        labels: [] as string[],
        datasets: [
            {
                label: '',
                backgroundColor: '',
                data: [] as any[],
                barThickness: 0,
                borderWidth: 0
            }
        ]
    },
    secondChartData: {
        labels: [] as string[],
        datasets: [
            {
                label: '',
                backgroundColor: '',
                data: [] as any[],
                barThickness: 0,
                borderWidth: 0
            }
        ]
    }
})

const currentChartData = computed(() => {
    return state.chartData;
})

const currentSecondChartData = computed(() => {
    return state.secondChartData;
})

async function getStudentsByClass(classCode: string) {
    await http.get(`/api/classes/${classCode}/students`)
    .then(function(response) {
        const { data } = response
        students.value = data.map((x: { student_id: any, secured_student_id: any, first_name: any, last_name: any }) => {
            return {
                student_id: x.student_id,
                secured_student_id: x.secured_student_id,
                first_name: x.first_name,
                last_name: x.last_name
            }
        })

        selectStudent.value = students.value?.at(0)?.student_id ?? 0;
        if (selectStudent.value) {
            getSecondChartData(props.classCode, selectStudent.value);
            getSuggestExercises(props.classCode, selectStudent.value);
        }
    })
}

async function getChartData(classCode: string) {
    await http.get(`/api/classes/${classCode}/outcomes/${chartOutcome.value}/histogram`)
    .then(function(response) {
        const { data } = response;
        state.chartData = {
            labels: ["0 - 0.2", "0.2 - 0.4", "0.4 - 0.6", "0.6 - 0.8", "0.8 - 1"],
            datasets: [
                {
                    label: 'Number of student',
                    backgroundColor: '#4EA699',
                    data: [data["0 - 0.2"], data["0.2 - 0.4"], data["0.4 - 0.6"], data["0.6 - 0.8"], data["0.8 - 1"]],
                    barThickness: 30,
                    borderWidth: 1
                }
            ]
        };
        state.averageProgress = data["average"]
    });
}

async function getSecondChartData(classCode: string, student: number) {
    const lastLabVal = `${props.numOfLab}-post`;
    await http.get(`/api/classes/${classCode}/students/${student}/from/${lastLabVal}/to/${lastLabVal}/progress`)
    .then(function(response) {
        const { data } = response
        const passed = outcomes.value?.map((x: string) => {
            return data[x][0] * 100
        });
        const failed = passed?.map((x: number) => 100 - x);
        state.secondChartData = {
            labels: outcomes.value ?? [],
            datasets: [
                {
                    label: 'Passed',
                    backgroundColor: '#222E50',
                    data: passed ?? [],
                    barThickness: 20,
                    borderWidth: 1
                },
                {
                    label: 'Failed',
                    backgroundColor: '#C8D6F9',
                    data: failed as [],
                    barThickness: 20,
                    borderWidth: 1
                }
            ]
        };
    });
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

function compareString (a: string, b: string) {
    return ('' + a).localeCompare(b);
}

async function getOutcomesByCourse(classCode: string) {
    const courseCode = classCode.substring(6, 12);
    await http.get(`/api/courses/${courseCode}/outcomes`)
    .then(function(response) {
        const { data } = response
        outcomes.value = data.map((x: { outcome_code: any }) => x.outcome_code).sort(compareString);

        // Update default outcome
        chartOutcome.value = outcomes.value?.at(0) ?? '';
        selectOutcome.value = outcomes.value?.at(0) ?? '';

        if (chartOutcome.value) {
            getChartData(props.classCode);
        }
    });
}

const chartOptions : any = {
    responsive: true,
    maintainAspectRatio: false
}

const secondChartOptions : any = {
    responsive: true,
    indexAxis: 'x',
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            max: 100,
            beginAtZero: true,
            ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value: any, index: any, ticks: any) {
                        return value + '%';
                    }
                }
        }
    }
}

watch(() => props.classCode, () => {
    getChartData(props.classCode);
    getStudentsByClass(props.classCode);
    getOutcomesByCourse(props.classCode);
})

</script>
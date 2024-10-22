<template>
    <div class="pa-4 border-sm rounded-lg" v-bind="$attrs">
        <div class="d-flex flex-row justify-space-between w-100">
            <h3 class="w-66">{{ props.title }}</h3>
        </div>

        <div class="mt-2 mb-2">
            <div class="w-100">
                <div class="mt-2 font-italic text-dark-brown"><span class="font-weight-medium">Average progress outcome:</span> <span v-for="avg in state.averageProgress">{{ avg.outcome }} ({{ avg.progress * 100 }}%). </span></div>
                <!-- Draw chart -->
                <Bar
                    id="my-chart-id"
                    :options="chartOptions"
                    :data="currentChartData"
                />
            </div>
            <!-- <v-divider vertical class="mx-4" style="height: 360px;" ></v-divider> -->
        </div>
    </div>
    <div class="pa-4 border-sm rounded-lg mt-6">
        <h3>Suggested Exercises for Student</h3>
        <div class="d-flex flex-row mt-2 mb-2">
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
            <v-divider vertical class="mx-4" style="height: 300px; margin-top: 60px;" ></v-divider>
            <div style="width: 50%; height: 300px;">
                <div class="mt-3">
                    <div class="w-25">
                        <v-select
                            label="Outcome"
                            v-model="selectOutcome"
                            :items="outcomes"
                            variant="solo"
                            bg-color="#F3F4F6"
                            flat
                            density="compact"
                            @update:model-value="(value) => { getSuggestExercises(props.classCode, selectStudent ?? 0); }"
                        ></v-select>
                    </div>
                    <div class="w-100">
                        <exercise-item v-for="(exercise, idx) in questions?.slice(0, 7)"
                            :index="idx"
                            :exerciseCode="exercise.exercise_code"
                            :exerciseName="exercise.exercise_name"
                            :exerciseId="exercise.exercise_id"
                            :level="getTitle(exercise.level)"
                            :topic="exercise.topic"
                            :url="exercise.url"
                            :outcome="exercise.outcome"
                        ></exercise-item>
                    </div>
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
const outcomes = ref<string[]>([]);
const students = ref<Array<{ student_id: number, secured_student_id: number, first_name: string, last_name: string }>>();
const questions = ref<Array<{ exercise_id: number, exercise_code: string, exercise_name: string, level: number, topic: string, url: string, outcome: string }>>();

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
    averageProgress: [] as { outcome: string, progress: number }[],
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

function getTitle(value: number) {
    if (value === 3) return 'Hard'
    else if (value === 2) return 'Medium'
    else return 'Easy'
}

const chartColors = [
    {
        'primary': '#4EA699',
        'sub': '#D3FFD3'
    },
    {
        'primary': '#6F9CEB',
        'sub': '#D3E1FF'
    },
    {
        'primary': '#E15358',
        'sub': '#FFD3D3'
    },
    {
        'primary': '#FF7818',
        'sub': '#FFD2B2'
    },
    {
        'primary': '#663A82',
        'sub': '#BCA0DC'
    },
    {
        'primary': '#4F4F4F',
        'sub': '#BABABA'
    }
]

async function getChartData(classCode: string) {
    await http.get(`/api/classes/${classCode}/outcomes/all/histogram`)
    .then(function(response) {
        const { data } = response;
        state.chartData = {
            labels: ["0 - 0.2", "0.2 - 0.4", "0.4 - 0.6", "0.6 - 0.8", "0.8 - 1"],
            datasets: data.map((x: any, index: number) => {
                return {
                    label: x["outcome_code"],
                    backgroundColor: chartColors[index].primary,
                    data: [x["0 - 0.2"], x["0.2 - 0.4"], x["0.4 - 0.6"], x["0.6 - 0.8"], x["0.8 - 1"]],
                    barThickness: 20,
                    borderWidth: 1
                }
            })
        };
        state.averageProgress = data.map((x: any) => {
            return {
                outcome: x["outcome_code"],
                progress: x["average"]
            }
        })
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
    await http.get(`/api/classes/${classCode}/outcomes/${selectOutcome.value}/students/${student}/recommend`)
    .then(function(response) {
        const { data } = response;
        questions.value = data.map((x: { exercise_id: any, exercise_code: any, exercise_name: any, level: any, topic: any, url: any, outcome: any }) => {
            return {
                exercise_id: x.exercise_id,
                exercise_code: x.exercise_code,
                exercise_name: x.exercise_name,
                level: x.level,
                topic: x.topic,
                url: x.url,
                outcome: x.outcome
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

        if (selectOutcome.value) {
            getSuggestExercises(props.classCode, selectStudent.value ?? 0);
        }
    });
}

const chartOptions : any = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        y: {
            beginAtZero: true
        }
    }
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
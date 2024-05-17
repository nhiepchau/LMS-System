<template>
    <div class="pa-4 border-sm rounded-lg" v-bind="$attrs">
        <div class="d-flex flex-row justify-space-between w-100">
            <h3 class="mt-2 w-66">{{ props.title }}</h3>
            <v-select
                label="Class"
                v-model="selectClass"
                :items="props.classes.map(x => x.classCode)"
                variant="solo"
                density="compact"
                class="mr-2"
                bg-color="#F3F4F6"
                flat
                @update:model-value="(value) => { getChartData(value); getStudentsByClass(value); }"
            ></v-select>
            <v-select
                label="Student ID"
                v-model="selectStudent"
                :items="students?.map(x => x.student_id)"
                variant="solo"
                density="compact"
                class="mr-2"
                bg-color="#F3F4F6"
                flat
                @update:model-value="(value) => { getSecondChartData(selectClass, value); getSuggestExercises(selectClass, value); }"
            ></v-select>
        </div>

        <div class="d-flex flex-row mt-2">
            <div style="width: 65%;" class="mr-5">
                <!-- Draw chart -->
                <Bar
                    id="my-chart-id"
                    :options="chartOptions"
                    :data="currentChartData"
                />
            </div>
            <div style="width: 31%; height: 363px;">
                <!-- Draw chart -->
                <Bar
                    id="my-chart-id"
                    :options="secondChartOptions"
                    :data="currentSecondChartData"
                />
            </div>
        </div>

        <div class="w-100 mt-8">
            <h3>Suggested Exercises for Student</h3>
            <div class="mt-3">
                <exercise-item v-for="exercise in questions"
                    :exerciseCode="exercise.exercise_code"
                    :exerciseName="exercise.exercise_name"
                ></exercise-item>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, onUpdated, reactive, ref, watch } from 'vue';
import http from '@/utils/http';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const selectClass = ref<string>('');
const selectStudent = ref<number>();
const outcomes = ref<string[]>();
const students = ref<Array<{ student_id: number, secured_student_id: number, first_name: string, last_name: string }>>();
const questions = ref<Array<{ exercise_id: number, exercise_code: string, exercise_name: string, level: number }>>();

const props = defineProps({
    title: {
        type: String,
        default: 'Statistics'
    },
    classes: {
        type: Array<{ classCode: string, name: string, num_of_lab: number }>,
        default: []
    }
});

const state = reactive({
    chartData: {
        labels: [],
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

        if (!selectStudent.value) {
            selectStudent.value = students.value?.at(0)?.student_id ?? 0;
            getSecondChartData(selectClass.value, selectStudent.value);
            getSuggestExercises(selectClass.value, selectStudent.value);
        }
    })
}

function compareString (a: string, b: string) {
    return ('' + a).localeCompare(b);
}

async function getChartData(value: string) {
    const last_lab = props.classes.find(x => x.classCode === value);
    if (last_lab) {
        await http.get(`/api/classes/${value}/labs/${last_lab.num_of_lab}-post/overview`)
        .then(function(response) {
            const { data } = response;
            outcomes.value = data.outcomes.sort(compareString);
            state.chartData = {
                labels: data.outcomes.sort(compareString),
                datasets: [
                    {
                        label: 'Passed',
                        backgroundColor: '#4EA699',
                        data: data.passed ?? [],
                        barThickness: 20,
                        borderWidth: 1
                    },
                    {
                        label: 'Failed',
                        backgroundColor: '#C2D1CF',
                        data: data.failed ?? [],
                        barThickness: 20,
                        borderWidth: 1
                    }
                ]
            };
        });
    }
}

async function getSecondChartData(classCode: string, student: number) {
    const last_lab = props.classes.find(x => x.classCode === classCode);
    if (last_lab) {
        const lastLabVal = `${last_lab.num_of_lab}-post`;
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

const chartOptions : any = {
    responsive: true,
    indexAxis: 'y',
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true
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

onUpdated(() => {
    if (!selectClass.value) {
        selectClass.value = props.classes.at(0)?.classCode ?? '';
        getChartData(selectClass.value);
        getStudentsByClass(selectClass.value);
    }
})

</script>
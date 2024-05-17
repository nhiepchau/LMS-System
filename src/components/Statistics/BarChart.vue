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
                @update:model-value="(value) => getChartData(value)"
            ></v-select>
        </div>

        <div class="mt-2">
            <!-- Draw chart -->
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="currentChartData"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import http from '@/utils/http';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const selectClass = ref<string>('');

const props = defineProps({
    title: {
        type: String,
        default: 'Statistics'
    },
    classes: {
        type: Array<{ classCode: string, name: string, num_of_lab: number }>,
        default: []
    },
    isStacked: {
        type: Boolean,
        default: false
    }
});

const state = reactive({
    chartData: {
        labels: [],
        datasets: [
            {
                label: '',
                backgroundColor: '',
                data: [],
                barThickness: 0,
                borderWidth: 0
            }
        ]
    }
})

const currentChartData = computed(() => {
    return state.chartData;
})


async function getChartData(value: string) {
    const last_lab = props.classes.find(x => x.classCode === value);
    if (last_lab) {
        await http.get(`/api/classes/${value}/labs/${last_lab.num_of_lab}-post/overview`)
        .then(function(response) {
            const { data } = response
            state.chartData = {
                labels: data.outcomes,
                datasets: [
                    {
                        label: 'Passed',
                        backgroundColor: '#4EA699',
                        data: data.passed ?? [],
                        barThickness: 25,
                        borderWidth: 1
                    },
                    {
                        label: 'Failed',
                        backgroundColor: '#4F4F4F',
                        data: data.failed ?? [],
                        barThickness: 25,
                        borderWidth: 1
                    }
                ]
            };
        });
    }
}

const chartOptions : any = !props.isStacked ? {
    responsive: true,
    maintainAspectRatio: true,
} : {
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

onUpdated(() => {
    if (!selectClass.value) {
        selectClass.value = props.classes.at(0)?.classCode ?? '';
        getChartData(selectClass.value);
    }
})

</script>
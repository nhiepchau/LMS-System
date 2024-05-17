<template>
    <div class="mt-4 d-flex flex-row w-100 justify-space-between">
        <div class="w-33 d-flex flex-row">
            <!-- <v-select
                label="Student"
                :items="['2012715']"
                variant="solo"
                density="compact"
                class="mr-2 w-25"
                bg-color="#F3F4F6"
                flat
            ></v-select> -->
            <v-select
                label="Outcomes"
                v-model="outcomes"
                :items="allOutcomes"
                variant="solo"
                bg-color="#F3F4F6"
                flat
                multiple
                density="compact"
                single-line
                @update:model-value="() => redrawChart()"
            >
                <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 2" class="text-sm-caption">
                        <span>{{ item.title }}</span>
                    </v-chip>
                    <span
                        v-if="index === 2"
                        class="text-dark-grey text-sm-caption align-self-center"
                    >
                        (+{{ outcomes.length - 2 }} others)
                    </span>
                </template>
            </v-select>
        </div>
        <div class="d-flex flex-row">
            <v-select
                label="Start lab"
                v-model="startLab"
                :items="getLabs()"
                variant="solo"
                density="compact"
                class="mr-2"
                bg-color="#F3F4F6"
                flat
            ></v-select>
            <v-select
                label="End lab"
                v-model="endLab"
                :items="currentEndLabs"
                variant="solo"
                density="compact"
                bg-color="#F3F4F6"
                flat
                @update:model-value="() => getChartData()"
            ></v-select>
        </div>
    </div>
    <div class="pa-4 border-sm rounded-lg" v-bind="$attrs">
        <Line :data="currentChartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { computed, reactive, ref } from 'vue';
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
    studentId: {
        type: Number,
        default: 0
    },
    classCode: {
        type: String,
        default: ''
    },
    numOfLab: {
        type: Number,
        default: 0
    },
    startLab: {
        type: String,
        default: ''
    },
    endLab: {
        type: String,
        default: ''
    }
});

const state = reactive({
    chartData: {
        labels: [] as string[],
        datasets: [
            {
                label: '',
                backgroundColor: '',
                data: [] as number[]
            }
        ]
    },
    filterChartData: {
        labels: [] as string[],
        datasets: [
            {
                label: '',
                backgroundColor: '',
                data: [] as number[]
            }
        ]
    }
})

const currentChartData = computed(() => {
    return state.filterChartData;
})

const startLab = ref<string>(props.startLab);
const endLab = ref<string>(props.endLab);

const outcomes=ref<string[]>([]);
const allOutcomes = ref<string[]>([]);

function getLabs() {
    const num_labs = Array.from({length: props.numOfLab}, (_, i) => i + 1).map(x => x);
    let result = [] as string[]
    num_labs.forEach(lab => {
        result.push(`${lab}-pre`)
        result.push(`${lab}-in`)
        result.push(`${lab}-post`)
    })

    return result;
}

function getIntervalLabs() {
    let result = getLabs();

    const startIndex = result.findIndex(x => x === startLab.value);
    const endIndex = result.findIndex(x => x == endLab.value);
    
    if (startIndex > endIndex) {
        endLab.value = result.at(startIndex) ?? ''
    }

    return result.slice(startIndex, endIndex + 1);
}

const currentEndLabs = computed(() => {
    let result = getLabs();

    const startIndex = result.findIndex(x => x === startLab.value);
    const endIndex = result.findIndex(x => x == endLab.value);
    
    if (startIndex > endIndex) {
        endLab.value = result.at(startIndex) ?? ''
    }

    if (startLab.value && endLab.value) {
        getChartData();
    }

    return result.slice(startIndex);
})

function compareString (a: string, b: string) {
    return ('' + a).localeCompare(b);
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

async function getChartData() {
    await http.get(`/api/classes/${props.classCode}/students/${props.studentId}/from/${startLab.value}/to/${endLab.value}/progress`)
    .then(function(response) {
        const { data } = response
        allOutcomes.value = Object.keys(data).filter(x => x.toString().includes('L.O') && !x.toString().includes('max'))
            .sort(compareString)

        if (outcomes.value.length <= 0) {
            outcomes.value = allOutcomes.value.filter((val, index) => index < 2);
        }

        // Calculate chart data
        let chartData = allOutcomes.value.map((x, index) => {
                return {
                    label: x,
                    backgroundColor: chartColors[index]['primary'],
                    borderColor: chartColors[index]['primary'],
                    data: data[x].map((y: number) => y * 100)
                }
            })
            
        chartData.push(...allOutcomes.value.map((x, index) => {
                return {
                    label: `max_${x}`,
                    backgroundColor: chartColors[index]['sub'],
                    borderColor: chartColors[index]['sub'],
                    data: data[`max_${x}`].map((y: number) => y * 100)
                }
            }))
        state.chartData = {
            labels: getIntervalLabs(),
            datasets: chartData
        };

        redrawChart();
    });
}

function redrawChart() {
    let validOutcomes = outcomes.value.map(x => x);
    validOutcomes.push(...outcomes.value.map(x => `max_${x}`))

    state.filterChartData = {
        labels: state.chartData.labels,
        datasets: state.chartData.datasets.filter(x => validOutcomes.filter(y => y == x.label).length > 0)
    }
}

const chartOptions : any = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true
      }
    }
}
</script>
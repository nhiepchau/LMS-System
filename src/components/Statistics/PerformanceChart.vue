<template>
    <div class="pa-4 border-sm rounded-lg text-center" v-bind="$attrs">
        <h3 class="my-auto">Student performance report</h3>
        <div class="mt-2 d-flex flex-row justify-space-between">
            <div style="width: 25%;">
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
            <div class="d-flex flex-row" style="width: 30%;">
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
                    @update:model-value="() => { getChartData(); }"
                ></v-select>
            </div>
        </div>
        <div class="d-flex flex-row" >
            <div class="w-66 mr-4">
                <Line :data="currentChartData" :options="chartOptions" />
            </div>
            <div class="w-33">
                <Bar
                    id="my-chart-id"
                    :options="secondChartOptions"
                    :data="currentSecondChartData"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import http from '@/utils/http';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { computed, reactive, ref } from 'vue';
import { Line, Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
)

const props = defineProps({
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
    },
    filterSecondChartData: {
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
    return state.filterChartData;
})

const currentSecondChartData = computed(() => {
    return state.filterSecondChartData;
})

const auth = useAuth();

const startLab = ref<string>('');
const endLab = ref<string>('');
const outcomes=ref<string[]>([]);
const allOutcomes = ref<string[]>([]);
const studentId = auth.user.studentId;

function getLabs() {
    const num_labs = Array.from({length: props.numOfLab}, (_, i) => i + 1).map(x => x);
    let result = [] as string[]
    num_labs.forEach(lab => {
        result.push(`${lab}-pre`)
        result.push(`${lab}-in`)
        result.push(`${lab}-post`)
    })

    // Init default start lab and end lab
    if (!startLab.value && !endLab.value) {
        startLab.value = '1-pre';
        endLab.value = '1-post';
    }

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

// Library chart colors
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

function compareString (a: string, b: string) {
    return ('' + a).localeCompare(b);
}

async function getChartData() {
    await http.get(`/api/classes/${props.classCode}/students/${studentId}/from/${startLab.value}/to/${endLab.value}/progress`)
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

        // Handle second chart data
        const lastLab = getIntervalLabs().length - 1;
        const passed = allOutcomes.value?.map((x: string) => {
            return data[x][lastLab] * 100
        });
        const failed = passed?.map((x: number) => 100 - x);
        state.secondChartData = {
            labels: allOutcomes.value ?? [],
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

    let result = {} as { [key: string]: number }
    allOutcomes.value.forEach((x: string, index) => {
        result[x] = index
    });
    const listIds = outcomes.value.map((x: string) => result[x]);
    state.filterSecondChartData = {
        labels: outcomes.value ?? [],
        datasets: [
                {
                    label: 'Passed',
                    backgroundColor: '#222E50',
                    data: state.secondChartData.datasets.at(0)?.data.filter((x, index) => listIds.includes(index)) ?? [],
                    barThickness: 20,
                    borderWidth: 1
                },
                {
                    label: 'Failed',
                    backgroundColor: '#C8D6F9',
                    data: state.secondChartData.datasets.at(1)?.data.filter((x, index) => listIds.includes(index)) ?? [],
                    barThickness: 20,
                    borderWidth: 1
                }
        ]
    };
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

</script>
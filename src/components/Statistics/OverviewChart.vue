<template>
    <div class="pa-4 border-sm rounded-lg" v-bind="$attrs">
        <div class="d-flex flex-row justify-space-between w-100">
            <h3 class="mt-2">Outcome Progress Overview</h3>
            <div class="d-flex flex-row w-33">
                <v-select
                    label="Lab"
                    v-model="select_lab"
                    :items="getLabs()"
                    variant="solo"
                    density="compact"
                    class="mr-2"
                    bg-color="#F3F4F6"
                    flat
                    @update:model-value="(value) => getChartData(value)"
                ></v-select>
                <v-btn height="40" flat class="text-none text-blue-lighten-2 bg-blue-lighten-5" >View all</v-btn>
            </div>
        </div>

        <div>
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
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import http from '@/utils/http';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const route = useRoute();
const class_code = route.params.class_code;

const props = defineProps({
    num_of_lab: {
        type: Number,
        default: 4
    }
})

const select_lab = ref<string>();
function getLabs() {
    const num_labs = Array.from({length: props.num_of_lab}, (_, i) => i + 1).map(x => x);
    let result = [] as string[]
    num_labs.forEach(lab => {
        result.push(`${lab}-pre`)
        result.push(`${lab}-in`)
        result.push(`${lab}-post`)
    })

    // Update default lab
    if (!select_lab.value) {
        select_lab.value = `${props.num_of_lab}-post`;
    }
    return result
}

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
    console.log('Redraw chart!!!');
    return state.chartData;
})

async function getChartData(lab_val: string) {
    console.log('Retest chart!!!');
    await http.get(`/api/classes/${class_code}/labs/${lab_val}/overview`)
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

onMounted(() => {
    getChartData(select_lab.value ?? '');
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true
}

</script>
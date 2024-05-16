<template>
    <div class="px-4 pt-2 pb-6 border-sm rounded-lg h-100" v-bind="$attrs">
        <div class="d-flex flex-row justify-space-between">
            <h3 class="my-auto w-50">Pass/Fail rates</h3>
            <v-select
                label="Group by:"
                v-model="selectOutcome"
                :items="outcomes?.map(x => x.outcome_code)"
                variant="solo"
                density="compact"
                class="mt-3"
                bg-color="#F3F4F6"
                flat
                @update:model-value="(value) => getProgressOutcome(value)"
            ></v-select>
        </div>

        <div class="mt-2 w-50 mx-auto">
            <!-- Draw chart -->
            <Doughnut
                :options="chartOptions"
                :data="currentChartData"
            />
        </div>

        <div class="d-flex flex-row mt-3 text-sub-chart justify-center">
            <v-icon size="large" class="my-auto">fas fa-location-arrow</v-icon>
            <h2 class="ml-2 my-auto">{{ state.outcomeInfo.rates }}%</h2>
        </div>

        <div class="mt-2">
            <div class="d-flex flex-row">
                <v-icon class="my-auto mr-3" color="#4EA699" size="small">fas fa-check</v-icon>
                <p class="my-auto text-lg-body-2">Threshold: {{ state.outcomeInfo.threshold }} points.</p>
            </div>
            <div class="d-flex flex-row mt-1">
                <v-icon class="mr-3" color="#4EA699" size="small">fas fa-check</v-icon>
                <p class="my-auto text-lg-body-2">Contribution from labs: {{ state.outcomeInfo.labs.map(x => `${x.lab} (${x.contribution})`).join(', ') }}.</p>
            </div>
            <div class="d-flex flex-row mt-1">
                <v-icon class="my-auto mr-3" color="#4EA699" size="small">fas fa-check</v-icon>
                <p class="my-auto text-lg-body-2">{{ state.outcomeInfo.rates }}% students passed {{ selectOutcome }}.</p>
            </div>
            <div class="d-flex flex-row mt-1">
                <v-icon class="my-auto mr-3" color="#DE3B40" size="small">fas fa-times</v-icon>
                <p class="my-auto text-lg-body-2">{{ 100 - state.outcomeInfo.rates }}% students failed {{ selectOutcome }}.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed, onMounted, reactive, ref } from 'vue';
import http from '@/utils/http';
import { useRoute } from 'vue-router';

ChartJS.register(Tooltip, Legend, ArcElement)

const route = useRoute();
const classCode = route.params.class_code;
const courseCode = classCode.toString().substring(6, 12);
const selectOutcome = ref<string>('');
const outcomes = ref<Array<{ pk: number, outcome_code: string, parent_outcome: string, threshold: number }>>();

const state = reactive({
    chartData: {
        labels: ['Pass', 'Fail'],
        datasets: [
            {
                backgroundColor: ['#6F9CEB', '#F3F4F6'],
                data: [0, 0],
                cutout: 40
            }
        ]
    },
    outcomeInfo: {
        threshold: 0 as number,
        rates: 0 as number,
        labs: [] as { lab: string, contribution: number }[]
    }
})
const currentChartData = computed(() => {
    return state.chartData;
}) 

function compareString (a: { outcome_code: string }, b: { outcome_code: string }) {
    return ('' + a.outcome_code).localeCompare(b.outcome_code);
}

async function getOutcomes() {
    // Naive approach
    await http.get(`/api/courses/${courseCode}/outcomes`)
        .then(function(response) {
            const { data } = response
            outcomes.value = data.map((x: { pk: any, outcome_code: any, parent_outcome: any, threshold: any }) => {
                return {
                    pk: x.pk,
                    outcome_code: x.outcome_code,
                    parent_outcome: x.parent_outcome,
                    threshold: x.threshold
                }
            }).sort(compareString)

            if (!selectOutcome.value) {
                selectOutcome.value = outcomes.value?.at(0)?.outcome_code ?? ''
                getProgressOutcome(selectOutcome.value);
            }
        });
}

async function getProgressOutcome(outcome: string) {
    await http.get(`/api/classes/${classCode}/outcomes/${outcome}/progress`)
        .then(function(response) {
            const { data } = response
            state.chartData = {
                labels: ['Pass', 'Fail'],
                datasets: [
                    {
                        backgroundColor: ['#6F9CEB', '#F3F4F6'],
                        data: [data.passed, data.failed],
                        cutout: 40
                    }
                ]
            }
            state.outcomeInfo = {
                threshold: data.threshold,
                rates: data.rate * 100,
                labs: data.labs.map((x: { lab: any, contribution: any }) => {
                    return {
                        lab: x.lab,
                        contribution: x.contribution
                    }
                })
            }

            console.log('State ', state.outcomeInfo)
        });
}


onMounted(() => {
    getOutcomes();
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
}
</script>
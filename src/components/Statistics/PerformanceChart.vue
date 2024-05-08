<template>
    <div class="pa-4 border-sm rounded-lg">
        <div class="d-flex flex-row justify-space-between w-100" v-bind="$attrs">
            <h3 class="my-auto">Student performance report</h3>
            <v-btn variant="plain" class="text-none text-blue-lighten-2" >View all</v-btn>
        </div>

        <div class="mt-2">
            <!-- Draw chart -->
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
    labels: [ 'LO1', 'LO2', 'LO3', 'LO4' ],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#222E50',
            data: [40, 20, 12, 18]
        },
        {
            label: 'Data Two',
            backgroundColor: '#C8D6F9',
            data: [60, 80, 88, 82]
        }
    ]
}

const chartOptions: any = {
    responsive: true,
    indexAxis: 'y'
}

</script>
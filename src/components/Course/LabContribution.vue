<template>
    <v-table>
        <thead class="bg-grey">
            <tr>
                <th class="text-left">LO</th>
                <th class="text-left" v-for="(lab, index) in labs" :key="index">{{ lab }}</th>
                <th class="text-center w-25">Total</th>
                <th class="text-center">Threshold</th>
                <th class="text-center">Edit</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(subLO, idx) in data.weight" :key="idx">
                <td>{{ subLO.subLO }}</td>
                <td v-for="(lab, i) in labs" :key="i" >{{ subLO.labs[i] * 100 }}%</td>
                <td>
                    <v-progress-linear
                        :model-value="totalWeight(subLO.labs)"
                        color="primary"
                        rounded
                    ></v-progress-linear>
                </td>
                <td class="text-center">{{ subLO.threshold }}</td>
                <td class="text-center text-dark-grey">
                    <v-icon size="small">fas fa-edit</v-icon>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const labs = ref<Array<string>>(['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4']);

const props = defineProps({
    outcome: {
        type: String,
        default: ''
    }
});

interface LabWeight {
    subLO: string,
    labs: number[],
    threshold: number
}

interface Contribution {
    weight: LabWeight[]
}

// Data about lab contribution
const data : Contribution = reactive({
    weight: [
        {
            subLO: 'L.O.1.1',
            labs: [0.5, 0.3, 0.1, 0.1],
            threshold: 5
        },
        {
            subLO: 'L.O.1.2',
            labs: [0, 0.5, 0.25, 0],
            threshold: 7
        },
        {
            subLO: 'L.O.1.3',
            labs: [0.3, 0, 0, 0],
            threshold: 5
        },
        {
            subLO: 'L.O.1.4',
            labs: [0.25, 0.25, 0.25, 0.25],
            threshold: 8
        }
    ]
});

// Methods
const totalWeight = (arr: number[]): number => {
    let sum = 0;
    arr.forEach(element => {
       sum += element; 
    });

    return sum * 100;
};
</script>
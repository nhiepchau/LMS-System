<template>
    <v-tabs v-model="tab">
        <v-tab v-for="(LO, index) in LOs" :key="index" :value="LO">{{ LO }}</v-tab>
    </v-tabs>
    <v-window v-model="tab" class="mt-3">
        <v-window-item v-for="(LO, index) in LOs" :key="index" :value="LO">
            <v-table>
                <thead class="bg-grey">
                    <tr>
                        <th class="text-left">LO</th>
                        <th class="text-center" v-for="(lab, index) in labs" :key="index">{{ lab }}</th>
                        <th class="text-center">Total</th>
                        <th class="text-center">Threshold</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(subLO, idx) in data.weight" :key="idx">
                        <td>{{ subLO.subLO }}</td>
                        <td v-for="(lab, i) in labs" :key="i" >
                            <!-- {{ subLO.labs[i] * 100 }}% -->
                            <v-text-field 
                                placeholder="%" 
                                density="compact"
                                flat
                                variant="outlined"
                                class="my-1 text-sm-body-1"
                                color="dark-grey"
                                @update:model-value="value => {
                                    var newArr = subLO.labs;
                                    newArr[i] = parseInt(value);
                                    data.weight[idx].labs = newArr
                                }"
                            >
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-icon size="small">fas fa-bolt</v-icon>&nbsp;
                            {{ totalWeight[idx] }}%
                        </td>
                        <td class="text-center">
                            {{ subLO.threshold }}
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-window-item>
    </v-window>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';

const LOs = ref<Array<string>>(['L.O.1', 'L.O.2', 'L.O.3', 'L.O.4']);
const tab = ref<String>('');
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
            labs: [0, 0, 0, 0],
            threshold: 5
        },
        {
            subLO: 'L.O.1.2',
            labs: [0, 0, 0, 0],
            threshold: 7
        },
        {
            subLO: 'L.O.1.3',
            labs: [0, 0, 0, 0],
            threshold: 5
        },
        {
            subLO: 'L.O.1.4',
            labs: [0, 0, 0, 0],
            threshold: 8
        }
    ]
});

// Methods
const totalWeight = computed(() => {
    let result = Array<Number>()

    data.weight.forEach(x => {
        let sum = 0
        x.labs.forEach(element => {
        sum += element; 
        });

        result.push(sum)
    })

    console.log(result)
    return result;
});
</script>

<style scoped>
.v-input--horizontal {
    grid-template-areas: none !important;
    grid-template-columns: none !important;
    grid-template-rows: none !important;
}

.v-text-field input {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px !important;
}
</style>
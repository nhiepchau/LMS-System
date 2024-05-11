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
                    <tr v-for="(subLO, idx) in data.weight.filter(x => x.subLO.substring(0, 5) == LO).sort(compareString)" :key="idx">
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
                                    console.log('Active tab ', tab, subLO.subLO);
                                    if (subLO.subLO.substring(0, 5) == tab) {
                                        var newArr = subLO.labs;
                                        newArr[i] = parseInt(value);
                                        data.weight[idx].labs = newArr;
                                        updateLatestLabs();
                                    }
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
import LabModel from '@/interface/LabModel';
import useCourse from '@/services/course';
import { reactive, ref, computed, onMounted } from 'vue';

const props = defineProps({
    classIdx: {
        type: Number,
        required: true
    },
    outcomes: {
        type: Array<{ pk: number, outcome_code: string, parent_outcome: string, threshold: number }>,
        default: []
    }
});

function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}

const manageCourse = useCourse();
const LOs = props.outcomes.map(x => x.parent_outcome).filter(onlyUnique);
const tab = ref<String>('');
const numOfLabs = manageCourse.selectedCourse.NumOfLabs;
const labs = Array.from({length: numOfLabs}, (_, i) => i + 1).map(x => `Lab ${x}`);

interface LabWeight {
    subLO: string,
    labs: number[],
    threshold: number
}

interface Contribution {
    weight: LabWeight[]
}

function compareString (a: LabWeight, b: LabWeight) {
    return ('' + a.subLO).localeCompare(b.subLO);
}

// Data about lab contribution
const data : Contribution = reactive({
    weight: props.outcomes.map<LabWeight>(x => {
        return {
            subLO: x.outcome_code,
            labs: Array<number>(numOfLabs),
            threshold: x.threshold
        }
    }).sort(compareString)
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

    return result;
});

function updateLatestLabs() {
    var newLabs = data.weight.flatMap<LabModel>(x => {
        return x.labs.map<LabModel>((l, id) => {
            return {
                LabName: labs[id],
                Outcome: x.subLO,
                Threshold: x.threshold,
                Contribution: l
            }
        });
    });

    console.log('New labs ', newLabs)

    manageCourse.setLabs(props.classIdx, newLabs);
}

onMounted(() => {
    let classVal = manageCourse.getValidClasses()[props.classIdx];
    if (classVal.Labs.length > 0) {
        var first = classVal.Labs.map<LabWeight>(lab => {
            return {
                subLO: lab.Outcome,
                threshold: lab.Threshold,
                labs: []
            }
        });

        classVal.Labs.forEach(e => {
            first.find(x => x.subLO == e.Outcome)?.labs.push(e.Contribution)
        });

        data.weight = first;
    }
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
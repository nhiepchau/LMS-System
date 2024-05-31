<template>
    <v-tabs v-model="tab">
        <v-tab v-for="(LO, index) in LOs" :key="index" :value="LO">{{ LO }}</v-tab>
    </v-tabs>
    <v-window v-model="tab" class="mt-2">
        <v-window-item v-for="(LO, index) in LOs" :key="index" :value="LO">
            <v-data-table-virtual
                :headers="getHeaders()"
                :items="dataTable[LO]"
                item-value="outcome"
            >
                <template v-slot:[`item.lab_${lab}`]="{ item }" v-for="lab in labs">
                    <div
                        class="my-1"
                        v-if="item.labs[lab-1] !== -1"
                    >
                    {{ `${item.labs[lab-1] * 100}%` }}
                    </div>
                    <div v-else>
                        ---
                    </div>
                </template>
                <template v-slot:item.total="{ item }">
                    <v-progress-linear
                        :model-value="getTotalWeight(item) * 100"
                        color="primary"
                        rounded
                        rounded-bar
                        :max="100"
                    ></v-progress-linear>
                </template>
                <template v-slot:item.edit >
                    <v-icon size="small" class="text-dark-grey">fas fa-edit</v-icon>
                </template>
                <template v-slot:item.threshold="{ value }" >
                    {{ value }} <span class="text-dark-grey">/ 10</span>
                </template>
            </v-data-table-virtual>
        </v-window-item>
    </v-window>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, reactive, ref } from 'vue';

const props = defineProps({
    course_code: {
        type: String,
        default: ''
    },
    class_code: {
        type: String,
        default: ''
    },
    num_of_labs: {
        type: Number,
        default: 0
    }
});

onMounted(async () => {
    await getLabContributions();
})

function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}

const dataTable = ref<{ [key: string]: any[] }>({});
const tab = ref<string>('');
const LOs = ref<string[]>();
const labs = Array.from({length: props.num_of_labs}, (_, i) => i + 1).map(x => x);
const labContributions = ref<Array<{ parent_outcome: string, outcome_code: string, threshold: number, labs: number[] }>>();
async function getLabContributions() {
    await http.get(`/api/courses/${props.course_code}/classes/${props.class_code}/labcontributions`)
        .then(function(response) {
            const { data } = response;
            labContributions.value = data.map((x: { parent_outcome: any, outcome_code: any, threshold: any, labs: any }) => {
                return {
                    parent_outcome: x.parent_outcome,
                    outcome_code: x.outcome_code,
                    threshold: x.threshold,
                    labs: x.labs
                }
            });
            LOs.value = data.map((x: { parent_outcome: string }) => x.parent_outcome).filter(onlyUnique).sort(compareString);
            dataTable.value = getDataTable();
            tab.value = LOs.value?.at(0) ?? '';
        });
}

// Methods
function getTotalWeight(item: any) {
    return labs.reduce((prev, cur) => prev + (!item.labs[cur-1] || item.labs[cur-1] === -1 ? 0 :  parseFloat(item.labs[cur-1]) ), 0);
}

function compareString (a: string, b: string) {
    return ('' + a).localeCompare(b);
}

function compareOutcome (a: { outcome: string }, b: { outcome: string }) {
    return ('' + a.outcome).localeCompare(b.outcome);
}

function getHeaders() {
    const labHeaders = labs.map(x => {
        return { title: `Lab ${x}`, align: 'start', sortable: false, key: `lab_${x}`, value: (item: any) => item.labs[x-1] }
    });
    const headers : any = [
        { title: 'LO', align: 'start', key: 'outcome', sortable: false }
    ]
    headers.push(...labHeaders)
    headers.push(...[
        { title: 'Total', align: 'center', key: 'total', width: 180, sortable: false, value: (item: any) => labs.reduce((prev, cur) => prev + (item.labs[cur-1] !== -1 ? item.labs[cur-1] : 0), 0) },
        { title: 'Threshold', align: 'center', sortable: false, key: 'threshold' },
        { title: 'Edit', align: 'center', sortable: false, key: 'edit' }
    ])

    return headers;
}

function getDataTable() {
    const result = {} as { [key: string]: any[] }
    if (LOs.value && labContributions.value) {
        LOs.value.forEach(outcome => {
            const subLOs = labContributions.value?.filter(x => x.parent_outcome == outcome) ?? [];
            result[outcome] = subLOs.map(sub => {
                return {
                    outcome: sub.outcome_code,
                    labs: sub.labs,
                    threshold: sub.threshold
                }
            })
            .sort(compareOutcome)
        });
    }

    console.log('Contributions ', result)
    return result;
}
</script>

<style scoped>
.v-input--horizontal {
    grid-template-areas: none !important;
}

.v-progress-linear--rounded {
    border-radius: 9999px !important;
}
</style>
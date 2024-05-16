<template>
    <v-tabs v-model="tab">
        <v-tab v-for="(LO, index) in LOs" :key="index" :value="LO">{{ LO }}</v-tab>
    </v-tabs>
    <v-window v-model="tab" class="mt-3">
        <v-window-item v-for="(LO, index) in LOs" :key="index" :value="LO">
            <v-data-table-virtual
                :headers="getHeaders()"
                :items="dataTable[LO]"
                item-value="outcome"
            >
                <template v-slot:[`item.lab_${lab}`]="{ item }" v-for="lab in labs">
                    <v-text-field 
                        placeholder="%" 
                        density="compact"
                        flat
                        variant="outlined"
                        class="my-1 text-sm-body-1"
                        color="dark-grey"
                        :model-value="parseInt(item.labs[lab-1])"
                        @update:model-value="(value) => {
                            item.labs[lab-1] = parseInt(value);
                            updateLabContribution();
                        }"
                        type="number"
                        v-if="item.labs[lab-1] !== -1"
                    >
                    </v-text-field>
                </template>
                <template v-slot:item.total="{ item }">
                    <v-icon size="small">fas fa-bolt</v-icon>&nbsp;
                    {{ getTotalWeight(item) }}%
                </template>
            </v-data-table-virtual>
        </v-window-item>
    </v-window>
</template>

<script setup lang="ts">
import useAuth from '@/services/auth';
import useCourse from '@/services/course';
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue';
import OutcomeModel from '@/interface/OutcomeModel';
import RawOutcomeModel from '@/interface/RawOutcomeModel';

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
const labs = Array.from({length: numOfLabs}, (_, i) => i + 1).map(x => x);

function getHeaders() {
    const labHeaders = labs.map(x => {
        return { title: `Lab ${x}`, align: 'center', sortable: false, width: 120, key: `lab_${x}`, value: (item: any) => item.labs[x-1] }
    });
    const headers : any = [
        { title: 'LO', align: 'start', key: 'outcome', sortable: false }
    ]
    headers.push(...labHeaders)
    headers.push(...[
        { title: 'Total', align: 'center', key: 'total', sortable: false, value: (item: any) => labs.reduce((prev, cur) => prev + (item.labs[cur-1] !== -1 ? item.labs[cur-1] : 0), 0) },
        { title: 'Threshold', align: 'center', sortable: false, key: 'threshold' }
    ])

    return headers;
}

function compareString (a: { outcome: string }, b: { outcome: string }) {
    return ('' + a.outcome).localeCompare(b.outcome);
}

let classVal = manageCourse.getValidClasses()[props.classIdx];
function getDataTable() {
    const result = {} as { [key: string]: any[] }
    if (classVal.RawOutcomes.length > 0) {
        LOs.forEach(outcome => {
            const subLOs = classVal.RawOutcomes.filter(x => x.Outcome.substring(0, 5) == outcome);
            result[outcome] = subLOs.map(sub => {
                return {
                    outcome: sub.Outcome,
                    labs: sub.Labs,
                    threshold: sub.Threshold
                }
            }).sort(compareString)
        });   
    }
    else {
        LOs.forEach(outcome => {
            const subLOs = props.outcomes.filter(x => x.parent_outcome == outcome);
            result[outcome] = subLOs.map(sub => {
                return {
                    outcome: sub.outcome_code,
                    labs: Array.from(Array(numOfLabs).values()).map(x => -1),
                    threshold: sub.threshold
                }
            }).sort(compareString)
        });
    }
    console.log('Result ', result)
    return result;
}

const dataTable = reactive(getDataTable());
onMounted(async () => {
    if (classVal.RawOutcomes.length <= 0) {
        await analyzeLabContribution();
    }
})

// Methods
function getTotalWeight(item: any) {
    return labs.reduce((prev, cur) => prev + (!item.labs[cur-1] || item.labs[cur-1] === -1 ? 0 :  parseInt(item.labs[cur-1]) ), 0);
}

function updateLabContribution() {
    let newOutcomes = [] as OutcomeModel[];
    let newRawOutcomes = [] as RawOutcomeModel[];
    LOs.forEach(lo => {
        dataTable[lo].forEach(item => {
            item.labs.forEach((lab: number, i: number) => {
                if (lab > 0) {
                    newOutcomes.push({
                        Outcome: item.outcome,
                        Lab: i + 1,
                        Contribution: lab / 100.0
                    })
                }
            });

            newRawOutcomes.push({
                Outcome: item.outcome,
                Labs: item.labs,
                Threshold: item.threshold
            })
        })
    })
    console.log('New outcomes ', newOutcomes);
    manageCourse.setOutcomes(props.classIdx, newOutcomes);
    manageCourse.setRawOutcomes(props.classIdx, newRawOutcomes);
}

async function analyzeLabContribution() {
    // Advanced approach: auto analyze lab contribution based on absent/available question
    const formData = new FormData();
    const auth = useAuth();
    const courseCode = manageCourse.selectedCourse.CourseCode;
    if (classVal.Exercise) {
        formData.append("exercise_file", classVal.Exercise);

        const baseUrl = import.meta.env.VITE_APP_API_URL
        // Call API with type form-data
        await axios.post(`${baseUrl}/api/courses/${courseCode}/exercises/analyze`, formData,
        {
            headers: {
                "Authorization": `Bearer ${auth.token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(async function(response) {
            const { data } = response;
            data.forEach((item: { outcome_code: string, threshold: number, labs: string[] }) => {
                const parent_outcome = item.outcome_code.substring(0, 5);
                item.labs.forEach(lab => {
                    const labVal = parseInt(lab.substring(4));
                    dataTable[parent_outcome].find(x => x.outcome === item.outcome_code).labs[labVal-1] = undefined
                })
            });
        })
    }
}
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

.v-table__wrapper thead {
    background-color: grey !important;
}
</style>
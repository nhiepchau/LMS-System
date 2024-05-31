<template>
    <v-card class="w-66 mx-auto text-secondary">
        <v-card-item>
            <div class="d-flex flex-row text-primary mb-2">
                <h2 class="my-auto">{{ props.course_name }}</h2>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">{{ props.course_code }}</v-chip>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">{{ props.department }}</v-chip>
            </div>
            <v-divider />
            <div>
                <div class="d-flex flex-row text-primary my-4">
                    <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-check-circle</v-icon>
                    <h4 class="my-auto">Learning outcome distribution</h4>
                </div>

                <v-tabs v-model="tab">
                    <v-tab v-for="(LO, index) in parentOutcomes" :key="index" :value="LO">{{ LO }}</v-tab>
                </v-tabs>
                <v-window v-model="tab" class="mt-2">
                    <v-window-item v-for="(LO, index) in parentOutcomes" :key="index" :value="LO">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>Outcome</th>
                                    <th>Threshold</th>
                                    <th class="w-50">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, idx) in dataTable[LO]" :key="idx" >
                                    <td>
                                        <v-text-field
                                            rounded="md"
                                            bg-color="#F3F4F6"
                                            color="sub"
                                            variant="outlined"
                                            placeholder="Outcome (e.g, L.O.1.1)"
                                            class="mt-2"
                                            density="compact"
                                            v-model="row.outcome"
                                        ></v-text-field>
                                    </td>
                                    <td>
                                        <v-text-field
                                            rounded="md"
                                            bg-color="#F3F4F6"
                                            color="sub"
                                            variant="outlined"
                                            placeholder="Threshold"
                                            class="mt-2"
                                            density="compact"
                                            v-model="row.threshold"
                                        ></v-text-field>
                                    </td>
                                    <td class="w-50">
                                        <v-text-field
                                            rounded="md"
                                            bg-color="#F3F4F6"
                                            color="sub"
                                            variant="outlined"
                                            placeholder="Description"
                                            class="mt-2"
                                            density="compact"
                                            v-model="row.description"
                                        ></v-text-field>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>
                </v-window>
            </div>
        </v-card-item>
        <v-divider class="my-1" />
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Close"
                class="text-none bg-blue-lighten-5 text-blue-darken-2"
                @click="emit('openDialog', false)"
            ></v-btn>

            <v-btn
                class="text-none bg-primary"
                text="Save"
                @click="emit('openDialog', false)"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { onMounted, ref } from 'vue';

const props = defineProps({
    course_name: String,
    course_code: String,
    department: String
});

const emit = defineEmits<{
    (e: 'openDialog', value: boolean): void
}>();

const tab = ref<string>('');
const dataTable = ref<{ [key: string]: any[] }>({});
const parentOutcomes = ref<Array<string>>();
const outcomes = ref<Array<{ pk: number, outcome_code: string, outcome_description: string, parent_outcome: string, outcome_name: string, threshold: number }>>();

onMounted(() => {
    getOutcomes();
});

function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}

async function getOutcomes() {
    // Naive approach
    await http.get(`/api/courses/${props.course_code}/outcomes`)
        .then(function(response) {
            const { data } = response;
            outcomes.value = data.map((x: { pk: any, outcome_code: any, outcome_description: any, threshold: any, parent_outcome: string, outcome_name: string }) => {
                return {
                    pk: x.pk,
                    outcome_code: x.outcome_code,
                    outcome_description: x.outcome_description,
                    threshold: x.threshold,
                    parent_outcome: x.parent_outcome,
                    outcome_name: x.outcome_name
                }
            })
            parentOutcomes.value = outcomes.value?.map(x => x.parent_outcome).filter(onlyUnique).sort(compareString);
            dataTable.value = getDataTable();
            tab.value = parentOutcomes.value?.at(0) ?? '';
        });
}

function compareString (a: string, b: string) {
    return ('' + a).localeCompare(b);
}

function compareOutcome (a: { outcome: string }, b: { outcome: string }) {
    return ('' + a.outcome).localeCompare(b.outcome);
}

function getDataTable() {
    const result = {} as { [key: string]: any[] }
    if (parentOutcomes.value && outcomes.value) {
        parentOutcomes.value.forEach(outcome => {
            const subLOs = outcomes.value?.filter(x => x.parent_outcome == outcome) ?? [];
            result[outcome] = subLOs.map(sub => {
                return {
                    outcome: sub.outcome_code,
                    description: sub.outcome_description,
                    threshold: sub.threshold
                }
            })
            .sort(compareOutcome)
        });
    }
    return result;
}
</script>
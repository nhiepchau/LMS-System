<template>
    <top-bar />
    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">
                [{{ classCode.substring(6) }}]
                Learning Outcomes
            </h1>
            <div class="d-flex flex-row w-33">
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
                    @update:model-value="() => getOutcomeProgress(currentPage, itemsPerPage)"
                ></v-select>
            </div>
        </div>

        <div>
            <v-text-field 
                v-model="query"
                variant="outlined" color="dark-grey" class="w-50" density="compact" placeholder="Search student id..." hide-details
            ></v-text-field>
        </div>

        <v-data-table-server
            class="border-sm rounded-lg mt-2"
            v-model:page="currentPage"
            v-model:items-per-page="itemsPerPage"
            :items="progresses"
            :headers="currentHeaders"
            :items-length="classInfo?.num_of_students ?? 0"
            :loading="loading"
            item-value="name"
            @update:options="loadItems"
        >
            <template v-slot:item.student="{ value }">
                {{ secureStudentInfo(value, 3, "*") }}
            </template>
            <template v-slot:item.progress="{ value }">
                <v-btn icon flat variant="plain" @click="() => { dialog = true; selectedStudent = value }" >
                    <v-icon size="small" class="text-sub">fas fa-chart-simple</v-icon>
                </v-btn>
            </template>
        </v-data-table-server>

        <v-dialog v-model="dialog">
            <student-detail 
                :studentId="selectedStudent" 
                :startLab="startLab"
                :endLab="endLab"
                :numOfLab="classInfo?.num_of_lab ?? 0" 
                :classCode="classCode"
                @open-dialog="(val: boolean) => dialog = val">
            </student-detail>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const classCode = route.params.class_code.toString();
const startLab = ref<string>('');
const endLab = ref<string>('');
const dialog = ref<boolean>(false);
const query = ref<string>('');

const selectedStudent = ref<number>();
const classInfo = ref<{ num_of_lab: any, num_of_students: any }>();
const outcomes = ref<string[]>([]);
const itemsPerPage = ref(10);
const currentPage = ref(1);
const loading = ref(false);
const progresses = ref<Array<{ student: number, first_name: string, last_name: string, secured_student: string, [key: string]: any }>>();

async function getClassDetail() {
    const courseCode = classCode.substring(6, 12);
    await http.get(`/api/courses/${courseCode}/classes/${classCode}`)
    .then(function(response) {
        const { data } = response;
        classInfo.value = {
            num_of_lab: data.num_of_lab,
            num_of_students: data.num_of_students
        }

        startLab.value = '1-pre';
        endLab.value = '1-post';
        getOutcomeProgress(currentPage.value, itemsPerPage.value);
    })
}

function getLabs() {
    const num_labs = Array.from({length: classInfo.value?.num_of_lab}, (_, i) => i + 1).map(x => x);
    let result = [] as string[]
    num_labs.forEach(lab => {
        result.push(`${lab}-pre`)
        result.push(`${lab}-in`)
        result.push(`${lab}-post`)
    })

    return result;
}

const currentEndLabs = computed(() => {
    let result = getLabs();

    const startIndex = result.findIndex(x => x === startLab.value);
    const endIndex = result.findIndex(x => x == endLab.value);
    
    if (startIndex > endIndex) {
        endLab.value = result.at(startIndex) ?? ''
    }
    
    if (startLab.value && endLab.value) {
        getOutcomeProgress(currentPage.value, itemsPerPage.value);
    }
    return result.slice(startIndex);
})

async function loadItems ({ page, itemsPerPage, sortBy }: any) {
    loading.value = true;
    if (startLab.value && endLab.value) {
        await getOutcomeProgress(page, itemsPerPage);
    }
}

function compareString (a: string, b: string) {
    return ('' + a).localeCompare(b);
}

async function getOutcomeProgress(page: Number, itemsPerPage: Number) {
    const condition = query.value && query.value !== '' ? `&query=${query.value}` : ''
    await http.get(`/api/classes/${classCode}/students/all/from/${startLab.value}/to/${endLab.value}/progress?page=${page}&items=${itemsPerPage}${condition}`)
    .then(function(response) {
        const { data } = response
        outcomes.value = data.length > 0 ? Object.keys(data.at(0)).filter(x => x.toString().includes('L.O') && !x.toString().includes('max'))
            .sort(compareString) : []
        progresses.value = data.map((x: { student: any; first_name: any; last_name: any, secured_student: any, [key: string]: any }) => {
            let  result = {} as any
            result['student'] = x.student;
            result['first_name'] = secureStudentInfo(x.first_name, 1, "x");
            result['last_name'] = secureStudentInfo(x.last_name, 1, "x");
            result['secured_student'] = x.secured_student;

            outcomes.value.forEach(o => {
                result[o] = {
                    start: x[o][0],
                    end: x[o][1],
                    max_start: x[`max_${o}`][0],
                    max_end: x[`max_${o}`][1]
                }
            })
            return result;
        });

        // Update loading
        loading.value = false;
    });
}

function secureStudentInfo(info: any, keep: number, secured_char: string) {
    const first_char = `${info}`.substring(0, keep);
    const len = `${info}`.length;
    return first_char + secured_char.repeat(len - keep);
}

const currentHeaders = computed(() => {
    const outcomeHeaders = outcomes.value.map(x => {
        return { title: x, align: 'center', sortable: false, key: x, value: (item: any) => `${item[x].start} / ${item[x].end}` }
    });
    const headers : any = [
        { title: 'student_id', align: 'start', key: 'student', sortable: false },
        { title: 'first_name', align: 'start', key: 'first_name', sortable: false },
        { title: 'last_name', align: 'start', key: 'last_name', sortable: false },
        { title: 'secured_student_id', align: 'start', key: 'secured_student', sortable: false },
    ]
    headers.push(...outcomeHeaders);
    headers.push(...[
        { title: 'progress', align: 'center', key: 'progress', sortable: false, value: (item: any) => item.student }
    ]);

    return headers;
})

onMounted(async () => {
    await getClassDetail();
})
</script>
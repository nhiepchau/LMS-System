<template>
    <div class="d-flex flex-row">
        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-info-circle</v-icon>
        <h3 class="my-auto text-primary">General Information</h3>
    </div>
    <v-row class="mt-4">
        <v-col cols="6">
            <v-combobox
                label="Course Name"
                :items="courses?.map(x => x.course_name)"
                variant="outlined"
                color="sub"
                bg-color="#F3F4F6"
                density="comfortable"
                v-model="courseName"
                @update:model-value="value => updateCourse(value)"
            ></v-combobox>
        </v-col>
        <v-col cols="3">
            <v-combobox
                label="Semester"
                :items="semesters?.map(x => x.semester_name)"
                variant="outlined"
                color="sub"
                bg-color="#F3F4F6"
                density="comfortable"
                v-model="semester"
                @update:model-value="value => updateSemester(value)"
            ></v-combobox>
        </v-col>
        <v-col cols="3">
            <v-text-field
                bg-color="#F3F4F6"
                label="No. of Lab"
                color="sub"
                placeholder="Enter number of labs"
                variant="outlined"
                density="comfortable"
                v-model="numLabs"
                @update:model-value="value => manageCourse.editCourse('NumOfLabs', parseInt(value))"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <div class="d-flex flex-row mt-4">
        <v-icon class="my-auto mr-2 text-sub" size="small">far fa-calendar</v-icon>
        <h3 class="my-auto text-primary">Classes</h3>
    </div>
    <v-table>
        <thead>
            <tr>
                <th>Class</th>
                <th class="w-50">
                    <div class="d-flex flex-row justify-space-between">
                        <span class="my-auto">Exercises file</span>
                        <v-btn 
                            class="text-none text-sm-caption bg-light-blue" 
                            flat density="compact"
                            @click.prevent="getQuestionSample()"
                            prepend-icon="fas fa-cloud-arrow-down"
                        >Download sample?</v-btn>
                    </div>
                </th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, idx) in state.classes" :key="idx" >
                <td>
                    <v-text-field
                        rounded="md"
                        bg-color="#F3F4F6"
                        color="sub"
                        variant="outlined"
                        placeholder="Class"
                        class="my-2"
                        density="compact"
                        v-model="row.Name"
                        @update:model-value="manageCourse.setClassName(idx, row.Name)"
                    ></v-text-field>
                </td>
                <td class="w-50">
                    <file-input :idx="idx" type="Exercise" ></file-input>
                </td>
                <td>
                    <v-radio-group 
                        color="#4B7BEC"
                        v-model="row.Default"
                        @update:model-value="manageCourse.setClassDefault(idx, row.Default)" 
                    >
                        <v-radio
                            class="text-blue-darken-4" 
                            label="Apply for other classes" 
                        ></v-radio>
                    </v-radio-group>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-btn @click.prevent="addClass()" variant="plain" class="text-none text-primary" prepend-icon="fas fa-plus">Add more class</v-btn>
</template>

<script setup lang="ts">
import useCourse from '@/services/course'
import { reactive, onMounted, ref } from 'vue';
import ClassModel from '@/interface/ClassModel';
import http from '@/utils/http';
import axios from 'axios';
import useAuth from '@/services/auth';

const manageCourse = useCourse();

const courseName = ref<string>('');
const semester = ref<string>('');
const numLabs = ref<number>();

const courses = ref<Array<{ pk: number, course_code: string, course_name: string }>>();
const semesters = ref<Array<{ pk: number, semester_name: string }>>();

const state = reactive({
    classes: [
        {
            Name: '',
            Default: false
        }
    ] as ClassModel[]
})

onMounted(() => {
    getCourses();
    getCourseSemesters();
    var classes = manageCourse.getValidClasses();

    if (classes.length > 0) {
        state.classes = classes
    }

    courseName.value = manageCourse.selectedCourse.CourseName
    semester.value = manageCourse.selectedCourse.Semester
    numLabs.value = manageCourse.selectedCourse.NumOfLabs
});

async function getCourses() {
    const { data } = await http.get('/api/courses');
    courses.value = data.map((x: { pk: any, course_code: any, course_name: any }) => {
        return {
            pk: x.pk,
            course_code: x.course_code,
            course_name: x.course_name,
        }
    })
}

async function getCourseSemesters() {
    const { data } = await http.get('/api/courses/semesters');
    semesters.value = data.map((x: { pk: any, semester_name: any }) => {
        return {
            pk: x.pk,
            semester_name: x.semester_name,
        }
    })
}

async function getQuestionSample() {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    const auth = useAuth();
    await axios.get(`${baseUrl}/api/sample/question/download`,
    {
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            "Content-Type": "multipart/form-data"
        },
        responseType: 'blob'
    }).then(function(response) {
        const blob = new Blob([response.data], { type: 'text/csv' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'Question-Sample.csv'
        link.click()
        URL.revokeObjectURL(link.href)
    })
}

function addClass() {
    state.classes.push({ Name: '', Default: false, Outcomes: [], RawOutcomes: [] });
    manageCourse.addClass({ Name: '', Default: false, Outcomes: [], RawOutcomes: [] })
}

function updateCourse(value: string | undefined) {
    let course = value ?? '';
    manageCourse.editCourse('CourseName', course);
    manageCourse.editCourse('CourseCode', courses.value?.find(x => x.course_name == course)?.course_code ?? '')
}

function updateSemester(value: string | undefined) {
    let semester = value ?? '';
    manageCourse.editCourse('Semester', semester);
    manageCourse.editCourse('SemesterId', semesters.value?.find(x => x.semester_name == semester)?.pk ?? 0)
}
</script>@/interface/CourseModel
<template>
    <div class="d-flex flex-row">
        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-info-circle</v-icon>
        <h3 class="my-auto text-primary">General Information</h3>
    </div>
    <v-row class="mt-4">
        <v-col cols="6">
            <v-combobox
                label="Course Name"
                :items="['Programming Fundamentals', 'Data Structure & Algorithm', 'Web Development', 'Crypto & Cybersecurity']"
                variant="outlined"
                color="sub"
                bg-color="#F3F4F6"
                density="comfortable"
                v-model="courseName"
                @update:model-value="value => manageCourse.editCourse('CourseName', value ?? '')"
            ></v-combobox>
        </v-col>
        <v-col cols="3">
            <v-combobox
                label="Semester"
                :items="['HK232', 'HK231', 'HK222', 'HK221']"
                variant="outlined"
                color="sub"
                bg-color="#F3F4F6"
                density="comfortable"
                v-model="semester"
                @update:model-value="value => manageCourse.editCourse('Semester', value ?? '')"
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
                <th class="w-50">Exercises file</th>
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

const manageCourse = useCourse();

const courseName = ref<string>('');
const semester = ref<string>('');
const numLabs = ref<number>();

const state = reactive({
    classes: [
        {
            Name: '',
            Default: false
        }
    ] as ClassModel[]
})

onMounted(() => {
    var classes = manageCourse.getValidClasses();

    if (classes.length > 0) {
        state.classes = classes
    }

    courseName.value = manageCourse.selectedCourse.CourseName
    semester.value = manageCourse.selectedCourse.Semester
    numLabs.value = manageCourse.selectedCourse.NumOfLabs
});

function addClass() {
    state.classes.push({ Name: '', Default: false });
    manageCourse.addClass({ Name: '', Default: false })
}
</script>@/interface/CourseModel
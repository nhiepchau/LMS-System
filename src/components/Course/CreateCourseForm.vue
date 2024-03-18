<template>
    <div class="d-flex flex-row">
        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-info-circle</v-icon>
        <h3 class="my-auto text-primary">General Information</h3>
    </div>
    <v-row class="mt-4">
        <v-col cols="6">
            <v-text-field
            bg-color="#F3F4F6"
            label="Course Name"
            model-value="Data structure & algorithm"
            variant="solo"
            disabled
            density="comfortable"
            ></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-combobox
                label="Department"
                :items="['CSE', 'Chemistry', 'Physics', 'Math']"
                variant="solo"
                bg-color="#F3F4F6"
                density="comfortable"
                model-value="CSE"
            ></v-combobox>
        </v-col>
        <v-col cols="3">
            <v-text-field
                bg-color="#F3F4F6"
                label="No. of Lab"
                model-value="10"
                variant="solo"
                density="comfortable"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <div class="d-flex flex-row mt-4">
        <v-icon class="my-auto mr-2 text-sub" size="small">far fa-calendar</v-icon>
        <h3 class="my-auto text-primary">Semester</h3>
    </div>
    <v-table>
        <thead>
            <tr>
                <th>Semester</th>
                <th class="w-50">Exercises file</th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="idx in count" :key="idx" >
                <td>
                    <v-text-field
                        rounded="sm"
                        bg-color="#F3F4F6"
                        model-value="231"
                        variant="solo"
                        flat
                        class="my-2"
                        density="compact"
                    ></v-text-field>
                </td>
                <td class="w-50">
                    <file-input></file-input>
                </td>
                <td>
                    <v-radio-group color="#4B7BEC" >
                        <v-radio class="text-blue-darken-4" label="Apply for other semesters" value=""></v-radio>
                    </v-radio-group>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-btn @click.prevent="count++" variant="plain" class="text-none text-primary" prepend-icon="fas fa-plus">Add more semester</v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref<number>(1);
</script>
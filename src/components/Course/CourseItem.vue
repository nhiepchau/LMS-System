<template>
    <v-card
        color="grey-lighten-3"
        variant="outlined"
        class="w-33"
    >
        <v-card-item>
        <div class="text-black w-100">
            <div class="d-flex flex-row">
                <v-img src="../../assets/images/CourseImg2.png" class="my-2 mr-4" />
                <div class="w-75 my-2 d-flex flex-column align-start">
                    <div class="text-caption mb-auto font-weight-bold text-grey-darken-1">CSE</div>
                    <div class="text-h6">
                    {{ props.name }}
                    </div>
                </div>
            </div>
            <v-autocomplete
                bg-color="blue-lighten-5"
                color="blue-darken-2"
                class="w-75 float-end text-blue-darken-2"
                variant="solo"
                flat
                density="compact"
                label="Semester"
                :items="semesters"
                v-model="selectedSemester"
            ></v-autocomplete>
        </div>
        </v-card-item>
        <v-divider />
        <v-card-actions>
            <v-spacer />
            <div class="mr-2">
                <v-btn variant="outlined" width="75" class="text-none text-blue-darken-4">
                    View
                </v-btn>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="flat" width="75" v-bind="activatorProps" class="text-none bg-blue-darken-4">
                            Select
                        </v-btn>
                    </template>
                    <v-card class="w-66 mx-auto">
                        <v-card-item>
                            <div class="d-flex flex-row my-auto">
                                <h2>{{ props.name }}</h2>
                                <v-chip class="ml-4">{{ selectedSemester }}</v-chip>
                            </div>
                            <v-divider />
                            <div class="mt-5">
                                <h3>General Information</h3>
                                <div class="d-flex w-100 mt-3">
                                    <course-info-item class="mr-3" info="4" typeInfo="Labs"></course-info-item>
                                    <course-info-item class="mr-3" info="500" typeInfo="Exercises"></course-info-item>
                                    <course-info-item class="mr-3" info="20" typeInfo="Submission files"></course-info-item>
                                    <course-info-item info="60,000" typeInfo="Submissions"></course-info-item>
                                </div>
                            </div>
                        </v-card-item>
                        <v-divider class="my-4" />
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text="Close"
                                variant="plain"
                                @click="dialog = false"
                            ></v-btn>

                            <v-btn
                                color="primary"
                                text="Save"
                                variant="tonal"
                                @click="dialog = false"
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    semesters: {
        type: Array<string>,
        default: []
    }
});

const selectedSemester = ref<String>(props.semesters.at(0) ?? '')
</script>
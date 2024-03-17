<template>
    <v-card
        color="grey-lighten-3"
        variant="outlined"
        class="w-33"
    >
        <v-card-item>
        <div class="text-secondary w-100">
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
                <v-btn variant="outlined" width="75" class="text-none text-primary">
                    View
                </v-btn>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="flat" width="75" v-bind="activatorProps" class="text-none bg-primary">
                            Select
                        </v-btn>
                    </template>
                    <course-detail @open-dialog="(val: boolean) => dialog = val" :course="props.name" :semester="selectedSemester" ></course-detail>
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
        type: Array<String>,
        default: []
    }
});

const selectedSemester = ref<String>(props.semesters.at(0) ?? '')
</script>
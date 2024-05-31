<template>
    <v-card
        color="grey-lighten-3 bg-blue-lighten-5"
        variant="outlined"
        class="w-33"
    >
        <v-card-item>
        <div class="text-secondary w-100">
            <div class="w-75 my-2 d-flex flex-column align-start">
                <div class="text-caption mb-auto font-weight-bold text-grey-darken-1">[{{ props.department }}] {{ props.course_code }}</div>
                <div class="text-h6">
                {{ props.course_name }}
                </div>
            </div>
        </div>
        </v-card-item>
        <v-divider />
        <v-card-actions>
            <v-spacer />
            <div class="mr-2">
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn variant="outlined" width="75" class="text-none text-primary" v-bind="activatorProps">
                            Edit
                        </v-btn>
                    </template>
                    <course-detail @open-dialog="(val: boolean) => dialog = val" 
                        :course_code="props.course_code"
                        :course_name="props.course_name"
                        :department="props.department"
                    ></course-detail>
                </v-dialog>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);

const props = defineProps({
    course_code: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});
</script>
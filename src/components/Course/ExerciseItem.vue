<template>
    <div class="d-flex flex-row mt-1 justify-space-between" v-bind="$attrs">
        <div class="d-flex flex-row">
            <v-chip class="mr-4 my-auto text-body-2" color="sub">
                <v-icon size="small" class="mr-2" slot:prepend-icon >fas fa-bolt</v-icon>
                {{ props.exerciseCode }}</v-chip>
            <p class="my-auto text-dark-brown text-md-body-2">{{ props.exerciseName }}</p>
        </div>
        <v-dialog v-model="dialog" class="my-auto">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn variant="flat" width="75" v-bind="activatorProps" class="text-none text-md-body-2 text-sub-chart">
                    Details
                </v-btn>
            </template>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);

const props = defineProps({
    exerciseCode: {
        type: String,
        default: ''
    },
    exerciseName: {
        type: String,
        default: ''
    },
    exerciseId: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <v-card class="w-66 mx-auto text-secondary">
        <v-card-item>
            <div class="d-flex flex-row text-primary mb-2">
                <h2 class="my-auto">Outcome Progress (%)</h2>
                <v-icon size="md" class="ml-2 my-auto">fas fa-chevron-right</v-icon>
                <v-chip class="ml-4 my-auto">Student {{ secureStudentInfo(props.studentId, 3, "*") }}</v-chip>
            </div>
            <v-divider />
            <student-progress-chart
                :studentId="props.studentId" 
                :startLab="props.startLab"
                :endLab="props.endLab"
                :numOfLab="props.numOfLab"
                :classCode="props.classCode"
                class="mb-4"
            ></student-progress-chart>
        </v-card-item>
        <v-divider class="my-1" />
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Close"
                class="text-none bg-blue-lighten-5 text-blue-darken-2 mr-4"
                @click="emit('openDialog', false)"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
    studentId: {
        type: Number,
        default: 0
    },
    classCode: {
        type: String,
        default: ''
    },
    numOfLab: {
        type: Number,
        default: 0
    },
    startLab: {
        type: String,
        default: ''
    },
    endLab: {
        type: String,
        default: ''
    }
});

function secureStudentInfo(info: any, keep: number, secured_char: string) {
    const first_char = `${info}`.substring(0, keep);
    const len = `${info}`.length;
    return first_char + secured_char.repeat(len - keep);
}

const emit = defineEmits<{
    (e: 'openDialog', value: boolean): void
}>();
</script>
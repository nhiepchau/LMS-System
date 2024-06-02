<template>
    <div class="d-flex flex-row mt-1 justify-space-between" v-bind="$attrs">
        <div class="d-flex flex-row">
            <v-chip class="mr-4 my-auto text-body-2" color="sub">
                <v-icon size="small" class="mr-2" slot:prepend-icon >fas fa-bolt</v-icon>
                {{ props.exerciseCode }}</v-chip>
            <p class="my-auto text-dark-brown text-md-body-2">{{ props.exerciseName }}</p>
        </div>
        <v-btn @click="openBkelPage()" variant="flat" width="75" class="text-none text-md-body-2 text-sub-chart">
            Details
        </v-btn>
        <!-- <v-dialog v-model="dialog" class="my-auto">
            <template v-slot:activator="{ props: activatorProps }">

            </template>
        </v-dialog> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const other_urls = [
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258504',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258505',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258520',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258508',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258512',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258529',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258532',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258516',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258517',
    'https://lms.hcmut.edu.vn/mod/assign/view.php?id=258533'
]

function openBkelPage() {
    const newUrl = other_urls[props.index % 10]
    window.open(newUrl, '_blank')
}

const dialog = ref(false);

const props = defineProps({
    index: {
        type: Number,
        default: 0
    },
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
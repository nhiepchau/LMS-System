<template>
    <top-bar />
    <v-container>
        <div class="d-flex flex-row w-100 justify-space-between">
            <h1 class="text-primary">Class {{ classCode }}</h1>
            <div>
                <v-btn 
                    :to="`/class/${classCode}/exercise`"
                    variant="outlined" width="145" class="text-none pl-0 text-primary mr-3 justify-space-between" append-icon="fas fa-plus">
                    Exercise
                </v-btn>
                <v-btn 
                    :to="`/class/${classCode}/submission`"
                    variant="flat" class="text-none bg-primary text-white" append-icon="fas fa-chevron-right">
                    Submission
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
const classCode = route.params.class_code
</script>
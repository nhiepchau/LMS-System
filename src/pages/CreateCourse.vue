<template>
    <top-bar></top-bar>
    <v-container>
        <h1>Create classes</h1>
        <bread-crumb :activeIdx="page" class="my-2"></bread-crumb>
        <div class="border-sm px-3 py-5 rounded mt-4">
            <create-course-form v-if="page === 0" ></create-course-form>
            <submission-form v-if="page === 1"></submission-form>
        </div>
        <div class="mt-2 text-right">
            <v-btn
                :disabled="page <= 0"
                variant="plain"
                text="Back"
                prepend-icon="fas fa-arrow-left"
                class="text-none bg-light-blue text-sub mr-3"
                @click.prevent="page--"
            ></v-btn>
            <v-btn
                v-if="page + 1 < maxPages"
                variant="plain"
                append-icon="fas fa-arrow-right"
                class="text-none bg-primary"
                text="Next"
                @click.prevent="page++"
            ></v-btn>
            <v-btn
                v-if="page + 1 >= maxPages"
                variant="plain"
                append-icon="fas fa-arrow-right"
                class="text-none bg-primary"
                text="Finish"
            ></v-btn>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const page = ref<number>(0);
const maxPages = 2;
</script>
<template>
    <top-bar></top-bar>
    <v-container>
        <h1>Create a course</h1>
        <v-stepper :items="pages" show-actions bg-color="grey" >
            <template v-slot:item.1>
                <create-course-form ></create-course-form>
            </template>
            <template v-slot:item.2>
                <submission-form></submission-form>
            </template>
            <template v-slot:item.3>
                <h2>Dumb Page</h2>
            </template>
        </v-stepper>
    </v-container>
</template>

<script setup lang="ts">
const pages = ['Course & Exercises', 'Submissions', 'Analysis']
</script>
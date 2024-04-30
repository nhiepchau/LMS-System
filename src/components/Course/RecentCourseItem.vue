<template>
    <v-card variant="outlined" color="light-grey-1">
        <v-card-text><h4 class="text-primary">{{ className }}</h4></v-card-text>
        <v-autocomplete
            bg-color="blue-lighten-5"
            color="blue-darken-2"
            class="float-end text-blue-darken-2 w-50 mr-4"
            variant="solo"
            flat
            density="compact"
            label="Class"
            :model-value="selectedClass"
            :items="['L01', 'L02', 'L04']"
        ></v-autocomplete>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
    className: {
        type: String,
        default: ''
    },
    selectedClass: {
        type: String,
        default: ''
    }
});

</script>
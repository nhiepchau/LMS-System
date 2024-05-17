<template>
    <v-card variant="outlined" color="light-grey-1">
        <v-card-text><div class="text-primary font-weight-bold" style="font-size: medium;" >{{ className }}</div></v-card-text>
        <v-btn
            class="text-none bg-blue-lighten-5 float-end text-blue-darken-2 w-33 mr-4 mb-5"
            flat
            :to="`/class/${props.classCode}`"
        >{{ `Class ${selectedClass}` }}</v-btn>
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
    },
    classCode: {
        type: String,
        default: ''
    }
});

</script>
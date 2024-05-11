<template>
    <div class="d-flex flex-row">
        <v-icon class="my-auto mr-2 text-sub" size="small">fas fa-undo-alt</v-icon>
        <h3 class="my-auto text-primary">Analysis</h3>
    </div>
    <p class="text-dark-grey" >Process all of your input</p>

    <div class="mt-16 mx-auto" style="height: 200px; width: 80%;">
        <div class="ma-auto text-center ">
            <!-- <p class="mb-4 text-primary" >100%</p> -->
            <v-progress-linear
                color="blue-darken-1"
                model-value="100"
                rounded
                :indeterminate="loading"
            ></v-progress-linear>
            <p class="mt-4 text-primary">In progress to send request to system. Wait few minutes for processing!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    loading: {
        type: Boolean,
        default: true
    }
})
</script>
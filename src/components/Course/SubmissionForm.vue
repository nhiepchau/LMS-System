<template>
    <v-tabs v-model="tab">
        <v-tab class="text-none" value="Submissions">
            <v-icon>fas fa-circle-check</v-icon>&nbsp;
            Submissions</v-tab>
        <v-tab class="text-none" value="LODistribution">LO Distribution</v-tab>
    </v-tabs>
    <v-window class="mt-3" v-model="tab">
        <v-window-item value="Submissions">
            <div class="mt-3">
                <h3>Semester</h3>
                <p>Exercise for each semester</p>
            </div>
        </v-window-item>
        <!-- Break tabs -->
        <v-window-item value="LODistribution">
            <div class="mt-3">
                <h3>Distribution</h3>
                <p>Exercise for each semester</p>
            </div>
        </v-window-item>
    </v-window>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref<String>('');
</script>
<template>
    <v-card
        flat
        class="bg-blue-lighten-5"
        prepend-icon="fas fa-tag"
        width="400"
    >
        <template v-slot:title>
        {{ props.info }}
        </template>

        <v-card-text>
        {{ props.typeInfo }}
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    typeInfo: String,
    info: String
})
</script>
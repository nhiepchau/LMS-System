<template>
    <v-combobox
        v-model="select"
        :items="['prelab', 'inlab', 'postlab']"
        :label="props.label"
        multiple
        variant="outlined"
        density="compact"
    >
        <template v-slot:selection="{ item }">
            <v-chip
                :key="JSON.stringify(item)"
                size="small"
                :class="[
                    item.value === 'prelab' ? 'bg-blue-lighten-6 text-blue-darken-2' : '',
                    item.value === 'inlab' ? 'bg-red-lighten-5 text-red-darken-2': '',
                    item.value === 'postlab' ? 'bg-green-lighten-5 text-green-darken-2' : ''
                ]"
            >
                {{ item.value }}
            </v-chip>
        </template>
    </v-combobox>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    label: String
});

const select = ref<string[]>(['prelab', 'inlab', 'postlab']);
</script>
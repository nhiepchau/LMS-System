<template>
    <v-card
        flat
        v-bind="$attrs"
    >
        <template v-slot:prepend v-if="getIcon(props.typeInfo) !== ''">
            <v-icon size="small">{{ getIcon(props.typeInfo) }}</v-icon>
        </template>
        <template v-slot:title>
        {{ props.info }}
        </template>

        <v-card-text class="text-dark-grey">
        {{ props.typeInfo }}
        </v-card-text>

        <v-card-actions v-if="getIcon(props.typeInfo) === ''">
            <v-btn 
                class="text-none text-sub-grey" 
                prepend-icon="fas fa-arrow-right"
                @click.prevent="() => { if (typeInfo === 'Classes') router.push('/class') }"
            >View all</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps({
    typeInfo: {
        type: String,
        default: ''
    },
    info: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
})

const router = useRouter();

function getIcon(type: String) : String {
    switch (type) {
        case 'Labs':
            return 'fas fa-microscope'
        case 'Exercises':
            return 'fas fa-cubes'
        case 'Submission files':
            return 'fas fa-file-upload'
        case 'Submissions': 
            return 'far fa-edit'
        default:
            return props.icon
    }
}
</script>
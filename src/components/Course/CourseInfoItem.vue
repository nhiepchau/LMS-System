<template>
    <v-card
        flat
        v-bind="$attrs"
    >
        <template v-slot:prepend>
            <v-icon size="small">{{ getIcon(props.typeInfo) }}</v-icon>
        </template>
        <template v-slot:title>
        {{ props.info }}
        </template>

        <v-card-text class="text-dark-grey">
        {{ props.typeInfo }}
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
    typeInfo: {
        type: String,
        default: ''
    },
    info: {
        type: String,
        default: ''
    }
})

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
            return 'fas fa-tag'
    }
}
</script>
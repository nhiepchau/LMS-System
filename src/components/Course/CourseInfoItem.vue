<template>
    <v-card
        flat
        v-bind="$attrs"
    >
        <template v-slot:prepend v-if="getIcon(props.typeInfo) !== ''">
            <v-icon size="small" v-if="!props.typeInfo.includes('Large')">{{ getIcon(props.typeInfo) }}</v-icon>
            <v-btn v-bind="$attrs" icon v-else>
                <v-icon >{{ getIcon(props.typeInfo) }}</v-icon>
            </v-btn>
        </template>
        <template v-slot:title>
            <div v-if="!props.typeInfo.includes('Large')">
                {{ props.info < 10 ? `0${props.info}` : props.info }}
            </div>
            <div v-else class="font-weight-bold text-h5">
                {{ props.info < 10 ? `0${props.info}` : props.info }}
            </div>
        </template>

        <v-card-text class="text-dark-grey" v-if="!props.typeInfo.includes('Large')">
        {{ props.typeInfo }}
        </v-card-text>

        <v-card-text class="text-dark-grey ml-14 mt-3 font-weight-bold" v-else>
        {{ props.typeInfo.split('Large')[0] }}
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
        type: Number,
        default: 0
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
        case 'ExercisesLarge':
            return 'fas fa-cubes'
        case 'Submission files':
            return 'fas fa-file-upload'
        case 'Submissions': 
        case 'SubmissionsLarge':
            return 'far fa-edit'
        case 'StudentsLarge':
            return 'fas fa-user-graduate'
        case 'OutcomesLarge': 
            return 'far fa-dot-circle'
        default:
            return props.icon
    }
}
</script>